export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

export default async function getFilterImg(imageSrc, effectValue) {
	const image = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) return null;

	canvas.width = image.width;
	canvas.height = image.height;

	const Filters = [
		{
			EffectNormal:
				"contrast(100%) brightness(100%) saturate(100%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			Effect1977:
				"contrast(110%) brightness(110%) saturate(130%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectAden:
				"contrast(90%) brightness(120%) saturate(85%) sepia(0%) hue-rotate(20deg) grayscale(0%) invert(0%) blur(0px)",
			EffectAmaro:
				"contrast(90%) brightness(110%) saturate(150%) sepia(0%) hue-rotate(-10deg) grayscale(0%) invert(0%) blur(0px)",
			EffectBrannan:
				"contrast(140%) brightness(100%) saturate(100%) sepia(50%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectBrooklyn:
				"contrast(90%) brightness(110%) saturate(100%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectClarendon:
				"contrast(120%) brightness(125%) saturate(100%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectEarlybird:
				"contrast(90%) brightness(100%) saturate(100%) sepia(20%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectGingham:
				"contrast(105%) brightness(100%) saturate(100%) sepia(0%) hue-rotate(350deg) grayscale(0%) invert(0%) blur(0px)",
			EffectHudson:
				"contrast(90%) brightness(120%) saturate(110%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectInkwell:
				"contrast(110%) brightness(110%) saturate(100%) sepia(30%) hue-rotate(0deg) grayscale(100%) invert(0%) blur(0px)",
			EffectLofi:
				"contrast(150%) brightness(100%) saturate(110%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectMaven:
				"contrast(95%) brightness(95%) saturate(150%) sepia(25%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectPerpetua:
				"contrast(100%) brightness(100%) saturate(100%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectReyes:
				"contrast(85%) brightness(110%) saturate(75%) sepia(22%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectStinson:
				"contrast(75%) brightness(115%) saturate(85%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectToaster:
				"contrast(110%) brightness(110%) saturate(130%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectWalden:
				"contrast(110%) brightness(160%) saturate(100%) sepia(30%) hue-rotate(350deg) grayscale(0%) invert(0%) blur(0px)",
			EffectValencia:
				"contrast(108%) brightness(108%) saturate(100%) sepia(8%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
			EffectXpro2:
				"contrast(100%) brightness(100%) saturate(100%) sepia(30%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px)",
		},
	];

	const filterName = effectValue.split("_")[1];

	ctx.filter = Filters[0][filterName];

	ctx.drawImage(image, 0, 0);

	// As a blob
	return new Promise((resolve, reject) => {
		canvas.toBlob((file) => {
			file.name = "Mirror.jpeg";
			resolve({ file: file, url: URL.createObjectURL(file) });
		}, "image/jpeg");
	});
}
