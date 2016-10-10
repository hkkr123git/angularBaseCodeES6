const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const webpack = require('webpack');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const watch = require('gulp-watch');
const vinylSourceStream = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
// Load all gulp plugins into the plugins object.
const plugins = require('gulp-load-plugins')();
const FlowtypePlugin = require('flowtype-loader/plugin');
//---------------------------------------------------------
const appSrc = {
	html: 'app/**/*.html',
	libs: [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/moment/min/moment.min.js',
    'bower_components/localforage/dist/localforage.js',
    'bower_components/angular-localforage/dist/angular-localForage.min.js',
    'bower_components/angular-confirm-modal/angular-confirm.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-material/angular-material.min.js',
		'bower_components/oclazyload/dist/ocLazyLoad.require.min.js'
  ],
  csslibs: [
	  'bower_components/bootstrap/dist/css/bootstrap.min.css',
	  'bower_components/angular-toastr/dist/angular-toastr.min.css',
	  'bower_components/angular-material/angular-material.min.css',
  ],
	scripts: {
		all: 'app/**/*.js',
		app: 'app/app.js'
	}
};
const build = 'build/';
//---------------------------------------------------------
//clean the /build dir.
gulp.task('clean-dir', function () {
  return del.sync([build + '*'], {force: true});
});

//---------------------------------------------------------
//task to copy index.html, resources & test folder into /build
gulp.task('copy', function () {
  gulp.src('index.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(build));
  gulp.src('test/**/*', {base: '.'})
    .pipe(gulp.dest('../build'));
  gulp.src(['resources/css/**/*.*'], {base: '.'})
    .pipe(gulp.dest(build));
  gulp.src('resources/fonts/**/*', {base: '.'})
    .pipe(gulp.dest(build));
  gulp.src(['resources/images/**/*', 'resources/images/icons/**/*'], {base: '.'})
    .pipe(gulp.dest(build));
});

//---------------------------------------------------------
//task to compile & minify 3rd party js plugin files into /build/lib
gulp.task('js-lib', function () {
  gulp.src(appSrc.libs)
    .pipe(concat('libs.all.js', {newline: ';'}))
    .pipe(gulp.dest(build + 'app/libs'));
});

//---------------------------------------------------------
/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function() {
  return
    gulp.src(appSrc.scripts.all)
      .pipe(plugins.jshint({
        esnext: true // Enable ES6 support
      }))
      .pipe(plugins.jshint.reporter('jshint-stylish'));
});
//---------------------------------------------------------
//task to compile 3rd party CSS files into /build/resorces/css
gulp.task('css-lib', function () {
  gulp.src(appSrc.csslibs)
    .pipe(concat('libs.all.css'), {newline: ';'})
    .pipe(gulp.dest(build + 'resources/css'));
});

//---------------------------------------------------------
//task to compile & minify module js files into /build
gulp.task('js-app', ['jshint'], function (callback) {
	const myConfig = Object.create(webpackConfig);
	myConfig.plugins = [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
	  new FlowtypePlugin()
	];
	// run webpack
	webpack(myConfig, function(err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true,
			progress: true
		}));
		callback();
	});
});

//task to compile & source module js files into /build
gulp.task('js-app-debug', ['jshint'], function (callback) {
	// modify some webpack config options
	const myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;
	myConfig.devtool = 'source-map';
	myConfig.plugins = [
		new FlowtypePlugin()
	];
	// run webpack
	webpack(myConfig, function(err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true,
			progress: true
		}));
		callback();
	});
});
//---------------------------------------------------------
//task to compile & minify template files into /build
gulp.task('tmpl', function () {
    return gulp.src(appSrc.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache('template.all.js', {module: 'snsCmsApp', root: 'app/'}))
        .pipe(gulp.dest(build + 'app'));
});

//---------------------------------------------------------
//setting up watches
gulp.task('watch-js', function () {
    watch(appSrc.scripts.all, function () {
        gulp.start('js-app-debug');
    });
});

gulp.task('watch-html', function () {
    watch(appSrc.html, function () {
        gulp.start('tmpl');
    });
});

gulp.task('watch-css', function () {
    watch('resources/css/**/*.*', function () {
        gulp.src('resources/css/**/*', {base: '.'})
            .pipe(gulp.dest(build));
    });
});

gulp.task('watch-images', function () {
    watch('resources/images/**/*.*', function () {
        gulp.src('resources/images/**/*', {base: '.'})
            .pipe(gulp.dest(build));
    });
});

gulp.task('server', ['build-debug', 'watch'], function() {
	// modify some webpack config options
	const myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;
	myConfig.devtool = 'source-map';
	myConfig.plugins = [
		new FlowtypePlugin()
	];
	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: build,
		stats: {
			colors: true
		},
		hot: true
	}).listen(8082, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
	});
});

//---------------------------------------------------------
//declaring tasks
gulp.task('watch', ['watch-css', 'watch-images', 'watch-js','watch-html']);
gulp.task('build-debug', ['clean-dir', 'copy', 'css-lib', 'js-lib', 'js-app-debug', 'tmpl']);
gulp.task('build', ['clean-dir', 'copy', 'css-lib', 'js-lib', 'js-app', 'tmpl']);
gulp.task('default', ['server']);
