'use strict';

/**
 * Requires
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

/**
 * PostCSS Plugins
 */
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var args = require('yargs').argv;
var minify = args.minify;

var postCssProcessors = [
    autoprefixer({ browsers: ['last 2 version', 'iOS >= 8', 'Android >= 4'] })
];

if (minify) {
    postCssProcessors.push(cssnano({ zindex: false }))
}

// -----------------------------------------------------------
// Delete dist dir
// -----------------------------------------------------------
gulp.task('clean', function () {
    log('Deleting dist folder');
    return del([
        'dist'
    ]);
});

// -----------------------------------------------------------
// Process scss files
// -----------------------------------------------------------
gulp.task('styles', function () {
    gulp.src('./src/sass/**/main.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(postCssProcessors))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// -----------------------------------------------------------
// Process js files
// -----------------------------------------------------------
gulp.task('scripts', function () {
    return gulp.src(['./src/scripts/**/*.js'])
        .pipe($.plumber())
        .pipe($.concat('app.js'))
        .pipe($.if(minify, $.stripDebug()))
        .pipe($.if((minify), $.uglify(
            {
                preserveComments: $.uglifySaveLicense
            })))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// -----------------------------------------------------------
// Process images
// -----------------------------------------------------------
gulp.task('images', function () {
    return gulp.src('src/images/**')
        .pipe($.if(minify, $.imagemin({
            optimizationLevel: 3,
            // Lossless conversion to progressive JPGs
            progressive: true,
            // Interlace GIFs for progressive rendering
            interlaced: true
        })))
        .pipe(size({
            title: 'images'
        }))
        .pipe(gulp.dest('dist/images'));
});

// -----------------------------------------------------------
// Process html files
// -----------------------------------------------------------
gulp.task('html', function () {
    gulp.src('./src/**/*.html')
        .pipe($.if(minify, $.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(gulp.dest('dist/'));
});

// -----------------------------------------------------------
// Start browser-sync
// -----------------------------------------------------------
gulp.task('browser-sync', ['styles', 'scripts'], function () {
    browserSync({
        server: {
            baseDir: './dist/',
            injectChanges: true // this is new
        }
    });
});

// -----------------------------------------------------------
// Watch files for changes
// -----------------------------------------------------------
gulp.task('watch', function () {
    // Watch .html files
    gulp.watch('src/**/*.html', ['html', browserSync.reload]);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    // Watch .sass files
    gulp.watch('src/sass/**/*.scss', ['styles', browserSync.reload]);
    // Watch .js files
    gulp.watch('src/scripts/*.js', ['scripts', browserSync.reload]);
    // Watch image files
    gulp.watch('src/images/**/*', ['images', browserSync.reload]);
});

// -----------------------------------------------------------
// Build and start browser-sync and watch
// -----------------------------------------------------------
gulp.task('default', function (done) {
    runSequence(
        'clean',
        ['styles', 'scripts', 'images'],
        'html',
        'browser-sync',
        'watch',
        done);
});

// -----------------------------------------------------------
// Build without browser-sync
// -----------------------------------------------------------
gulp.task('build', function (done) {
    runSequence(
        'clean',
        ['styles', 'scripts', 'images'],
        'html',
        done);
});

// -----------------------------------------------------------
// Deploy dist folder to Github pages
// -----------------------------------------------------------
gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

// -----------------------------------------------------------
// lint js sources using ESLint
// -----------------------------------------------------------
gulp.task('eslint', function () {
    log('Performing eslint');
    return gulp.src('./src/scripts/**/*.js')
        .pipe($.eslint({
            useEslintrc: true,
            ignore: true
        }))
        .pipe($.eslint.format())
});

///////////////////////
// General functions //
///////////////////////

function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.yellow(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.yellow(msg));
    }
}

function errorHandler(error) {
    if (minify) {
        throw error;
    } else {
        log(error.toString);
    }
}
