/**
 * typestring - In-memory TypeScript compiler
 * https://github.com/gavinhungry/typestring
 */

(function() {
  'use strict';

  var fs  = require('fs');
  var tap = require('tap');
  var ts  = require('../typestring');

  tap.test('no/undefined input results in an empty string', function(t) {
    var js = ts.compile();
    t.equal(js, '', 'undefined input outputs empty string');

    js = ts.compile('');
    t.equal(js, '', 'empty string input outputs empty string');

    js = ts.compile('   ');
    t.equal(js, '', 'whitespace input outputs empty string');

    t.end();
  });

  tap.test('simple module input results in correct output', function(t) {
    var simpleClassJS = 'var Foo = (function () {\n    function Foo() {\n        this.bar = 2;\n    }\n    return Foo;\n}());\n';

    var js = ts.compile('class Foo { public bar = 2; }');
    t.equal(js, simpleClassJS, 'inline class outputs expected result');

    js = ts.compile('/// <reference path="foo.ts" />', {
      'foo.ts': 'class Foo { public bar = 2; }'
    });

    t.equal(js, simpleClassJS, 'reference path class outputs expected result');

    t.end();
  });

  tap.test('invalid variable type throws semantic diagnostics error', function(t) {
    t.throws(function() {
      ts.compile('var str:String = false', null, null, true);
    });

    t.doesNotThrow(function() {
      ts.compile('var str:String = false');
    });

    t.doesNotThrow(function() {
      ts.compile('var str:Boolean = false', null, null, true);
    });

    t.end();
  });

})();
