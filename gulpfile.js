const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const babel= require('gulp-babel');
const concatenate = require('gulp-concat');
//const phpConnect = require('gulp-connect-php');
const origin = 'src';
const destination = 'build';

sass.compiler = require('node-sass');

async function clean(cb){
   await del(destination);
    cb();//delete unnecessary files
}


function php(cb){ //callbackfunction
    src(`${origin}/**/*.php`).pipe(dest(destination));
     cb();
}
//function html(cb){ //callbackfunction
   //src(`${origin}/**/*.html`).pipe(dest(destination));
    //cb();
//}
function images(cb){ //callbackfunction
    src(`${origin}/**/*.{png,jpeg,jpg}`).pipe(dest(destination));
     cb();
 }

function css(cb) {
 src([`${origin}/css/animate.css`]).pipe(dest(`${destination}/css`));
              
 src(`${origin}/css/style.scss`)
.pipe(sass({
 outputStyle: 'compressed'
     }))
                
    .pipe(dest(`${destination}/css`));      
    cb();
      }
           
      function js(cb) {
        src(`${origin}/js/lib/**/*.js`).pipe(dest(`${destination}/js/lib`));
                     
       src(`${origin}/js/script.js`)
       .pipe(babel({ //babel is filter
       presets: ['@babel/env']//make compatiable with older browsers
       }))  
       .pipe(concatenate('build.js'))//make one file from several files
       .pipe(dest(`${destination}/js`));
        cb();
        }

function watcher(cb){
    watch(`${origin}/**/*.php`).on('change',series(php,browserSync.reload))
    //watch(`${origin}/**/*.html`).on('change',series(html,browserSync.reload))
    watch(`${origin}/**/*.scss`).on('change',series(css,browserSync.reload))
    watch(`${origin}/**/*.js`).on('change',series(js,browserSync.reload))
    watch(`${origin}/**/*.{png,jpeg,jpg}`).on('change',series(images,browserSync.reload))
    cb();
}

function server(cb){
    browserSync.init({
        notify:false,
    //open:false,//no new window for browser
      server:{
       // baseDir: destination,
        proxy: "localhost:80/portfolio/build",
        index:"index.php"

      },
        port:80,
        open:true,
        online:true
        //notify:false
    })
  
    cb();
  }
  
exports.default = series(clean,parallel(php,css,js,images), server,watcher);