/**
 * typestring - String-in/string-out TypeScript compiler front-end
 * https://github.com/gavinhungry/typestring
 */

(() => {
  'use strict';

  let fs  = require('fs');
  let tap = require('tap');
  let ts  = require('../typestring');

  tap.test('no/undefined input results in an empty string', t => {
    let js = ts.compile();
    t.equal(js, '', 'undefined input outputs empty string');

    js = ts.compile('');
    t.equal(js, '', 'empty string input outputs empty string');

    js = ts.compile('   ');
    t.equal(js, '', 'whitespace input outputs empty string');

    t.end();
  });

  tap.test('simple module input results in correct output', t => {
    let simpleClassJS = 'var Foo = (function () {\n    function Foo() {\n        this.bar = 2;\n    }\n    return Foo;\n}());\n';

    let js = ts.compile('class Foo { public bar = 2; }');
    t.equal(js, simpleClassJS, 'inline class outputs expected result');

    js = ts.compile('/// <reference path="foo.ts" />', {
      'foo.ts': 'class Foo { public bar = 2; }'
    });

    t.equal(js, simpleClassJS, 'reference path class outputs expected result');

    t.end();
  });

  tap.test('invalid variable type throws semantic diagnostics error', t => {
    t.throws(() => {
      ts.compile('let str:String = false', null, null, true);
    });

    t.doesNotThrow(() => {
      ts.compile('let str:String = false');
    });

    t.doesNotThrow(() => {
      ts.compile('let str:Boolean = false', null, null, true);
    });

    t.end();
  });

})();
