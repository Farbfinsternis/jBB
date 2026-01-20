/**
 * Manages gamepad input via the browser's Gamepad API.
 */
export class Joy {
    /** @private */
    #gamepads = {};

    constructor() {
        window.addEventListener("gamepadconnected", (e) => {
            console.log(`jBB Gamepad: Connected at index ${e.gamepad.index}: ${e.gamepad.id}.`);
            this.#gamepads[e.gamepad.index] = e.gamepad;
        });
        window.addEventListener("gamepaddisconnected", (e) => {
            console.log(`jBB Gamepad: Disconnected from index ${e.gamepad.index}: ${e.gamepad.id}.`);
            delete this.#gamepads[e.gamepad.index];
        });
    }

    /**
     * @private
     * Polls for the current state of all connected gamepads.
     * This must be called once per frame.
     */
    update() {
        const pads = navigator.getGamepads();
        for (const pad of pads) {
            if (pad) {
                this.#gamepads[pad.index] = pad;
            }
        }
    }

    /**
     * @private
     * Retrieves a gamepad state object by its index.
     * @param {number} padIndex The index of the gamepad.
     * @returns {Gamepad|undefined}
     */
    #getPad(padIndex) {
        return this.#gamepads[padIndex];
    }

    /**
     * Returns the identifier string for a connected gamepad.
     * @param {number} [padIndex=0] The index of the gamepad.
     * @returns {string} The gamepad's ID string, or "Not connected".
     */
    joyType(padIndex = 0) {
        const pad = this.#getPad(padIndex);
        return pad ? pad.id : "Not connected";
    }

    /**
     * Checks if a specific gamepad button is currently held down.
     * @param {number} button The index of the button to check.
     * @param {number} [padIndex=0] The index of the gamepad.
     * @returns {boolean} True if the button is pressed.
     */
    joyDown(button, padIndex = 0) {
        const pad = this.#getPad(padIndex);
        return pad && pad.buttons[button] && pad.buttons[button].pressed;
    }

    /**
     * Returns the position of the primary horizontal axis (usually the left stick).
     * Includes a deadzone to prevent drift.
     * @param {number} [padIndex=0] The index of the gamepad.
     * @returns {number} A value between -1.0 (left) and 1.0 (right).
     */
    joyX(padIndex = 0) {
        const pad = this.#getPad(padIndex);
        if (!pad || pad.axes.length < 1) return 0.0;
        const val = pad.axes[0];
        return Math.abs(val) > 0.15 ? val : 0.0;
    }

    /**
     * Returns the position of the primary vertical axis (usually the left stick).
     * Includes a deadzone to prevent drift.
     * @param {number} [padIndex=0] The index of the gamepad.
     * @returns {number} A value between -1.0 (up) and 1.0 (down).
     */
    joyY(padIndex = 0) {
        const pad = this.#getPad(padIndex);
        if (!pad || pad.axes.length < 2) return 0.0;
        const val = pad.axes[1];
        return Math.abs(val) > 0.15 ? val : 0.0;
    }
}