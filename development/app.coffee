# Requires
gutil       = require 'gulp-util'
through     = require 'through2'
replaceExt  = require 'replace-ext'
nginxer     = require 'nginxer'

# Init
PluginError         = gutil.PluginError
NginxGenerator      = nginxer.NginxGenerator

# Const
PLUGIN_NAME = 'gulp-nginxer'

gulpNginxGenerator = ->
    return through.obj (file, enc, cb)->
        if file.isNull() then return cb null, file

        if file.isStream() then return cb new PluginError PLUGIN_NAME, 'Streaming not supported'

        try
            opts = JSON.parse file.contents.toString()

            res = new NginxGenerator(opts).render()

            file.contents = new Buffer res
            file.path = replaceExt file.path, '.conf'

            @.push file
        catch e
            @.emit 'error', new PluginError PLUGIN_NAME, e, {
                fileName: file.path
            }
    

# Exports
module.exports = gulpNginxGenerator