var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src('src/styles/index.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('markup', function() {
  return gulp.src('src/pages/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('serve', ['styles', 'markup', 'images'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(
    ['src/**/*.pug', 'src/styles/*.sass', 'src/images/**/*'],
    ['styles', 'markup', 'images']
  );
});

gulp.task('default', ['serve']);