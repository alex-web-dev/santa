import { path } from './gulp/config.js';
import gulp from "gulp";
import yargs from 'yargs';

const isDev = yargs.argv.dev;
const isProd = !isDev;

global.app = {
	path,
	gulp,
	isDev,
	isProd
};

import { clean } from './gulp/tasks/clean.js';
import { pug } from './gulp/tasks/pug.js';
import { styles, modifyCss } from './gulp/tasks/styles.js';
import { imgToBase64 } from './gulp/tasks/imgToBase64.js';
import { scripts } from './gulp/tasks/scripts.js';
import { img } from './gulp/tasks/img.js';
import { svg } from './gulp/tasks/svg.js';
import { pngSprite } from './gulp/tasks/png-sprite/png-sprite.js';
import { browsersync } from './gulp/tasks/browsersync.js';
import { watcher } from './gulp/tasks/watcher.js';
import { fonts } from './gulp/tasks/fonts.js';
import { copy } from './gulp/tasks/copy.js';
import { lang } from './gulp/tasks/lang.js';

const dev = gulp.series(clean, pngSprite, gulp.parallel(styles, scripts, img, fonts, svg), imgToBase64, lang, pug, copy, browsersync, watcher);
const build = gulp.series(clean, pngSprite, gulp.parallel(styles, scripts, img, fonts, svg), imgToBase64, modifyCss, lang, pug, copy, );

gulp.task('dev', dev);
gulp.task('build', build);
gulp.task('default', dev);
gulp.task('lang', lang);
gulp.task('pug', pug);