import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import merge from 'merge-stream';

export const scripts = () => {
  // const vendors = app.gulp.src([
    
  // ])
  // .pipe(concat('vendors.min.js'))
  // .pipe(uglify())
  // .pipe(app.gulp.dest(app.path.build.js))

  const scripts = app.gulp.src([
    `${app.path.src.js}/*.js`
  ])
  .pipe(concat('index.js'))
  .pipe(app.gulp.dest(app.path.build.js))

  // return merge(vendors, scripts)
  return scripts;
}