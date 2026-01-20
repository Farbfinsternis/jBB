/**
 * Manages mouse input, tracking position, which buttons are down, and which were just pressed.
 */
export class Mouse{
	/** @type {number} The last known client x-coordinate of the mouse. */
	x = 0;
	/** @type {number} The last known client y-coordinate of the mouse. */
	y = 0;
	/** @private @type {Set<number>} Tracks which buttons are currently held down. */
	#buttonsDown = new Set();
	/** @private @type {Set<number>} Tracks which buttons were just pressed this frame. */
	#buttonsHit = new Set();

	constructor(){
		document.addEventListener('mousemove', this.update.bind(this));
		document.addEventListener('mousedown', this.#onMouseDown.bind(this));
		document.addEventListener('mouseup', this.#onMouseUp.bind(this));
	}

	/**
	 * @private
	 * Updates the mouse coordinates based on the mousemove event.
	 * @param {MouseEvent} event The mouse move event object.
	 */
	update(event) {
		this.x = event.clientX;
		this.y = event.clientY;
	}

	/**
	 * @private
	 * Handles the mousedown event.
	 */
	#onMouseDown(event) {
		const button = (event.button === 1) ? 3 : event.button + 1;
		if (!this.#buttonsDown.has(button)) {
			this.#buttonsHit.add(button);
		}
		this.#buttonsDown.add(button);
	}

	/**
	 * @private
	 * Handles the mouseup event.
	 */
	#onMouseUp(event) {
		const button = (event.button === 1) ? 3 : event.button + 1;
		this.#buttonsDown.delete(button);
	}

	/**
	 * Checks if a specific mouse button is currently held down.
	 * @param {number} button The button to check (1=left, 2=right, 3=middle).
	 * @returns {boolean}
	 */
	mouseDown(button) {
		return this.#buttonsDown.has(button);
	}

	/**
	 * Checks if a specific mouse button was just pressed in the current frame.
	 * This state is cleared at the end of the frame.
	 * @param {number} button The button to check (1=left, 2=right, 3=middle).
	 * @returns {boolean}
	 */
	mouseHit(button) {
		return this.#buttonsHit.has(button);
	}

	/**
	 * @private
	 * Clears all "mouse hit" states. This is called automatically by the engine at the end of each frame.
	 */
	clearHits() {
		this.#buttonsHit.clear();
	}
}