/**
 * Manages keyboard input, tracking which keys are down and which were just pressed.
 */
export class Keyboard{
	/** @private @type {Set<number>} Stores key codes of all currently held-down keys. */
	#keysDown = new Set();
	/** @private @type {Set<number>} Stores key codes of keys that were newly pressed in the current frame. */
	#keysHit = new Set();

	constructor(){
		window.addEventListener('keydown', this.#onKeyDown.bind(this));
		window.addEventListener('keyup', this.#onKeyUp.bind(this));
	}

	/**
	 * @private
	 * Handles the keydown event.
	 */
	#onKeyDown(event) {
		if (!this.#keysDown.has(event.keyCode)) {
			this.#keysHit.add(event.keyCode);
		}
		this.#keysDown.add(event.keyCode);
	}

	/**
	 * @private
	 * Handles the keyup event.
	 */
	#onKeyUp(event) {
		this.#keysDown.delete(event.keyCode);
	}

	/**
	 * Checks if a specific key is currently held down.
	 * @param {number} keyCode The key code to check.
	 * @returns {boolean} True if the key is down, false otherwise.
	 */
	keyDown(keyCode) {
		return this.#keysDown.has(keyCode);
	}

	/**
	 * Checks if a specific key was newly pressed in the current frame.
	 * This state is cleared at the end of the frame.
	 * @param {number} keyCode The key code to check.
	 * @returns {boolean} True if the key was just hit, false otherwise.
	 */
	keyHit(keyCode) {
		return this.#keysHit.has(keyCode);
	}

	/**
	 * @private
	 * Clears all "key hit" states. This is called automatically by the engine at the end of each frame.
	 */
	clearHits() {
		this.#keysHit.clear();
	}
}