/**
 * @file server.js - Run Browsersync server
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 * @see {@link https://www.browsersync.io/docs/gulp}
 */

import browserSync from 'browser-sync'

module.exports = function (gulp, config) {
  gulp.task('browser-sync', () => {
    browserSync.create().init({
      browser: 'google chrome',
      files: [config.paths.dist.base + '/**/*'],
      server: {
        baseDir: config.paths.dist.base
      },
      watchOptions: {
        ignored: '**/*.DS_Store'
      }
    })
  })
}
