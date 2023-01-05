import gulpif from 'gulp-if';
import modifyCssUrls from 'gulp-modify-css-urls';

export const modifyCss = () => {
  return app.gulp.src(`${app.path.build.css}/${app.path.build.cssFile}`)
    .pipe(gulpif(app.isProd, modifyCssUrls({
      modify: function (url, filePath) {
        return url.replace('../', './assets/');
      },
    })))
    .pipe(app.gulp.dest(app.path.build.css));
}