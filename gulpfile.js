// gulpfile.js
const gulp = require('gulp');
const child_process = require('child_process');
const browserSync = require('browser-sync');
const mongobackup = require('mongobackup');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');
const yargs = require('yargs');
const checkPages = require('check-pages');
const apiDoc = require('gulp-apidoc');
const deploy = require('gulp-gh-pages');
const open = require('gulp-open');

const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, function(error, stdout, stderr){callback(stdout);});
}

//// these plugins are added first, but still need for
//// dev team to group files by types to make it happen
//// such as .js folder, .css folder, build folder

//var minifyCSS = require('gulp-minify-css');


//// end of additional plugins


//// begin of additional plugins

/**
 * Run test once and exit
 */

gulp.task('clean', function () {
});

gulp.task('lint', function() {
});

gulp.task('vendor', function() {
  return gulp.src('./public/javascripts/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .on('error', function () {
        console.error("vendor didn't work");
    });
});

//gulp.task('build', ['vendor'], function() {
gulp.task('build-concat', ['vendor'], function() {
  return gulp.src('./public/stylesheets/*.css')
	.pipe(minifyCss({keepBreaks:false}))
    	.pipe(rename('style.min.css'))
    	.pipe(gulp.dest('./build/concat/stylesheets/'));
	});

gulp.task('compress', function() {
  gulp.src('./public/javascripts/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build', ['compress'], function() {
  return gulp.src('./public/stylesheets/*.css')
    .pipe(minifyCss({keepBreaks:false}))
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('./build/css'));
});

//// end of additional plugins
gulp.task('nodemon', ['lint'], function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
     script: 'bin/www',
    // script: '/Users/Seiji/Desktop/team2/bin/www',
    // watch core server file(s) that require server restart on change
    watch: ['./routes/'],

    ext: 'html js',
    env: { 'NODE_ENV': 'development' }
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      browserSync.reload({
        stream: true
      });
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: ['public/**/*.*', 'views/**/*.*', 'public/javascripts/*.js'],

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    //Change whether browser will auto open
    open: true,

    // open the proxied app in chrome
    //browser: ['google chrome']
  });
});

// mongodump - dump all databases on localhost
gulp.task('mongodump', function() {
  mongobackup.dump({
    host : 'localhost',
    out : './dumps/mongo'
  });
});

// mongorestore - restore database to localhost
gulp.task('mongorestore', function() {
  mongobackup.restore({
    host : 'localhost',
    drop : true,
    path : './dumps/mongo'
  });
});



gulp.task('default', ['browser-sync']);

// prerequisites - must have heroku command line tools installed
//               - must be authenticated with heroku
//               - must have git installed and be in application root directory
//               - must be authenticated with git so that password does not have to be entered on push
gulp.task('stage', ['test'], function(){ 
    execute('git symbolic-ref --short HEAD', function(br){
        console.log('deploying current branch: ' + br);
        var timer; 
        return gulp.src('')
                .pipe(shell([
                    '<%= setKillTimer() %>',
                    'heroku git:remote -a robobetty-test<%= getArg()%> -r test<%= getArg() %>',
                    '<%= clearKillTimer() %>',
                    'git push -f test<%= getArg() %> <%= determineBranch() %>'
                ], {
                    templateData: {
                        determineBranch: function() {
                            var n_remote = br.trim() + ':master';
                            return n_remote;
                        },
                        getArg: function() {
                            var n = yargs.test;
                            if (n === null) {
                                n = "1";
                            }
                            return n;
                        },
                        setKillTimer: function() {
                            timer = setTimeout(function(){
                            console.error('ERROR: Wasn\'t able to deploy server.  Are you logged in? Please run "heroku login" and authenticate with Git.');
                            process.exit(1);
                            }, 5000);
                            return "";
                        },
                        clearKillTimer: function() {
                            clearTimeout(timer);
                            return "";
                        }
                    }
                }));
    }); 
});

// check pages on local
gulp.task('checkLocal', ['lint'], function(callback) {

  var options = {
    pageUrls: [
      'http://localhost:4000/',
      'http://localhost:4000/register',
      'http://localhost:4000/login'
    ],
    checkLinks: true,
    onlySameDomain: true,
    queryHashes: true,
    noRedirects: true,
    noLocalLinks: true,
    linksToIgnore: [
      // 'http://localhost:4000/ignore.html'
    ],
    checkXhtml: true,
    checkCaching: true,
    checkCompression: true,
    maxResponseTime: 200,
    summary: true
  };

  callback = function() {
    console.log('Done checking local.');
  };

  checkPages(console, options, callback);
});

//gulp.task('watch-check', function() {
//    gulp.watch('public/**/*.*', ['lint']);
//    gulp.watch('views/**/*.*', ['lint']);
//    gulp.watch('public/javascripts/*.js', ['lint']);
//});

// check pages on development
gulp.task('checkDev', ['lint'], function(callback) {
  var options = {
    pageUrls: [
      'http://robobetty-dev.herokuapp.com/',
      'http://robobetty-dev.herokuapp.com/register',
      'http://robobetty-dev.herokuapp.com/login'
    ],
    checkLinks: true,
    maxResponseTime: 500,
    summary: true
  };

  callback = function() {
    console.log('Done checking development.');
  };

  checkPages(console, options, callback);
});

// check pages on production
gulp.task('checkProd', function(callback) {
  var options = {
    pageUrls: [
      'http://robobetty.com/',
      'http://robobetty.com/register',
      'http://robobetty.com/login'
    ],
    checkLinks: true,
    maxResponseTime: 500,
    summary: true
  };

  callback = function() {
    console.log('Done checking production.');
  };

checkPages(console, options, callback);

});
// Generate API Doc

gulp.task('apidoc', function(){
          apidoc.exec({
            src: "routes/api",
            dest: "apidoc/"
          });
});

// Deploy API Docs to gh pages


gulp.task('deploy-gh', function () {
   	var currentdate = new Date();    
	var options = {
        message :  "Update API Doc --skip-ci"
    };
    return gulp.src('./apidoc/**/*')
        .pipe(deploy(options));
});

// Open API Docs
gulp.task('apidoc-url', function(){
  var options = {
    url: 'http://cse112-goldteam.github.io/web-app/'
  };
  return gulp.src('./README.md')
  .pipe(open('', options));
});
gulp.task('doc-deploy', ['apidoc','deploy-gh','apidoc-url']);
