// node.js Packages / Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

// Paths
var paths = {
	public: {
		www: 'public',
	},
	src: {
		root: 'src',
		html: 'public/**/*.html',
		vendors: 'public/vendors/**/*.*',

		img: 'public/img/**/*.+(png|jpg|gif|svg)',

		jsPlugins: [
			'src/plugins/fontawesome/js/all.js',
			'src/plugins/jquery-3.4.1.min.js',
			'src/plugins/popper.min.js',
			'src/plugins/bootstrap/js/bootstrap.min.js',
			'src/plugins/imagesloaded.pkgd.min.js',
			'src/plugins/isotope.pkgd.min.js',
			'src/plugins/js-cookie.min.js',
			'src/plugins/tiny-slider/min/tiny-slider.js',
		],
		js: [
			// 'src/js/**/*.js'
			'src/js/blog.js',
			'src/js/dark-mode.js',
			'src/js/form.js',
			'src/js/isotope-custom.js',
			'src/js/pricing.js',
			'src/js/testimonials.js',
			'src/js/demo/style-switcher.js'
		],

		cssPlugins: [
			// 'src/plugins/**/*.css',
			'src/plugins/highlight/styles/monokai-sublime.css',
		],
		css: [
			'src/css/main.css',
			// 'src/css/theme-1.css'
		],
		scss: 'src/sass/**/*.scss',
	},
	dist: {
		root: 'dist',
		css: 'dist/css',
		js: 'dist/js',
		img: 'dist/img',
		vendors: 'dist/vendors',
	},
};

// Compile SCSS
gulp.task('sass', () => {
	return gulp
		.src(paths.src.scss)
		.pipe(
			sass({
				outputStyle: 'compressed',
			}).on('error', sass.logError),
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest(paths.src.root + '/css'));
});

// Minify + Combine CSS
gulp.task('css', () => {
	return gulp
		.src([...paths.src.cssPlugins, ...paths.src.css])
		// .src(paths.src.root + '/css/theme-1.css')
		.pipe(
			cleanCSS({
				compatibility: 'ie8',
			}),
		)
		.pipe(concat('app.css'))
		.pipe(
			rename({
				suffix: '.min',
			}),
		)
		.pipe(gulp.dest(paths.public.www + '/css'))
		.pipe(browserSync.stream());
});

// Minify + Combine JS
gulp.task('js', () => {
	return gulp
		.src([...paths.src.js])
		.pipe(
			babel({
				presets: ['@babel/preset-env'],
			}),
		)
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.public.www + '/js'))
		.pipe(browserSync.stream());
});

// Compress (JPEG, PNG, GIF, SVG, JPG)
gulp.task('img', () => {
	return gulp
		.src(paths.src.img)
		.pipe(
			imagemin([
				/* imagemin.gifsicle({
					interlaced: true,
				}),
				imagemin.mozjpeg({
					quality: 75,
					progressive: true,
				}),
				imagemin.optipng({
					optimizationLevel: 5,
				}),
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: true,
						},
						{
							cleanupIDs: false,
						},
					],
				}), */
			]),
		)
		.pipe(gulp.dest(paths.dist.img));
});

// copy vendors to dist
gulp.task('vendors', () => {
	return gulp
		.src(paths.src.vendors)
		.pipe(gulp.dest(paths.dist.vendors));
});

// clean dist
gulp.task('clean', function () {
	return gulp
		.src(paths.dist.root)
		.pipe(clean());
});

// Prepare all src for production
// gulp.task('build', gulp.series('sass', 'css', 'js', 'img', 'vendors'));
gulp.task('build', gulp.series('sass', 'css', 'js', 'img'));

// Watch (SASS, CSS, JS, and HTML) reload browser on change
gulp.task('watch', () => {
	browserSync.init({
		server: {
			baseDir: paths.public.www,
		},
	});

	gulp.watch(paths.src.scss, gulp.series('sass'));
	gulp.watch(paths.src.css, gulp.series('css'));
	gulp.watch(paths.src.js, gulp.series('js'));
	gulp.watch(paths.src.html).on('change', browserSync.reload);
});
