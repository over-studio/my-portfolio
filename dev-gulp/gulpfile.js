// Initialize modules
const gulp = require('gulp');
const postcss = require('postcss');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const lineec = require('gulp-line-ending-corrector');

const root = '../';
const SRC = root + 'src/';
const DIST = root + 'dist/';

const scss = SRC + 'sass/';
const cssDist = DIST + 'css/';

const js = SRC + 'js/';
const jsDist = DIST + 'js/';

const styleWatchFiles = scss + '**/*.scss';

const cssSRC = [
	SRC + 'css/style1.css',
	SRC + 'css/style2.css',
	SRC + 'css/main.css'
];

function css() {
	return gulp.src([scss + 'main.scss'])
		.pipe(sourceMaps.init({ loadMaps: true, largeFile: true }))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			Browserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourceMaps.write())
		.pipe(lineec())
		.pipe(gulp.dest(SRC + 'css', { sourcemaps: './maps/' }))
		.pipe(browserSync.stream());
}

function concatCSS() {
	return gulp.src(cssSRC)
		.pipe(sourceMaps.init({ loadMaps: false, largeFile: true }))
		.pipe(concat('main.min.css'))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		// .pipe(sourceMaps.write())
		.pipe(lineec())
		.pipe(gulp.dest(cssDist, { sourcemaps: false }))
}

function serve() {
	browserSync.init({
		/* open: 'external',
		proxy: 'http:localhost/',
		port: 8080, */
		server: {
			baseDir: DIST
		}
	});

	// watchTask();

	gulp.watch(styleWatchFiles, gulp.series(css, concatCSS));
	gulp.watch([cssDist + 'main.min.css']).on('change', reload);
}

// Watch task
function watchTask() {
	gulp.watch(styleWatchFiles, gulp.series(css, concatCSS));
	gulp.watch([cssDist + 'main.min.css']).on('change', reload);
}

// exports.css = css;
// exports.concatCSS = concatCSS;
// exports.serve = serve;
exports.watch = watch;

// const build = gulp.parallel(serve);
gulp.task('default', serve);
