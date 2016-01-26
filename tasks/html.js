/**
 * @file html.js - Builds HTML pages using Metalsmith
 * @version 1.0.0
 * @author Daniel Furze <daniel@furzeface.com>
 * @author Phil Lennon <enquiry@iampjl.co.uk>
 */

import gulpif from 'gulp-if'

import Metalsmith from 'metalsmith'
import handlebars from 'handlebars'
import layouts from 'handlebars-layouts'
import rename from 'metalsmith-rename'
import permalinks from 'metalsmith-permalinks'

import htmlmin from 'gulp-htmlmin'

module.exports = function (gulp, config, argv) {
  // Register handlebars layout
  handlebars.registerHelper(layouts(handlebars))

  function buildPages (cb) {
    const metal = new Metalsmith('.').clean(false)
      .source(config.paths.source.pages)
      .destination(config.paths.dist.base)

    // Require plugins and options from config
    Object.keys(config.metalsmith.plugins).forEach(function (key) {
      const plugin = require(key)
      const options = config.metalsmith.plugins[key]

      metal.use(plugin(options))
    })

    metal.use(rename([
      [/\.hbs$/, '.html'],
      [/\.md$/, '.html']
    ]))

    metal.use(permalinks({
      pattern: ':directory/:page'
    }))

    metal.build(function (err) {
      if (err) {
        return cb(err)
      }

      cb()
    })
  }

  // Metalsmith task
  gulp.task('metalsmith', cb => {
    buildPages(cb)
  })

  // HTML minify task
  gulp.task('htmlmin', () => {
    return gulp.src(config.paths.dist.base + '/**/*.html')
      .pipe(gulpif(argv.prod, htmlmin({
        collapseWhitespace: true
      })))
      .pipe(gulp.dest(config.paths.dist.base))
  })
}
