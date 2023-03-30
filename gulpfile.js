const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber");
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const svgstore = require('gulp-svgstore');
const csso = require('postcss-csso');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const del = require('del');

// Clean

const buildClean = () => {
  return del('build');
};

// Copy

const sourceCopy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.webmanifest',
    'source/*.ico'
  ], { base: 'source'})
    .pipe(gulp.dest('build'));
  done();
};

// HTML

const htmlMinify = () => {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}

// CSS

const stylesBuild = () => {
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

// JS

const jsMinify = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe(sync.stream());
}

// Images

const imagesOptimize = () => {
  return gulp.src(['source/img/**/*.{png,jpg,svg}', '!source/img/sprite/*.svg'])
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'))
}

const imagesWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest('build/img'))
}

const imagesAvif = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(avif())
    .pipe(gulp.dest('build/img'))
}

const imagesCopy = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

// SVG

const spriteBuild = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
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

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(stylesBuild));
  gulp.watch('source/js/*.js', gulp.series(jsMinify));
  gulp.watch('source/**/*.html', gulp.series(htmlMinify, sync.reload));
};

// Exports

exports.build = gulp.series(
  buildClean,
  sourceCopy,
  imagesOptimize,
  gulp.parallel(
    stylesBuild,
    htmlMinify,
    jsMinify,
    spriteBuild,
    imagesWebp,
    imagesAvif
  )
)

exports.default = gulp.series(
  buildClean,
  sourceCopy,
  imagesCopy,
  gulp.parallel(
    stylesBuild,
    htmlMinify,
    jsMinify,
    spriteBuild,
    imagesWebp,
    imagesAvif
  ),
  gulp.series(
    server,
    watcher
  )
)

exports.live = gulp.series(
  server,
  watcher
)
