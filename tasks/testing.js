/**
 * @file testing.js - Testing related Gulp tasks
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 */

import chug from 'gulp-chug'

module.exports = function (gulp, config, argv) {
  gulp.task('backstopReference', () => {
    return gulp.src(config.paths.test.backstopGulpfile)
      .pipe(chug({
        tasks: 'reference'
      }))
  })

  gulp.task('backstopTest', () => {
    return gulp.src(config.paths.test.backstopGulpfile)
      .pipe(chug({
        tasks: 'test'
      }))
  })
}
