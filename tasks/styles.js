/**
 * @file styles.js - Styles related Gulp tasks
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 */

import sass from 'gulp-sass'
import uncss from 'gulp-uncss'
import postcss from 'gulp-postcss'
import pxtorem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'
import mqPacker from 'css-mqpacker'
import cssNano from 'cssnano'

import stylelint from 'stylelint'
import reporter from 'postcss-reporter'
import scss from 'postcss-scss'

module.exports = function (gulp, config, argv) {
  function getPostCssPlugins () {
    const plugins = [
      autoprefixer({
        browsers: ['> 5%']
      }),
      mqPacker({
        sort: true
      })
    ]

    if (argv.prod) {
      plugins.push(cssNano())
      plugins.push(pxtorem(config.pxtorem))
    }

    return plugins
  }

  gulp.task('styles', () => {
    return gulp.src(config.paths.source.styles + '/component-framework.scss')
      .pipe(sass())
      .pipe(uncss({
        html: [config.paths.dist.base + '/**/*.html']
      }))
      .pipe(postcss(getPostCssPlugins()))
      .pipe(gulp.dest(config.paths.dist.styles))
  })

  gulp.task('stylelint', () => {
    return gulp.src(config.paths.source.styles + '/**/*.scss')
      .pipe(postcss([
        stylelint(config.stylelint),
        reporter({
          clearMessages: true
        })
      ], {
        syntax: scss
      }))
  })
}
