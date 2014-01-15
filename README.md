typestring
==========
`typestring` is a simple Node module providing an in-memory (string-in and
string-out) TypeScript compiler, utilizing
[`typescript-api`](https://npmjs.org/package/typescript-api).

Installation
------------

    npm install typestring

Example
-------

    var ts = require('typestring');
    ts.compile('class Foo { public bar = 2; }');

License
-------
`typestring` is released under the terms of the
[MIT license](http://tldrlegal.com/license/mit-license). See **LICENSE**.
