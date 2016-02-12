/**
 * @file copy.js - Copy assets to dist with Gulp task
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 */

module.exports = function (gulp, config) {
  gulp.task('copy:base', () => {
    return gulp.src([config.paths.source.assets + '/_base/**'])
      .pipe(gulp.dest(config.paths.dist.base + '/_base'))
  })

  gulp.task('copy:fonts', () => {
    return gulp.src([
      config.paths.source.fonts + '**/*'
    ])
      .pipe(gulp.dest(config.paths.dist.fonts))
  })

  gulp.task('copy:images', () => {
    return gulp.src([
      config.paths.source.images + '**/*.png'
    ])
      .pipe(gulp.dest(config.paths.dist.base))
  })

  gulp.task('copy:scripts', () => {
    return gulp.src([config.paths.source.scripts + '/plugins/*.js'])
      .pipe(gulp.dest(config.paths.dist.scripts))
  })

  gulp.task('copy:temp', () => {
    return gulp.src([
      config.paths.source.temp + '**/*'
    ])
      .pipe(gulp.dest(config.paths.dist.temp))
  })

  gulp.task('copy:video', () => {
    return gulp.src([
      config.paths.source.video + '**/*'
    ])
      .pipe(gulp.dest(config.paths.dist.video))
  })
}
