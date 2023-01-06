const {
  src,
  dest,
  lastRun
} = require('gulp');
const paths = require('./config.js');

const sass = require('gulp-sass')(require('sass'));
const dependents = require('gulp-dependents');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const groupmq = require('gulp-group-css-media-queries');

const compileScssTask = function (cb) {
  return src(paths.styles.src, {
      since: lastRun(compileScssTask)
    })
    .pipe(dependents())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      "overrideBrowserslist": [
        "last 2 versions",
        "since 2018",
        "not IE 11",
        "not dead"
      ]
    })]))
    .pipe(dest(paths.styles.dest));
}

const styles = function (cb) {
  return src(paths.styles.src, {
      since: lastRun(styles)
    })
    .pipe(dependents())
    .pipe(sass())
    .pipe(postcss([autoprefixer({
      "overrideBrowserslist": [
        "last 2 versions",
        "since 2018",
        "not IE 11",
        "not dead"
      ]
    })]))
    .pipe(groupmq())
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest));
}

module.exports = styles;
