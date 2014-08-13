# readdir-stream [![Build Status](https://travis-ci.org/logicalparadox/readdir-stream.png?branch=master)](https://travis-ci.org/logicalparadox/readdir-stream)

> Recursively read a directory and stream stats objects.

#### Installation

`readdir-stream` is available on [npm](http://npmjs.org).

    npm install readdir-stream

#### Usage

```js
var fs = require('fs');
var join = require('path').join;
var readdir = require('readdir-stream');
var dir = join(__dirname, 'hello');

readdir(dir).on('readable', function() {
  var entry = this.read();
  if (!entry) return;
  entry.should.have.property('path').a('string');
  entry.should.have.property('stat').an.instanceof(fs.Stats);
});
```

#### API

##### readdir(dir, [options])

Returns Stream of directory entries with `path` and `stat` properties.

###### dir
*Required*  
Type: `string`  
Path to directory, that will be readed.

###### options.recursive
Type: `Boolean`  
Default: `true`  

Indicates, that readdir should be recursive.

#### License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com> (http://alogicalparadox.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
