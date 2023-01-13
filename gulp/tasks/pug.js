import gulpPug from 'gulp-pug';
import replace from 'gulp-replace';
import fs from 'fs';
import gulpif from 'gulp-if';
import typograf from 'gulp-typograf';
import data from 'gulp-data';

export const pug = () => {
	return app.gulp.src(`${app.path.src.pug}/*.pug`)
		.pipe(data(function () {
			return JSON.parse(fs.readFileSync(`${app.path.src.lang}/all.json`))
		}))
		.pipe(gulpPug({
			pretty: true
		}))
		.pipe(typograf({ locale: ['ru', 'en-US'] }))
		.pipe(gulpif(app.isProd, replace(/<link rel="stylesheet" href="static\/css\/styles.css"[^>]*>/, function (s) {
			const style = fs.readFileSync('build/static/css/styles.css', 'utf8');
			return '<style>' + style + '</style>';
		})))
		.pipe(gulpif(app.isProd, replace(/<script src="static\/js\/index.js"[^>]*>/, function (s) {
			const script = fs.readFileSync('build/static/js/index.js', 'utf8');
			return '<script>' + script;
		})))
		.pipe(app.gulp.dest(app.path.buildFolder));
}