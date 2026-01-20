/**
 * Represents a drawable image, which can be a single static image,
 * an animated spritesheet, or a blank canvas for off-screen rendering.
 */
export class Jmage{
	/** @private */
	#jBBInstance;
	/** @private */
	#el; #ready;
	/** @private */
	#frame; #firstFrame; #frameCount;
	/** @private */
	#scaleFactor;
	/** @private */
	#rotation;
	/** @private */
	#handle; #localMidHandle;
	/** @private */
	#imageData;
	/** @private */
	#imageDataCache = null;
	/** @private */
	#bufferCanvas = null;
	/** @private */
	#bufferContext = null;

	/** @param {object} jbbInstance A reference to the main jBB class instance. */
	constructor(jBBInstance){
		this.#jBBInstance = jBBInstance;
		this.#el = new Image();
		this.#ready = false;

		this.#frame = { width : 0, height : 0 };
		this.#firstFrame = 1;
		this.#frameCount = 1;

		this.#scaleFactor = { x : 1.0, y : 1.0 };
		this.#rotation = 0;

		this.#handle = { x : 0, y : 0 };
		this.#localMidHandle = false;
	}

	/**
	 * @private
	 * Internal callback executed when the underlying image element has finished loading.
	 */
	onImageLoaded(){
		this.#ready = true;
		if(this.#frameCount <= 1){
			this.#frame = { width : this.#el.width, height : this.#el.height };
		}

		// If AutoMidHandle is on globally, or if MidHandle() was called for this specific
		// image before it finished loading, apply the mid handle logic now.
		if (this.#jBBInstance.isAutoMidHandle() || this.#localMidHandle) {
			this.#handle.x = this.#frame.width / 2;
			this.#handle.y = this.#frame.height / 2;
			this.#localMidHandle = true; 
		}
	}

	/**
	 * Loads a static image from a given path.
	 * @param {string} path The URL or path to the image file.
	 * @returns {Promise<Jmage>} A promise that resolves with this Jmage instance when loading is complete.
	 */
	load(path){
		return new Promise((resolve, reject) => {
			this.#el.src = path;
			this.#frameCount = 1;
			this.#el.addEventListener("load", () => {
				this.onImageLoaded();
				resolve(this);
			});
			this.#el.addEventListener("error", (e) => {
				const error = new Error(`jBB Image: Failed to load image at ${path}`);
				console.error(error, e);
				reject(error);
			});
		});
	}

	/**
	 * @private
	 * Creates a blank, drawable image.
	 * @param {number} width The width of the new image.
	 * @param {number} height The height of the new image.
	 */
	createBlank(width, height) {
		this.#frame = { width: width, height: height };
		this.#ready = true; // It's ready for drawing immediately
		this.getBufferContext(); // Ensure the buffer is created
	}

	/**
	 * Loads an image strip for animation.
	 * @param {string} path The URL or path to the spritesheet file.
	 * @param {number} width The width of a single animation frame.
	 * @param {number} height The height of a single animation frame.
	 * @param {number} first The index of the first frame to use in the animation (1-based).
	 * @param {number} count The total number of frames in the animation.
	 * @returns {Promise<Jmage>} A promise that resolves with this Jmage instance when loading is complete.
	 */
	loadAnim(path, width, height, first, count){
		return new Promise((resolve, reject) => {
			this.#el.src = path;
			this.#frame = { width : width, height : height };
			this.#firstFrame = first;
			this.#frameCount = count;
			this.#el.addEventListener("load", () => {
				this.onImageLoaded();
				resolve(this);
			});
			this.#el.addEventListener("error", (e) => {
				const error = new Error(`jBB Image: Failed to load anim image at ${path}`);
				console.error(error, e);
				reject(error);
			});
		});
	}

	/**
	 * Sets the image's drawing handle to its center.
	 * If the image is not yet loaded, this action is deferred until loading is complete.
	 */
	midHandle(){
		this.#localMidHandle = true;

		if (this.#ready) {
			this.#handle.x = this.#frame.width / 2;
			this.#handle.y = this.#frame.height / 2;
		}
	}


	/**
	 * Sets the image's drawing handle to a specific coordinate.
	 * @param {number} x The x-coordinate of the handle.
	 * @param {number} y The y-coordinate of the handle.
	 */
	setHandle(x, y){
		this.#handle.x = x;
		this.#handle.y = y;
		this.#localMidHandle = false;
	}

	/**
	 * Scales the image. A negative value will flip the image on that axis.
	 * @param {number} [x=1.0] The horizontal scale factor.
	 * @param {number} [y=1.0] The vertical scale factor.
	 */
	scale(x = 1.0, y = 1.0){
		this.#scaleFactor = { x : x, y : y };
	}

	/**
	 * Rotates the image by a given number of degrees.
	 * @param {number} value The rotation in degrees (0-360).
	 */
	rotate(value){
		this.#rotation = value;
	}

	/**
	 * @private
	 * Draws the image (or a specific frame of it) to the active drawing context.
	 */
	draw(x, y, frame = 1){
		const sourceElement = this.#bufferCanvas || this.#el;
		
		if(frame < 1) frame = 1;
		if(frame > this.#frameCount) frame = this.#frameCount;

		if(this.#ready == true){
			this.#jBBInstance.canvas.save();

			const frameIndexOnSheet = (this.#firstFrame - 1) + (frame - 1);
			let framePos = this.getFramePos(frameIndexOnSheet);

			this.#jBBInstance.canvas.translate(x, y);
			this.#jBBInstance.canvas.rotate(this.#rotation * Math.PI / 180);
			this.#jBBInstance.canvas.scale(this.#scaleFactor.x, this.#scaleFactor.y);

			let drawX = -this.#handle.x;
			let drawY = -this.#handle.y;

			this.#jBBInstance.canvas.drawImage(sourceElement, framePos.x, framePos.y, this.#frame.width, this.#frame.height, drawX, drawY, this.#frame.width, this.#frame.height);
			
			this.#jBBInstance.canvas.restore();
		}
	}

	/**
	 * @private
	 * Creates a new Jmage instance that is a copy of this one.
	 * @returns {Jmage} A new Jmage instance with the same properties.
	 */
	clone() {
		const newImage = new Jmage(this.#jBBInstance);

		// Copy essential properties. The image element itself is shared, which is typical for BlitzBasic's CopyImage.
		newImage.#el = this.#el;
		newImage.#ready = this.#ready;
		newImage.#frame = { ...this.#frame };
		newImage.#firstFrame = this.#firstFrame;
		newImage.#frameCount = this.#frameCount;
		newImage.#scaleFactor = { ...this.#scaleFactor };
		newImage.#rotation = this.#rotation;
		newImage.#handle = { ...this.#handle };
		newImage.#localMidHandle = this.#localMidHandle;

		// If the source is a created image that has been drawn on, the copy needs
		// its own buffer with the same pixel content.
		if (this.#bufferCanvas) {
			const newBufferCtx = newImage.getBufferContext(); // Creates the canvas for the new image
			if(newBufferCtx) newBufferCtx.drawImage(this.#bufferCanvas, 0, 0);
		}

		// Note: The buffer canvas and image data cache are not copied,
		// they will be generated on demand for the new instance.

		return newImage;
	}

	/**
	 * @private
	 * Calculates how many animation frames fit in a single row of the spritesheet.
	 * @returns {number}
	 */
	framesPerRow(){
		return Math.floor(this.#el.width / this.#frame.width);
	}
	
	/**
	 * @private
	 * Calculates the top-left (x,y) pixel coordinate of a given frame on the spritesheet.
	 * @param {number} frame The 0-based index of the frame.
	 * @returns {{x: number, y: number}}
	 */
	getFramePos(frame){
		return {
			x : (frame % this.framesPerRow() * this.#frame.width),
			y : (Math.floor(frame / this.framesPerRow())) * this.#frame.height
		};
	}

	/**
	 * The width of a single frame of the image.
	 * @returns {number}
	 */
	get width(){
		return this.#frame.width;
	}

	/**
	 * The height of a single frame of the image.
	 * @returns {number}
	 */
	get height(){
		return this.#frame.height;
	}

	/**
	 * The current drawing handle of the image.
	 * @returns {{x: number, y: number}}
	 */
	get handle(){
		return this.#handle;
	}

	/**
	 * The current scale factor of the image.
	 * @returns {{x: number, y: number}}
	 */
	get scaleFactor(){
		return this.#scaleFactor;
	}

	/**
	 * The current rotation of the image in degrees.
	 * @returns {number}
	 */
	get rotation(){
		return this.#rotation;
	}

	/**
	 * The underlying drawable element (either an HTMLImageElement or an off-screen HTMLCanvasElement).
	 * @returns {HTMLImageElement|HTMLCanvasElement}
	 */
	get el(){
		return this.#bufferCanvas || this.#el;
	}

	/**
	 * @private
	 * Returns the raw ImageData object for this image.
	 * The data is cached after the first call for performance.
	 * @returns {ImageData|null}
	 */
	getImageData() {
		if (this.#imageDataCache) {
			return this.#imageDataCache;
		}
		if (!this.#ready) {
			return null;
		}
		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = this.#el.width;
		tempCanvas.height = this.#el.height;
		const tempCtx = tempCanvas.getContext('2d');
		tempCtx.drawImage(this.#el, 0, 0);
		this.#imageDataCache = tempCtx.getImageData(0, 0, this.#el.width, this.#el.height);
		return this.#imageDataCache;
	}

	/**
	 * @private
	 * Creates (if necessary) and returns a 2D context for drawing onto this image.
	 * @returns {CanvasRenderingContext2D|null}
	 */
	getBufferContext() {
		if (!this.#bufferContext) {
			if (!this.#ready) return null; // Can't create buffer for an unloaded image
			this.#bufferCanvas = document.createElement('canvas');
			if (this.#el.width > 0 && this.#el.height > 0) {
				this.#bufferCanvas.width = this.#el.width;
				this.#bufferCanvas.height = this.#el.height;
			} else {
				this.#bufferCanvas.width = this.#frame.width;
				this.#bufferCanvas.height = this.#frame.height;
			}
			this.#bufferContext = this.#bufferCanvas.getContext('2d');
			if (this.#el.width > 0) this.#bufferContext.drawImage(this.#el, 0, 0);
		}
		return this.#bufferContext;
	}
}