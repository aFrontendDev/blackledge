/**
 * @file gulpfile
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 */

'use strict'

import gulp from 'gulp'
import yargs from 'yargs'
import runSeq from 'run-sequence'
const argv = yargs.argv

const config = {
  metalsmith: require('./config/metalsmith.json'),
  paths: require('./config/paths.json'),
  pxtorem: require('./config/pxtorem.json'),
  stylelint: require('./config/stylelint.json')
}

import preen from 'preen'

gulp.task('preen', function () {
  preen.preen({})
})

/* ============================================================ *\
    Require tasks
\* ============================================================ */

require('./tasks/clean.js')(gulp, config, argv)
require('./tasks/copy.js')(gulp, config)
require('./tasks/html.js')(gulp, config, argv)
require('./tasks/server.js')(gulp, config, argv)
require('./tasks/scripts.js')(gulp, config, argv)
require('./tasks/styles.js')(gulp, config, argv)
require('./tasks/testing.js')(gulp, config, argv)

/* ============================================================ *\
    Watch tasks
\* ============================================================ */

gulp.task('watch', () => {
  gulp.watch([
    config.paths.source.pages + '/**/*.{hbs,html,md}',
    config.paths.source.partials + '/**/*.{hbs,html,md}',
    config.paths.source.posts + '/**/*.{hbs,html,md}'
  ], ['metalsmith'])

  gulp.watch([
    config.paths.source.styles + '/**/*.scss'
  ], ['stylelint', 'styles'])

  gulp.watch([
    config.paths.source.scripts + '/**/*.js'
  ], ['scripts'])
})

/* ============================================================ *\
    Task aliases
\* ============================================================ */

gulp.task('copy:assets', callback => {
  runSeq(
    'copy:base',
    'copy:fonts',
    'copy:images',
    'copy:scripts',
    'copy:temp',
    'copy:video',
    callback
  )
})

gulp.task('docs', callback => {
  runSeq(
    'clean:docs',
    'jsdocs',
    callback
  )
})

gulp.task('images', callback => {
  runSeq(
    'imagemin',
    'copy:images',
    callback
  )
})

gulp.task('dev', callback => {
  runSeq(
    'default',
    'watch',
    'browser-sync',
    callback
  )
})

gulp.task('test', callback => {
  runSeq(
    'dev',
    'backstopTest',
    callback
  )
})

gulp.task('default', callback => {
  runSeq(
    'clean',
    'copy:assets',
    'metalsmith',
    ['copy:images', 'styles', 'scripts:main', 'scripts:plugins'],
    'htmlmin',
    callback
  )
})
