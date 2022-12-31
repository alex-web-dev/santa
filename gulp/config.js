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
		img: `${srcFolder}/img`,
		fonts: `${srcFolder}/fonts`,
		svgIcons: `${srcFolder}/icons/svg`,
		pngIcons: `${srcFolder}/icons/png`,
		favicon: `${srcFolder}/img/favicon.ico`,

	},
	build: {
		css: `${buildFolder}/assets/css`,
		cssFile: 'styles.css',
		js: `${buildFolder}/assets/js`,
		img: `${buildFolder}/assets/img`,
		fonts: `${buildFolder}/assets/fonts`,
		favicon: `${buildFolder}/assets/img`,
	}
};