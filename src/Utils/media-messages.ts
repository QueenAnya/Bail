import Jimp from 'jimp'
import { read, MIME_JPEG, RESIZE_BILINEAR } from 'jimp'

export const generateProfilePictureFull = async(img) => {
	const jimp = await read(img)
	const min = Math.min(jimp.getWidth(), jimp.getHeight())
	const cropped = jimp.crop(0, 0, jimp.getWidth(), jimp.getHeight())
	let width = jimp.getWidth(),
		hight = jimp.getHeight(),
		ratio;
	if (width > hight) {
		ratio = jimp.getWidth() / 720
	} else {
		ratio = jimp.getWidth() / 324
	};
	width = width / ratio;
	hight = hight / ratio;
	img = cropped.quality(100).resize(width, hight).getBufferAsync(MIME_JPEG);
	return {
		img: await cropped.quality(100).resize(width, hight).getBufferAsync(MIME_JPEG),
	}
}

export const generateProfilePictureFP = async(buffer) => {
    const jimp = await Jimp.read(buffer);
    const min = jimp.getWidth();
    const max = jimp.getHeight();
    const cropped = jimp.crop(0, 0, min, max);
    return {
      img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
      preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
    };
}

export const generatePP = async(buffer) => {
    const jimp = await Jimp.read(buffer);
    const min = jimp.getWidth();
    const max = jimp.getHeight();
    const cropped = jimp.crop(0, 0, min, max);
    return {
      img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
      preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
    };
  }
  
  export const changeprofileFull = async(img) => {
    const Jimp = require('jimp')
const { read, MIME_JPEG, RESIZE_BILINEAR } = require('jimp')
	const jimp = await read(img)
	const min = Math.min(jimp.getWidth(), jimp.getHeight())
	const cropped = jimp.crop(0, 0, jimp.getWidth(), jimp.getHeight())
	let width = jimp.getWidth(),
		hight = jimp.getHeight(),
		ratio;
	if (width > hight) {
		ratio = jimp.getWidth() / 720
	} else {
		ratio = jimp.getWidth() / 324
	};
	width = width / ratio;
	hight = hight / ratio;
	img = cropped.quality(100).resize(width, hight).getBufferAsync(MIME_JPEG);
	return {
		img: await cropped.quality(100).resize(width, hight).getBufferAsync(MIME_JPEG),
	}
}