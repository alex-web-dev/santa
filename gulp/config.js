import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const srcFolder = './src';
const buildFolder = './build';

export const path = {
	srcFolder,
	buildFolder,
	rootFolder,
	src: {
		html: `${srcFolder}`,
		pug: `${srcFolder}/pug`,
		sass: `${srcFolder}/sass`,
		sassGen: `${srcFolder}/sass/generated`,
		sassEntryFile: 'styles.sass',
		js: `${srcFolder}/js`,
		jsEntryFile: 'index.js',
		img: `${srcFolder}/img`,
		fonts: `${srcFolder}/fonts`,
		svgIcons: `${srcFolder}/icons/svg`,
		pngIcons: `${srcFolder}/icons/png`,
		favicon: `${srcFolder}/img/favicon.ico`,
		lang: `${srcFolder}/lang`,
	},
	build: {
		css: `${buildFolder}/static/css`,
		cssFile: 'styles.css',
		js: `${buildFolder}/static/js`,
		img: `${buildFolder}/static/img`,
		fonts: `${buildFolder}/static/fonts`,
		favicon: `${buildFolder}/static/img`,
	}
};