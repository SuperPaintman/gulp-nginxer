var NginxGenerator, PLUGIN_NAME, PluginError, gulpNginxGenerator, gutil, nginxer, replaceExt, through;

gutil = require('gulp-util');

through = require('through2');

replaceExt = require('replace-ext');

nginxer = require('nginxer');

PluginError = gutil.PluginError;

NginxGenerator = nginxer.NginxGenerator;

PLUGIN_NAME = 'gulp-nginxer';

gulpNginxGenerator = function() {
  return through.obj(function(file, enc, cb) {
    var e, error, opts, res;
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    try {
      opts = JSON.parse(file.contents.toString());
      res = new NginxGenerator(opts).render();
      file.contents = new Buffer(res);
      file.path = replaceExt(file.path, '.conf');
      return this.push(file);
    } catch (error) {
      e = error;
      return this.emit('error', new PluginError(PLUGIN_NAME, e, {
        fileName: file.path
      }));
    }
  });
};

module.exports = gulpNginxGenerator;
