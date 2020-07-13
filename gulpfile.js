const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const uglifyjs = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const image = require('gulp-image');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function _clean(cb) {
    return gulp
    .src('./dist/**/!(*.html)')
    .pipe(clean({force: true}));
}
function js(cb) {
    return gulp
    .src('./src/**/*.js')
    .pipe(uglifyjs())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist'));
}
function css(cb) {
    return gulp
    .src('./src/**/*.css')
    .pipe(uglifycss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./dist'));
}
function images(cb) {
    return gulp
    .src('./src/**/*(*.png|*.jpg|*.jpeg|*.gif)')
    .pipe(image())
    .pipe(gulp.dest('./dist'));
}
function _sass(cb) {
    return gulp
    .src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
}
function _sass_watch() {
    gulp.watch('./src/sass/*.scss', _sass);
}


exports.clean = _clean;
exports.js = js;
exports.css = css;
exports.images = images;
exports.sass = _sass;
exports['sass:watch'] = _sass_watch;
exports.default = gulp.series(
    clean, 
    gulp.parallel(js, css, images)
);
exports.build = gulp.parallel(css, js, images);
