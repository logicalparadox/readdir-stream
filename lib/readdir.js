/*!
 * readdir-stream
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var debug = require('sherlock')('readdir');
var fs = require('fs');
var inherits = require('util').inherits;
var path = require('path');
var Readable = require('stream').Readable;

/*!
 * Legacy streams
 */

if (!Readable) {
  debug('(legacy) importing readable-stream');
  Readable = require('readable-stream').Readable;
}

/*!
 * Primary export
 */

module.exports = ReadDir;

/**
 * ### ReadDir(dir)
 *
 * A readable object-mode stream that recursively
 * reads a directory and pushes objects containing
 * the path and `fs.stat` object for each entry.
 *
 * @param {String} start directory
 * @param {Object} options
 * @return {Readable} stream
 */

function ReadDir(dir, options) {
  if (!options) options = {};
  if (!(this instanceof ReadDir)) return new ReadDir(dir, options);
  Readable.call(this, { objectMode: true, highWaterMark: 1 });
  this.options = options;
  this._queue = [ dir ];
}

/*!
 * Inherit from readable
 */

inherits(ReadDir, Readable);

/*!
 * Implement readable.
 *
 * @emit `error` on fs errors
 */

ReadDir.prototype._read = function() {
  var self = this;
  var queue = this._queue;

  if (!queue.length) {
    debug('(end)');
    this.push(null);
    return;
  }

  function error(err) {
    debug('(error) %s', err.message);
    self.emit('error', err);
  }

  function push(obj) {
    debug('(push) %s', obj.path);
    self.push(obj);
  }

  function readdir(dir, cb) {
    debug('(readdir) %s', dir);
    fs.readdir(dir, function(err, list) {
      if (err) return cb(err);
      var i = 0;
      var file;

      for (; i < list.length; i++) {
        file = path.join(dir, list[i]);
        debug('(queue) %s', path);
        queue.push(file);
      }

      cb();
    });
  }

  var entry = queue.shift();
  debug('(stat) %s', entry);
  fs.stat(entry, function(err, stat) {
    if (err) return error(err);
    if (stat.isDirectory() && self.options.recursive !== false) {
      readdir(entry, function(err) {
        if (err) return error(err);
        push({ path: entry, stat: stat });
      });
    } else {
      push({ path: entry, stat: stat });
    }
  });
};
