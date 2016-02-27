'use strict';

// ソース元の対象ファイル
var source = './src/js/app.js';

// 出力ディレクトリ
var dist_dir = './public/js/';

// アプリファイル
var appjs = 'app.js';

// minify後のアプリ名ファイル
var appminjs = 'app.min.js';

var watch      = require('gulp-watch');
var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var uglify     = require("gulp-uglify");
var rename     = require('gulp-rename');
var plumber    = require('gulp-plumber');
var runSequence= require('run-sequence');
var path       = require('path');

gulp.task('browserify', function() {
	return browserify(source)
		.bundle()
		.pipe(plumber())
		//Pass desired output filename to vinyl-source-stream
		.pipe(source(appjs))
		// Start piping stream to tasks!
		.pipe(gulp.dest(dist_dir));
});

gulp.task('minify', function() {
	return gulp.src(path.join(dist_dir, appjs))
		.pipe(uglify())
		.pipe(rename(appminjs))
		.pipe(gulp.dest(dist_dir));
});


gulp.task('build', function(callback) {
	return runSequence(
		'browserify',
		'minify',
		callback
	);
});

gulp.task('watch', function() {
	gulp.watch('src/js/**/*.js', ['build']);
});
