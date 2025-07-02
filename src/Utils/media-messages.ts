import Jimp from 'jimp'
import { read, MIME_JPEG, RESIZE_BILINEAR } from 'jimp'
import {
	WAMediaUpload
} from '../Types'
import { Readable } from 'stream'

 const toBuffer = async(stream: Readable) => {
	const chunks: Buffer[] = []
	for await (const chunk of stream) {
		chunks.push(chunk)
	}

	stream.destroy()
	return Buffer.concat(chunks)
}

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
  
  export const generateProfilePicturee = async(mediaUpload: WAMediaUpload) => {
	let bufferOrFilePath: Buffer | string
	let img: Promise<Buffer>

	if(Buffer.isBuffer(mediaUpload)) {
		bufferOrFilePath = mediaUpload
	} else if('url' in mediaUpload) {
		bufferOrFilePath = mediaUpload.url.toString()
	} else {
		bufferOrFilePath = await toBuffer(mediaUpload.stream)
	}

	const jimp = await Jimp.read(bufferOrFilePath as any)
	const cropped = jimp.getWidth() > jimp.getHeight() ? jimp.resize(720, -1) : jimp.resize(-1, 720)

		img = cropped
			.quality(100)
			.getBufferAsync(Jimp.MIME_JPEG)

	return {
		img: await img,
	}
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