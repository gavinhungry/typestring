typestring
==========
`typestring` is a string-in/string-out TypeScript compiler front-end.

Installation
------------

    $ npm install typestring

Example
-------

```javascript
let typestring = require('typestring');
let js = typestring.compile('class Foo { public bar = 2; }');
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
typestring.compile('/// <reference path="foo.ts" />', {
  'foo.ts': fs.readFileSync('lib/foo.ts')
});
```

License
-------
This software is released under the terms of the **MIT license**. See `LICENSE`.
