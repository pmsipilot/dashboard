'use strict';
import sourcemaps from 'gulp-sourcemaps';
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const fs = require('fs');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('build/client', function() {
    const options = {
        entries: './app/js/client/client.jsx',
        extensions: ['.jsx', '.js'],
        debug: argv.production ? false : true,
        paths: ['./app/js/client/']
    };

    return browserify(options)
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('client.js'))
        .pipe(gulpif(argv.production, buffer()))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build/server', function() {
    return gulp.src('./app/js/server/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(concat('server.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build/sass', function() {
    return gulp.src('./app/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function (err) {
                console.log(err);
            }
        }).on('error', sass.logError))
        .pipe(concat('client.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch/server',function() {
    gulp.watch('./app/js/server/**/*.js', ['build/server']);
});

gulp.task('watch/client',function() {
    gulp.watch('./app/js/client/**/*.jsx', ['build/client']);
});

gulp.task('watch/sass',function() {
    gulp.watch('./app/scss/**/*.scss', ['build/sass']);
});

gulp.task('build', [
    'build/sass',
    'build/client',
    'build/server'
]);

gulp.task('watch', [
    'watch/sass',
    'watch/client',
    'watch/server'
]);

gulp.task('default', [
    'build',
    'watch'
]);