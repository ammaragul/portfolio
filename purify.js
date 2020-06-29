// purify.js
const purify = require("purify-css")
const htmlFiles = ['src/index.html'];
const cssFiles = ['build/style.css'];
const opts = {
    output: 'purified.css'
};
purify(htmlFiles, cssFiles, opts, function (res) {
    log(res);
});