/**
 * typestring - Synchronous (string-in/out) TypeScript compiler front-end
 * https://github.com/gavinhungry/typestring
 */

((global, mod, fn, _name = mod.name.toLowerCase()) => {
  (typeof define === 'function' && define.amd) ? define(_name, mod.deps, fn) :
  (typeof module === 'object') ? module.exports = fn(...mod.deps.map(require)) :
  global[mod.name] = fn();
})(this, {
  name: 'typestring',
  deps: ['typescript']
}, (ts = window.TypeScript) => (() => {
  'use strict';

  const _filename = '_typestring.ts';
  const defaultOpts = ts.getDefaultCompilerOptions();

  return {
    /**
     * Compile a string of TypeScript, return a string of JavaScript
     *
     * @param {String} input - TypeScript to compile
     * @param {Object} [refs] - map of referenced filenames to content
     * @param {Object} [opts] - Options to TypeScript compiler
     * @param {Boolean} [semantic] - if true, throw semantic errors
     * @return {String} JavaScript output
     *
     * @throws TypeScript compile error
     */
    compile: (input = '', refs = {}, opts = defaultOpts, semantic) => {
      // replace references with script strings
      let re = new RegExp(ts.fullTripleSlashReferencePathRegEx.source, 'gm');
      input = input.replace(re, (m, p1, p2, filename) => refs[filename] || m);

      let host = ts.createCompilerHost(opts);

      // return our input if requested, otherwise use default host method
      let getSourceFile = host.getSourceFile;
      host.getSourceFile = function(filename) {
        if (filename === _filename) {
          return ts.createSourceFile(filename, input, opts.target, '0');
        }

        return getSourceFile.apply(this, arguments);
      };

      // append output to a string
      let output = '';
      host.writeFile = (filename, text) => output += text;

      let prog = ts.createProgram([_filename], opts, host);

      let errs = prog.getSyntacticDiagnostics();
      if (errs.length) {
        throw errs;
      }

      if (semantic) {
        errs = prog.getSemanticDiagnostics();
        if (errs.length) {
          throw errs;
        }
      }

      prog.emit();

      return output;
    }
  };
})());
