var join = require('path').join;
var DIR = join(__dirname, 'fixtures');

describe('readdir', function() {
  it('emits objects for all entries recursively', function(done) {
    var dirs = 0;
    var files = 0;

    var read = chai.spy('readable', function() {
      var entry = this.read();
      if (!entry) return;
      entry.should.have.property('path').a('string');
      entry.should.have.property('stat');
      if (entry.stat.isDirectory()) dirs++;
      if (entry.stat.isFile()) files++;
    });

    var stream = readdir(DIR);
    stream.on('readable', read);

    stream.on('end', function() {
      read.should.have.been.called(7);
      dirs.should.equal(3);
      files.should.equal(3);
      done();
    });
  });
});
