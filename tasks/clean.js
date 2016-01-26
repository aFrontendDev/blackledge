/**
 * @file clean.js - Wipe dist directory with Gulp task
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 */

import del from 'del'

module.exports = function (gulp, config, argv) {
  gulp.task('clean', () => {
    if (!argv.prod) {
      return del([
        config.paths.dist.base
      ])
    }
  })
}
