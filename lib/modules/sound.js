/**
 * @private
 * A wrapper for a loaded sound sample, holding its buffer and default properties.
 */
class SoundSample {
    /** @type {AudioBuffer|null} */
    buffer = null;
    /** @type {boolean} */
    loaded = false;
    /** @type {boolean} */
    loop = false;
    /** @type {number} */
    volume = 1.0;
    /** @type {number} */
    pitch = 1.0;
    /** @type {number} */
    pan = 0.0;
    /** @private */
    #audioContext;

    constructor(audioContext) {
        this.#audioContext = audioContext;
    }

    /** @returns {Promise<SoundSample>} */
    load(path) {
        return fetch(path) // Return the whole chain
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.arrayBuffer();
            })
            .then(arrayBuffer => this.#audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.buffer = audioBuffer;
                this.loaded = true;
                return this; // Resolve with the SoundSample instance
            })
            .catch(e => {
                const error = new Error(`jBB Sound: Failed to load sound at ${path}`);
                console.error(error, e);
                throw error; // Re-throw to make Promise.all fail
            });
    }
}

/**
 * Manages all audio operations, emulating the BlitzBasic sound system.
 */
export class Sound{
	/** @private */
	#audioContext;
    /** @private @type {Array<SoundSample|null>} */
    #sounds = [null];
    /** @private @type {Array<object|null>} */
    #channels = [null];
    /** @private @type {HTMLAudioElement} */
    #musicElement;

    constructor() {
        this.#musicElement = new Audio();
    }

    /**
	 * @private
     * Initializes the AudioContext. Must be called after a user interaction.
     */
    #initContext() {
        if (!this.#audioContext && (window.AudioContext || window.webkitAudioContext)) {
            this.#audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    /**
	 * @private
     * Finds a free slot in a handle array.
     * @param {Array} handleArray The array to search.
     */
    #getFreeHandle(handleArray) {
        for (let i = 1; i < handleArray.length; i++) {
            if (handleArray[i] === null) return i;
        }
        return handleArray.push(null) - 1;
    }

    /**
     * Loads a sound effect into memory.
     * @param {string} path The path to the sound file.
     * @returns {{handle: number, promise: Promise}} An object containing the sound handle and the loading promise.
     */
    loadSound(path) {
        this.#initContext();
        if (!this.#audioContext) {
            console.warn("jBB Sound: AudioContext not supported. Sound functions will be disabled.");
            return { handle: 0, promise: Promise.resolve() };
        }
        const handle = this.#getFreeHandle(this.#sounds);
        const soundSample = new SoundSample(this.#audioContext);
        const promise = soundSample.load(path);
        this.#sounds[handle] = soundSample;
        return { handle, promise };
    }

    /**
     * Releases a sound from memory.
     * @param {number} handle The sound handle to free.
     */
    freeSound(handle) {
        if (this.#sounds[handle]) {
            this.#sounds[handle] = null;
        }
    }

    /**
     * Sets a sound to loop by default.
     * @param {number} handle The sound handle.
     * @param {boolean} [loop=true] True to enable looping.
     */
    loopSound(handle, loop = true) {
        const sound = this.#sounds[handle];
        if (sound) sound.loop = loop;
    }

    /**
     * Sets the default volume for a sound.
     * @param {number} handle The sound handle.
     * @param {number} volume The volume (0.0 to 1.0).
     */
    soundVolume(handle, volume) {
        const sound = this.#sounds[handle];
        if (sound) sound.volume = volume;
    }

    /**
     * Sets the default pitch for a sound.
     * @param {number} handle The sound handle.
     * @param {number} pitch The pitch multiplier (1.0 is normal).
     */
    soundPitch(handle, pitch) {
        const sound = this.#sounds[handle];
        if (sound) sound.pitch = pitch;
    }

    /**
     * Sets the default stereo panning for a sound.
     * @param {number} handle The sound handle.
     * @param {number} pan The pan value (-1.0 is left, 0.0 is center, 1.0 is right).
     */
    soundPan(handle, pan) {
        const sound = this.#sounds[handle];
        if (sound) sound.pan = Math.max(-1, Math.min(1, pan)); // Clamp to -1 to 1 range
    }

    /**
     * Plays a loaded sound.
     * @param {number} soundHandle The sound handle to play.
     * @returns {number} A channel handle for this playing instance of the sound, or 0 on failure.
     */
    playSound(soundHandle) {
        if (!this.#audioContext) return 0;

        // Attempt to resume context if it was suspended by browser policy.
        if (this.#audioContext.state === 'suspended') {
            this.#audioContext.resume();
        }

        const sound = this.#sounds[soundHandle];
        if (!sound || !sound.loaded) return 0; // Don't play if not loaded yet.

        const source = this.#audioContext.createBufferSource();
        source.buffer = sound.buffer;
        source.loop = sound.loop;
        source.playbackRate.value = sound.pitch;

        const gainNode = this.#audioContext.createGain();
        gainNode.gain.value = sound.volume;

        const panNode = this.#audioContext.createStereoPanner();
        panNode.pan.value = sound.pan;

        source.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(this.#audioContext.destination);
        source.start(0);

        const channelHandle = this.#getFreeHandle(this.#channels);
        const channel = {
            source: source,
            gainNode: gainNode,
            panNode: panNode,
            isPlaying: true
        };
        this.#channels[channelHandle] = channel;

        source.onended = () => {
            channel.isPlaying = false;
            this.#channels[channelHandle] = null; // Free up the channel handle.
        };

        return channelHandle;
    }

    /**
     * Stops a playing sound on a specific channel.
     * @param {number} channelHandle The channel handle returned by `playSound`.
     */
    stopChannel(channelHandle) {
        const channel = this.#channels[channelHandle];
        if (channel && channel.isPlaying) {
            channel.source.stop(0);
        }
    }

    /**
     * Changes the volume of a currently playing sound on a specific channel.
     * @param {number} channelHandle The channel handle.
     * @param {number} volume The new volume (0.0 to 1.0).
     */
    channelVolume(channelHandle, volume) {
        const channel = this.#channels[channelHandle];
        if (channel) {
            channel.gainNode.gain.setTargetAtTime(volume, this.#audioContext.currentTime, 0.01);
        }
    }

    /**
     * Checks if a sound is still playing on a specific channel.
     * @param {number} channelHandle The channel handle.
     * @returns {boolean}
     */
    channelPlaying(channelHandle) {
        const channel = this.#channels[channelHandle];
        return !!(channel && channel.isPlaying);
    }

    /**
     * Streams and plays a music file.
     * @param {string} path The path to the music file.
     * @param {boolean} [loop=true] True to loop the music.
     */
    playMusic(path, loop = true) {
        this.#musicElement.src = path;
        this.#musicElement.loop = loop;
        this.#musicElement.play().catch(e => console.error("jBB Music: Playback failed. User interaction might be required.", e));
    }

    /**
     * Stops the currently playing music and rewinds it to the beginning.
     */
    stopMusic() {
        this.#musicElement.pause();
        this.#musicElement.currentTime = 0;
    }

    /**
     * Pauses the currently playing music.
     */
    pauseMusic() {
        this.#musicElement.pause();
    }

    /**
     * Resumes paused music.
     */
    resumeMusic() {
        if (this.#musicElement.src && this.#musicElement.paused) {
            this.#musicElement.play().catch(e => console.error("jBB Music: Resume failed.", e));
        }
    }

    /**
     * Sets the volume for the music stream.
     * @param {number} volume The volume (0.0 to 1.0).
     */
    musicVolume(volume) { // Volume from 0.0 to 1.0
        this.#musicElement.volume = Math.max(0, Math.min(1, volume));
    }
}