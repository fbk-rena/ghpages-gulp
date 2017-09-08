// call & init gulp
const gulp = require("gulp");
const sass = require("gulp-sass");
const watch = require("gulp-watch");
const ghPages = require('gulp-gh-pages');

//origin point for pipes
const origin = {
    html: './src/**/*.html',
    js: './src/js/*.js',
    scss: './src/scss/*.scss'
}

//point of dist for pipes
const dist = {
    html:'./dist/',
    js: './dist/js/',
    css: './dist/css/'
}

//Tasks
//Render changes on html to production 
gulp.task("processHtml", function(){
    gulp.src(origin.html)
        .pipe(watch(origin.html))
        .pipe(gulp.dest(dist.html))
    console.log("Changes render on html")
});
//render changes on js to production
gulp.task("processJs", function(){
    gulp.src(origin.js)
        .pipe(watch(origin.js))
        .pipe(gulp.dest(dist.js))
    console.log("Changes render on js")
});
//Trnasform scss to css & render changes to production
gulp.task("processCss", function(){
    gulp.src(origin.scss)
        .pipe(watch(origin.scss))
        .pipe(sass({
                outputStyle: 'expanded'
            })
            .on('error', sass.logError))
        .pipe(gulp.dest(dist.css))
    console.log("Css adjusted")
});

//Starts call
//Execute all the task in one command
gulp.task("processAll",["processHtml","processJs","processCss"]);


 gulp.task('deploy', function() {
    return gulp.src("./dist/**/*")
        .pipe(ghPages());
    });