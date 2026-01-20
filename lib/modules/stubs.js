/**
 * Provides stub functions for BlitzBasic commands that cannot be implemented in a browser environment.
 * Each function issues a console warning to inform the developer that the command has no effect.
 */
export class Stubs {
    /** @private */
    #warnedFunctions;

    /** @private */
    #warn(functionName) {
        if (!this.#warnedFunctions) {
            this.#warnedFunctions = new Set();
        }
        if (!this.#warnedFunctions.has(functionName)) {
            console.warn(`jBB Stub: The function "${functionName}" is not implemented in the browser environment and has no effect.`);
            this.#warnedFunctions.add(functionName);
        }
    }

    // --- System Commands ---
    execute(command) { this.#warn('Execute'); }
    getEnv(variable) { this.#warn('GetEnv'); return ""; }
    setEnv(variable, value) { this.#warn('SetEnv'); }

    // --- Obsolete Media Commands ---
    playCDTrack(track, mode) { this.#warn('PlayCDTrack'); }
    stopCD() { this.#warn('StopCD'); }
    resumeCD() { this.#warn('ResumeCD'); }

    // --- Direct Hardware/OS Access ---
    callDLL(dllFile, functionName, ...args) { this.#warn('CallDLL'); return 0; }
    readPort(port) { this.#warn('ReadPort'); return 0; }
    writePort(port, value) { this.#warn('WritePort'); }
    inp(port) { this.#warn('Inp'); return 0; }
    outp(port, value) { this.#warn('Outp'); }
}

