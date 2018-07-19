var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src(['./src/scss/index.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js'])        
        .pipe(gulp.dest('./src/js'));    
});

gulp.task('font', function () {
    return gulp.src(['./node_modules/font-awesome/fonts/*.*'])        
        .pipe(gulp.dest('./src/fonts'));    
});

gulp.task('serve', function () {
    browserSync.init(["./src/scss/*.scss", "./src/js/*.js"],{
        server: "./src/"
    });

    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['sass','font', 'js', 'serve']);

