import browserSync from 'browser-sync';

import { styles } from './styles.js';
import { imgToBase64 } from './imgToBase64.js';
import { img } from './img.js';
import { scripts } from './scripts.js';
import { svg } from './svg.js';
import { pngSprite } from './png-sprite/png-sprite.js';
import { pug } from './pug.js';
import { fonts } from './fonts.js';
import { lang } from './lang.js';

function reload(done) {
  browserSync.reload();
  done();
};

export const watcher = () => {
  app.gulp.watch(`${app.path.src.pug}/**/*.pug`, app.gulp.series(pug, reload));
  app.gulp.watch(`${app.path.src.sass}/**/*.sass`, app.gulp.series(styles, imgToBase64, reload));
  app.gulp.watch(`${app.path.src.img}/**/*.{jpg,jpeg,png,gif,svg}`, app.gulp.series(img, reload));
  app.gulp.watch(`${app.path.src.svgIcons}/**/*.svg`, app.gulp.series(svg, reload));
  app.gulp.watch(`${app.path.src.pngIcons}/**/*.png`, app.gulp.series(pngSprite, reload));
  app.gulp.watch(`${app.path.src.favicon}`, app.gulp.series(reload));
  app.gulp.watch(`${app.path.src.js}/**/*.js`, app.gulp.series(scripts, reload));
  app.gulp.watch(`${app.path.src.fonts}/**/*.ttf`, app.gulp.series(fonts, reload));
  app.gulp.watch(`${app.path.srcFolder}/lang/yaml/**/*.{yaml, yml}`, app.gulp.series(lang, pug, reload));
}