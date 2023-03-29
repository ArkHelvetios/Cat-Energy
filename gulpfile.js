const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber");
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const csso = require('postcss-csso');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const del = require('del');
const imagemin = require('gulp-imagemin');

// Clean

const cleanBuild = () => {
  return del('build');
};

exports.cleanBuild = cleanBuild;

// Copy

const copySources = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.webmanifest',
    'source/*.ico'
  ], { base: 'source'})
    .pipe(gulp.dest('build'));
  done();
};

exports.copySources = copySources;

// HTML

const htmlMinify = () => {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}

exports.htmlMinify = htmlMinify;

// CSS

const buildStyles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
  };

exports.buildStyles = buildStyles;

// JS

const jsMinify = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe(sync.stream());
}

exports.jsMinify = jsMinify;


// Images

const imagesOptimize = () => {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'))
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series('buildStyles'));
  gulp.watch('source/*.html').on('change', sync.reload);
};

exports.watcher = watcher;

exports.build = gulp.series(
  cleanBuild,
  copySources,
  buildStyles,
  htmlMinify,
  jsMinify
)
