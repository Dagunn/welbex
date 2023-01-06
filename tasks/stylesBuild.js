const {
  src,
  dest
} = require('gulp');
const paths = require('./config.js');

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const groupmq = require('gulp-group-css-media-queries');


const styles = function (cb) {
  return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      "overrideBrowserslist": [
        "last 2 versions",
        "since 2018",
        "not IE 11",
        "not dead"
      ]
    })]))
    .pipe(groupmq())
    .pipe(rename(function (path) {
      stylePartName = path.basename;
    }))
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest));
}


module.exports = styles;
