'use strict';

const gulp = require('gulp');
const babel=require('gulp-babel');
const nodesass = require('node-sass');
const gulpsass = require('gulp-sass');
const sass = gulpsass(nodesass);
const include = require('gulp-file-include');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const order = require('gulp-order');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').init({
	server: {
		baseDir: './release/'
	}
});

gulp.task('include', function(){
	return gulp.src('./src/html/*.html')
		.pipe(include({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./release/'));
})

gulp.task('sass', function() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			// outputStyle: 'compressed'
		}))
		.pipe(autoPrefixer())
		.pipe(gulp.dest('./release/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function(){
	return gulp.src('./release/*.html')
		.pipe(browserSync.stream());
	});

gulp.task('js', function(){
	return gulp.src('./src/js/**/*.js')
		// .pipe(uglify())
	.pipe(babel({
		presets: ["@babel/preset-env"]
	}))
	.pipe(concat('master.js'))
	.pipe(gulp.dest('./release/js/'))
	.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./release/*.html', gulp.series('html'));
	gulp.watch('./src/html/**/*.html', gulp.series('include'));
	gulp.watch('./src/js/**/*.js', gulp.series('js'));
});