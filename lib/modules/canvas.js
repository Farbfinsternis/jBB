import { Color } from "./color.js";

/**
 * Manages the HTML5 Canvas element, its drawing contexts, and global drawing states.
 */
export class Canvas{
	/** @private */
	#el;
	/** @private */
	#ctx;
	/** @private */
	#activeContext; // The currently active drawing context

	/** @private */
	#alpha;
	/** @private */
	#scale;
	/** @private */
	#clsColor;
	/** @private */
	#drawColor;
	/** @private */
	#autoMidHandle;

	/**
	 * @param {number} [width=640] The width of the canvas.
	 * @param {number} [height=480] The height of the canvas.
	 */
	constructor(width = 640, height = 480){
		this.#el = document.createElement("canvas");
		this.#el.id = "jBBCanvas";
		this.#el.width = width;
		this.#el.height = height;
		this.#ctx = this.#el.getContext("2d");
		this.#activeContext = this.#ctx;
		this.#ctx.lineWidth = 1;
		this.#ctx.textBaseline = "top";

		this.#alpha = 1.0;
		this.#scale = 1.0;
		this.#clsColor = new Color(0, 0, 0);
		this.#drawColor = new Color();
		this.#autoMidHandle = false;

		// Defer appending the canvas element until the document body is available,
		// allowing the script to be loaded in the <head> without errors.
		const appendCanvas = () => document.body.append(this.#el);

		if (document.body) {
			appendCanvas();
		} else {
			window.addEventListener('DOMContentLoaded', appendCanvas);
		}
	}

	/**
	 * The underlying HTMLCanvasElement.
	 * @returns {HTMLCanvasElement}
	 */
	get element(){
		return this.#el;
	}

	/**
	 * The currently active 2D rendering context (either the screen or an image buffer).
	 * @returns {CanvasRenderingContext2D}
	 */
	get context(){
		return this.#activeContext;
	}

	/**
	 * Sets the active drawing target.
	 * @param {object | null} jmageOrNull The Jmage instance to draw to, or null to draw to the screen.
	 */
	setTarget(jmageOrNull) {
		if (jmageOrNull && typeof jmageOrNull.getBufferContext === 'function') {
			this.#activeContext = jmageOrNull.getBufferContext();
		} else {
			this.#activeContext = this.#ctx; // Fallback to the main screen context
		}
	}

	/**
	 * The width of the main canvas.
	 * @returns {number}
	 */
	get width(){
		return this.#el.width;
	}

	/**
	 * The height of the main canvas.
	 * @returns {number}
	 */
	get height(){
		return this.#el.height;
	}

	/** @param {boolean} value - True to focus the canvas, false to blur. */
	set focus(value = true){
		if (value) {
			this.#el.focus();
		} else {
			this.#el.blur();
		}
	}

	/**
	 * The color used by the Cls command.
	 * @returns {Color}
	 */
	get clsColor(){
		return this.#clsColor;
	}

	/**
	 * The currently active drawing color.
	 * @returns {Color}
	 */
	get drawColor(){
		return this.#drawColor;
	}

	/** @param {boolean} value - True to enable automatic mid-handling for new images. */
	set autoMidHandle(value = true){
		this.#autoMidHandle = value;
	}

	/**
	 * Whether automatic mid-handling is enabled.
	 * @returns {boolean}
	 */
	get autoMidHandle(){
		return this.#autoMidHandle;
	}

	/**
	 * The global alpha value (not currently implemented in drawing operations).
	 * @returns {number}
	 */
	get alpha(){
		return this.#alpha;
	}

	/** @param {number} value - The global alpha value. */
	set alpha(value = 1.0){
		this.#alpha = value;
	}

	/**
	 * The global scale value (not currently implemented in drawing operations).
	 * @returns {number}
	 */
	get scale(){
		return this.#scale;
	}

	/** @param {number} value - The global scale value. */
	set scale(value = 1.0){
		this.#scale = value;
	}

	/**
	 * Reads the color data of a single pixel from the main canvas.
	 * @param {number} x The x-coordinate of the pixel.
	 * @param {number} y The y-coordinate of the pixel.
	 * @returns {{r: number, g: number, b: number, a: number}} An object with the RGBA color components.
	 */
	readPixel(x, y) {
		const pixelData = this.#ctx.getImageData(x, y, 1, 1).data;
		return { r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] };
	}

	/**
	 * Sets the composition mode for all subsequent drawing operations.
	 * @param {string} mode The blend mode to apply (e.g., "add", "multiply", "screen"). Defaults to "default".
	 */
	setBlendMode(mode) {
		const modeMap = {
			"default": "source-over", // Normal
			"add": "lighter",         // Additive blending
			"alpha": "source-over",   // Normal alpha blending
			"multiply": "multiply",
			"screen": "screen"
		};
		this.#activeContext.globalCompositeOperation = modeMap[String(mode).toLowerCase()] || "source-over";
	}
}