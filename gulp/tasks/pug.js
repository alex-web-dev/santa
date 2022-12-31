import gulpPug from 'gulp-pug';
import replace from 'gulp-replace';
import fs from 'fs';
import gulpif from 'gulp-if';

export const pug = () => {
	return app.gulp.src(`${app.path.src.pug}/*.pug`)
		.pipe(gulpPug({
			pretty: true
		}))
		.pipe(gulpif(app.isProd, replace(/<link rel="stylesheet" href="assets\/css\/styles.css"[^>]*>/, function (s) {
			const style = fs.readFileSync('build/assets/css/styles.css', 'utf8');
			return '<style>' + style + '</style>';
		})))
		.pipe(gulpif(app.isProd, replace(/<script src="assets\/js\/index.js"[^>]*>/, function (s) {
			const script = fs.readFileSync('build/assets/js/index.js', 'utf8');
			return '<script>' + script;
		})))
		.pipe(app.gulp.dest(app.path.buildFolder));
}