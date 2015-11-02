gulp = require 'gulp'
nginxer = require '../app.js'

gulp.task 'default', ->
    gulp.src 'example.json'
        .pipe nginxer()
        .pipe gulp.dest './'