var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    minify = require('gulp-cssnano'),
    paths = {
      src: './src/',
      sassDir: './sass/',
      dist: './www/',
      js: '**/*.js',
      ts: '**/*.ts',
      sass: '**/*.scss',
      html: '**/*.html'
    };
 
 gulp.task('sass', function(){
   gulp.src(paths.sassDir + paths.sass)
    .pipe(sass({
      includePaths: [
       'node_modules/support-for/sass',
       'node_modules/normalize-scss/sass'
      ]
    }))
    .pipe(minify())
    .pipe(gulp.dest(paths.dist))
 })
 
 gulp.task('watch', function(){
   gulp.watch(paths.sassDir + paths.sass, ['sass']);
 })
 
 gulp.task('default', ['sass', 'watch']);
 