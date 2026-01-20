/**
 * Represents a single font that can be loaded and used for drawing text.
 */
export class Font{
	/** @private */
	#name;
	/** @private */
	#jbb;
	/** @private */
	#isReady = false;

	/** @param {object} jbbInstance A reference to the main jBB class instance. */
	constructor(jbbInstance){
		this.#jbb = jbbInstance;
	}

	/**
	 * Asynchronously loads the font file and makes it available for drawing.
	 * @param {string} path The path to the font file.
	 * @param {string} name The CSS font-family name to assign.
	 */
	async load(path, name) {
		this.#name = name;
		try {
			const fontFace = new FontFace(name, `url(${path})`);
			await fontFace.load();
			document.fonts.add(fontFace);
			this.#isReady = true;
		} catch (e) {
			console.error(`jBB Font: Failed to load font at ${path}`, e);
		}
	}

	/**
	 * Sets the current font style for subsequent text drawing operations.
	 * @param {number} size The font size in pixels.
	 * @param {boolean} [bold=false] True to make the font bold.
	 * @param {boolean} [italic=false] True to make the font italic.
	 * @param {number} [weight=0] An optional font weight (e.g., 700). Overrides `bold` if set.
	 */
	set(size, bold = false, italic = false, weight = 0){
		if (!this.#isReady) return;

		const style = italic ? "italic" : "normal";
		const fontWeight = bold ? (weight > 0 ? weight : "bold") : "normal";
		
		this.#jbb.canvas.font = `${style} ${fontWeight} ${size}px ${this.#name}`;
	}

	/**
	 * Draws text on the canvas using this font.
	 * @param {number} [x=0] The x-coordinate to start drawing.
	 * @param {number} [y=0] The y-coordinate to start drawing.
	 * @param {string} value The text to draw.
	 */
	text(x = 0, y = 0, value){
		if (!this.#isReady) return;
		this.#jbb.canvas.fillText(String(value), x, y);
	}

	/**
	 * Measures the width of a given string if it were drawn with this font.
	 * @param {string} [value="W"] The string to measure.
	 * @returns {number} The width in pixels.
	 */
	width(value = "W"){
		if (!this.#isReady) return 0;
		return this.#jbb.canvas.measureText(value).width;
	}

	/**
	 * Measures the height of a given string if it were drawn with this font.
	 * @param {string} [value="W"] The string to measure.
	 * @returns {number} The height in pixels.
	 */
	height(value = "W"){
		if (!this.#isReady) return 0;
		const metrics = this.#jbb.canvas.measureText(value);
		return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
	}
}