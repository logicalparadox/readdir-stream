/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

//global.chai.use(require('chai-spies'));
//global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.readdir = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.readdir_COV
    ? require('../../lib-cov/readdir/' + name)
    : require('../../lib/readdir/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__readdir = {};
