import base64 from 'gulp-base64';

export const imgToBase64 = () => {
  return app.gulp.src(`${app.path.build.css}/${app.path.build.cssFile}`)
    .pipe(base64({
      extensions: ['png', 'svg'],
      maxImageSize: 6 * 1024,
    }))
    .pipe(app.gulp.dest(app.path.build.css));
}