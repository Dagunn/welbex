const gulp = require('gulp')
const del = require('del')

function clean() {
    return del (['dist'])
}

exports.clean = clean