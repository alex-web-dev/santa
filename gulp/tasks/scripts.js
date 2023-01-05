// import uglify from 'gulp-uglify';
// import concat from 'gulp-concat';
// import merge from 'merge-stream';

// export const scripts = () => {
//   // const vendors = app.gulp.src([

//   // ])
//   // .pipe(concat('vendors.min.js'))
//   // .pipe(uglify())
//   // .pipe(app.gulp.dest(app.path.build.js))

//   const scripts = app.gulp.src([
//     `${app.path.src.js}/*.js`
//   ])
//   .pipe(concat('index.js'))
//   .pipe(app.gulp.dest(app.path.build.js))

//   // return merge(vendors, scripts)
//   return scripts;
// }

import webpack from 'webpack-stream';
import named from 'vinyl-named';
export const scripts = () => {
  return app.gulp.src([`${app.path.src.js}/${app.path.src.jsEntryFile}`])
    .pipe(named())
    .pipe(webpack({
      mode: app.isDev ? 'development' : 'production',
      devtool: false,
      output: {
        filename: '[name].js',
        environment: {
          arrowFunction: false
        }
      },
      target: ['web', 'es5'],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: {
                      "ie": "11"
                    }
                  }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js));
};
