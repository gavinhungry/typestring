/**
 * typestring - In-memory TypeScript compiler
 * https://github.com/gavinhungry/typestring
 */

// http://www.2ality.com/2011/11/module-gap.html
({
  define: typeof define === 'function' ? define :
  function(reqs, fn) { module.exports = fn.apply(null, reqs.map(require)); }
}).

define(['typescript'], function (ts) {
  'use strict';

  var _filename = '_typestring.ts';

  return {

    /**
     * Compile a string of TypeScript, return as a string of JavaScript
     *
     * @param {String} input - TypeScript to compile
     * @param {Object} [refs] - map of referenced filenames to content
     * @param {Object} [opts] - Options to TypeScript compiler
     * @return {String} JavaScript output
     * @throws TypeScript compile error
     */
    compile: function(input, refs, opts) {
      refs = refs || {};
      opts = opts || ts.getDefaultCompilerOptions();

      // replace references with script strings
      var re = new RegExp(ts.fullTripleSlashReferencePathRegEx.source, 'gm');
      input = input.replace(re, function(match, p1, p2, filename) {
        return refs[filename] || match;
      });

      var host = ts.createCompilerHost(opts);

      // return our input if requested, otherwise use default host method
      var getSourceFile = host.getSourceFile;
      host.getSourceFile = function(filename) {
        if (filename === _filename) {
          return ts.createSourceFile(filename, input, opts.target, '0');
        }

        return getSourceFile.apply(this, arguments);
      };

      // append output to a string
      var output = '';
      host.writeFile = function (filename, text) {
        output += text;
      };

      var prog = ts.createProgram([_filename], opts, host);
      var errs = prog.getDiagnostics();

      if (errs.length) {
        throw errs;
      }

      var checker = prog.getTypeChecker(true);
      errs = checker.getDiagnostics();

      if (errs.length) {
        throw errs;
      }

      checker.emitFiles();

      return output;
    }
  };
});
