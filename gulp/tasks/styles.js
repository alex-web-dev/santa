import sassGlob from 'gulp-sass-glob';
import postcss from 'gulp-postcss';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import tildeImporter from 'node-sass-tilde-importer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import modifyCssUrls from 'gulp-modify-css-urls';

const sass = gulpSass(dartSass);

export const styles = () => {
  return app.gulp.src(`${app.path.src.sass}/${app.path.src.sassEntryFile}`)
    .pipe(sassGlob())
    .pipe(gulpif(app.isDev, sourcemaps.init()))
    .pipe(sass({
      importer: tildeImporter
    }).on('error', sass.logError))
    .pipe(gulpif(app.isProd, postcss([autoprefixer])))
    .pipe(gulpif(app.isDev, sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(browserSync.stream());
}

export const modifyCss = () => {
  return app.gulp.src(`${app.path.build.css}/${app.path.build.cssFile}`)
    .pipe(gulpif(app.isProd, modifyCssUrls({
      modify: function (url, filePath) {
        return url.replace('../', './static/');
      },
    })))
    .pipe(gulpif(app.isProd, cleanCss({ compatibility: 'ie8' })))
    .pipe(app.gulp.dest(app.path.build.css));
}