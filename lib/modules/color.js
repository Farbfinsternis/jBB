/**
 * Represents an RGBA color and provides utilities for its manipulation.
 */
export class Color{
	/** @private */
	#r; #g; #b; #a;

	/**
	 * @param {number} [red=255] The red component (0-255).
	 * @param {number} [green=255] The green component (0-255).
	 * @param {number} [blue=255] The blue component (0-255).
	 * @param {number} [alpha=1.0] The alpha component (0.0-1.0 or 0-255).
	 */
	constructor(red = 255, green = 255, blue = 255, alpha = 1.0){
		this.set(red, green, blue, alpha);
	}
	
	/**
	 * Returns the color as a CSS-compatible "rgba(r,g,b,a)" string.
	 * @returns {string}
	 */
	rgba(){
		return "rgba(" + this.#r + "," + this.#g + "," + this.#b + "," + this.#a + ")";
	}

	/**
	 * Sets the color components. Automatically handles and normalizes different alpha ranges (0-1 vs 0-255).
	 * @param {number} red The red component.
	 * @param {number} green The green component.
	 * @param {number} blue The blue component.
	 * @param {number} alpha The alpha component.
	 */
	set(red, green, blue, alpha){
		this.#r = Math.max(0, Math.min(255, Number(red) || 0));
		this.#g = Math.max(0, Math.min(255, Number(green) || 0));
		this.#b = Math.max(0, Math.min(255, Number(blue) || 0));

		let numericAlpha = (alpha === undefined || alpha === null) ? 1.0 : Number(alpha);

		if (numericAlpha > 1.0) {
			this.#a = Math.max(0, Math.min(1, numericAlpha / 255));
		} else {
			this.#a = Math.max(0, Math.min(1, numericAlpha));
		}
	}
}