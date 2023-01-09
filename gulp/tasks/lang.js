import path from 'path';
import merge from 'gulp-merge-json';
import yaml from 'gulp-yaml';

export const lang = () => {
  return app.gulp.src(`${app.path.src.lang}/yaml/**/*.{yaml, yml}`)
    .pipe(yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(merge({
      fileName: 'all.json',
      edit: (json, file) => {
        const filename = path.basename(file.path);
        const primaryKey = filename.replace(path.extname(filename), '');
        const data = {
          langs: {}
        };
        data.langs[primaryKey] = json;

        return data;
      }
    }))
    .pipe(app.gulp.dest(`${app.path.src.lang}`));
};