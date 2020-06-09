const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const babel= require('gulp-babel');

const origin = 'src';
const destination = 'build';

sass.compiler = require('node-sass');

async function clean(cb){
   await del(destination);
    cb();//delete unnecessary files
}

//function html (cb){ //callbackfunction
   // src('src/index.html').pipe(dest('build'));
   // cb();
//}
function html(cb){ //callbackfunction
   src(`${origin}/**/*.html`).pipe(dest(destination));
    cb();
}
//function css (cb){ //callbackfunction
    //src(`${origin}/css/**/*.css`).pipe(dest(destination));
     //cb();
// }

//function css(cb){ //callbackfunction
   // src(`${origin}/css/**/*.css`).pipe(dest(`${destination}/css`));
    // cb();
    // }
    
/*function js(cb){ //callbackfunction
            src([
                `${origin}/js/lib/bootstrap.bundle.min.js`,
                `${origin}/js/lib/fontawesome-all.min.js`,
                `${origin}/js/lib/jquery.min.js`,
                s//this is how you can order files in destination  by making array
            ])*/
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
//.pipe(concatenate('build.js'))//make one file from several files
.pipe(dest(`${destination}/js`));
 cb();
 }

/*exports.html = html;
exports.css = css;
exports.js = js;*/



function watcher(cb){
    watch(`${origin}/**/*.html`).on('change',series(html,browserSync.reload))
    watch(`${origin}/**/*.scss`).on('change',series(css,browserSync.reload))
    watch(`${origin}/**/*.js`).on('change',series(js,browserSync.reload))
    cb();
}

function server(cb){
    browserSync.init({
        notify:false,
    //open:false,//no new window for browser
      server:{
          baseDir: destination
      }
    })
    cb();
}
exports.default = series(clean,parallel(html,css,js), server,watcher);