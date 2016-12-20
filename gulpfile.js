// Dirs
var baseDir = './';
var sassDir = baseDir + 'scss/';
var cssDir = baseDir + 'css/';
var imgDir = baseDir + 'img/';
var jsDir = baseDir + 'js/';

// Gulp
var gulp = require('gulp');

// Sass/CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

// Images
var imagemin = require('gulp-imagemin');

// JS
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//Others
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


//Used to output the error but keep watching, like Plumber
function errorLog()
{
    console.error.bind(console);
    this.emit('end');
}

// compile all your Sass
gulp.task('styles', function (){
    gulp.src([sassDir + 'site.scss'])
        .on('error', errorLog)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(gulp.dest(cssDir))
        .pipe(browserSync.stream());
});

// uglify all JS
gulp.task('scripts', function (){
    gulp.src([jsDir + '**/*.js'])
        .on('error', errorLog)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(baseDir + jsDir + 'min'))
        .pipe(browserSync.stream());
});

// Minify images
gulp.task('images', function () {
    gulp.src(imgDir + '**/*')
        .on('error', errorLog)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 2
        }))
        .pipe(gulp.dest(baseDir + imgDir + 'min'))
        .pipe(browserSync.stream());
});

// Watch tasks
gulp.task('watch', function() {

    browserSync.init({
        proxy: "hivoutcomes.site",
        notify: false
    });

    gulp.watch(jsDir + '**/*.js', ['scripts']);
    gulp.watch(sassDir + '**/*.scss', ['styles']);
    // gulp.watch(imgDir + '**/*', ['images']);
    gulp.watch(baseDir + '**/*.php').on('change', browserSync.reload);
    gulp.watch(baseDir + '**/*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['styles', 'watch']);