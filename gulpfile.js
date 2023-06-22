'use strict';

const less = require('gulp-less');
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

function defaultTask() {
        return gulp.src('./styles/styles.less')
            .pipe(less())

            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))

            .pipe(gulp.dest('./dist'));
}
exports.default = defaultTask


exports.watch = function () {
        gulp.watch('./styles/*.less', gulp.series('default'))
}