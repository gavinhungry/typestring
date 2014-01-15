(function() {
  'use strict';
  var ts = require('typescript-api');
  var compiler = new ts.TypeScriptCompiler();

  /**
   * Compile a string of TypeScript, return as a string of JavaScript
   *
   * @param {String} input - TypeScript to compile
   * @return {String} JavaScript output, or null on error
   */
  exports.compile = function(input) {
    var snapshot = ts.ScriptSnapshot.fromString(input);
    compiler.addFile('debugger.ts', snapshot);

    var it = compiler.compile();
    it.moveNext();

    var output = it.current().outputFiles[0];

    return !!output ? output.text : null;
  };

})();
