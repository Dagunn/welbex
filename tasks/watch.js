const {
    watch
} = require('gulp');
const compileScssTask = require('./styles.js');
const paths = require('./config.js');

const watcher = function () {
    watch(paths.styles.src, compileScssTask);
}

module.exports = watcher;
