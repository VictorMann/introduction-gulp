const gulp = require('gulp');
const rename = require('gulp-rename');

function clean(cb) {
    cb();
}
function ren(cb) {
    return gulp
    .src('./src/*.js')
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist'));
}

function css(cb) {
    cb();
}
function images(cb) {
    cb();
}

function js(cb) {
    cb();
}

exports.js = js;
exports.default = ren;
exports.build = gulp.parallel(css, js, images);
exports.group = gulp.series(
    clean,
    gulp.parallel(
        css,
        js,
        images
    ),
    ren
);