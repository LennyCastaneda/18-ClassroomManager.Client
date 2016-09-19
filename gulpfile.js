//Creating a gulp package using the require function to bring in the gulp package.
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    wiredep = require('wiredep').stream,
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),      
    inject = require('gulp-inject'),    
    open = require('gulp-open'); 

var jsSources = ['src/app/**/*.js'],
    //Any changes to any css files, in any folder in src/css folder
    cssSources = ['src/css/**/*.css'],
    //Any Changes to any html file
    htmlSources = ['./src/index.html', './src/app/**/*.html'];


//Wacth for any changes in the files.
//When changes occur that is when we tell it to do another gulp task.
gulp.task('watch', function() {
// gulp.watch(jsSources, ['js']);
// gulp.watch(cssSources, ['css']);
// gulp.watch(htmlSources, ['html']);
});

//These are the sources and their paths.
//Any of the .js files in any of the folders in src/js
//Any of the .css file sin any of the folders in src/css
var paths = ['./bower_components/','./src/app/**/*.js','./src//css/**/*.css', './src/secrets/**/*.js'];


gulp.task('inject', function() {
    var sources = gulp.src(paths, {read: false});
    return gulp.src('./src/index.html')
        //Hooks up the links to script tags for bower components.
        .pipe(wiredep())
        //Pass the sources into the inject function
        .pipe(inject(sources, {relative:true})) 
        //Inject files are relative to the files being injected into.
        //Once sources have been injected, Write html file into the src folder. 
        .pipe(gulp.dest('./src'));  
});

// //Tells connect to reload the server when js files change.
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(connect.reload());
});

// //Tells connect to reload the server when html files change.
gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

//Tells connect to reload the server when css files change.
gulp.task('css', function() {
    gulp.src(cssSources)
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        //This is where the index.html file is located.
        root: './src',  
        //Watch files and live reload, tells server to reload itself.
        livereload: true
    });
});

//It opens Chrome
gulp.task('app', function(){
    var options = {
        //This is the URL to open.
        uri: 'http://localhost:8080',
        //This is the app on my computer to use
        // app: 'Google Chrome'  //FireFox; Internet Explorer - MAC
        app: 'Chrome' //  WINDOWS
    };
    //Open up this file
    gulp.src('./src/index.html')
        //Use open package to open the application.
        .pipe(open(options));
});

//Set up a serve task that sets up another series of tasks.
//Sets up a server, Open up those watches, inject files and open the application 'app'
gulp.task('serve', ['connect', 'watch', 'inject', 'app']);