typestring
==========
`typestring` is a simple JavaScript module providing an in-memory (string-in and
string-out) TypeScript compiler.

Installation
------------

    $ npm install typestring

Example
-------

```javascript
var ts = require('typestring');
ts.compile('class Foo { public bar = 2; }');
```

Output string:

```javascript
var Foo = (function () {
    function Foo() {
        this.bar = 2;
    }
    return Foo;
})();
```

### File references

File references can be used, but the file contents must be passed to `compile`
as strings or buffers:

```javascript
ts.compile('/// <reference path="foo.ts" />', {
  'foo.ts': fs.readFileSync('lib/foo.ts')
});
```

License
-------
`typestring` is released under the terms of the
[MIT license](http://tldrlegal.com/license/mit-license). See **LICENSE**.
