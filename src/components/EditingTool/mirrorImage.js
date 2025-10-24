export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

export default async function getMirrorImg(imageSrc, mirrorValueX, mirrorValueY) {
	const image = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) return null;

	canvas.width = image.width;
	canvas.height = image.height;

	ctx.scale(mirrorValueX, mirrorValueY);
	ctx.drawImage(image, -image.width, 0);
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.scale(mirrorValueX, mirrorValueY);
	ctx.drawImage(image, 0, -image.height);
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.scale(mirrorValueX, mirrorValueY);
	ctx.drawImage(image, -image.width, -image.height);
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	// As a blob
	return new Promise((resolve, reject) => {
		canvas.toBlob((file) => {
			file.name = "Mirror.jpeg";
			resolve({ file: file, url: URL.createObjectURL(file) });
		}, "image/jpeg");
	});
}
