import { jBB } from "./jbb.js";

var __jBB = null;

/**
 * Initializes the jBB engine and creates the main graphics canvas.
 * This must be the first jBB command called.
 * @param {*} width canvas width in pixel
 * @param {*} height canvas height in pixel
 * @param {*} mainLoop the main function of your project
 */
export function Graphics(width, height, mainLoop){ __jBB = new jBB(width, height, mainLoop); }
/**
 * This command will tell you the width, in pixels, of the canvas.
 * @returns {number} The canvas width in pixels.
 */
export function GraphicsWidth(){ return __jBB.graphicsWidth(); }
/**
 * This command will tell you the width, in pixels, of the canvas.
 * @returns {number} The canvas height in pixels.
 */
export function GraphicsHeight(){ return __jBB.graphicsHeight(); }
/**
 * This command will enable or disable bi-linear filtering on images
 * @param {*} value false to turn off filtering; true to turn it on  
 */
export function TFormFilter(value = false){ __jBB.tFormFilter(value); }
/**
 * Sets the composition mode for all subsequent drawing operations.
 * @param {string} mode The blend mode to apply (e.g., "add", "multiply", "screen").
 */
export function SetBlendMode(mode) { __jBB.setBlendMode(mode); }
/**
 * This command sets the drawing color (using RGB values) for all subsequent drawing commands (Line, Rect, Text, etc.).
 * 
 * @param {number} red The red component (0-255).
 * @param {number} green The green component (0-255).
 * @param {number} blue The blue component (0-255).
 */
export function Color(red, green, blue){ __jBB.color(red, green, blue); }
/**
 * This changes the color for subsequent CLS calls. Use this command when you need CLS to 'clear' the screen with some other color than black.
 * @param {number} [red=0] The red component (0-255).
 * @param {number} [green=0] The green component (0-255).
 * @param {number} [blue=0] The blue component (0-255).
 */
export function ClsColor(red = 0, green = 0, blue = 0){ __jBB.clsColor(red, green, blue); }
/**
 * This command will wipe the canvas clean of any graphics or text present and reset the canvas back to the color defined in the ClsColor command
 */
export function Cls(){ __jBB.cls(); }

/**
 * Sets the current drawing target to an image buffer or the main screen.
 * @param {object|null} buffer The image created with `CreateImage` to draw on, or the value from `BackBuffer()` to draw to the screen.
 */
export function SetBuffer(buffer) { __jBB.setBuffer(buffer); }
/**
 * Returns a token representing the main screen buffer, for use with `SetBuffer`.
 * @returns {null}
 */
export function BackBuffer() { return __jBB.backBuffer(); }
/**
 * Creates a new, blank, drawable image.
 * @param {number} width The width of the new image.
 * @param {number} height The height of the new image.
 * @returns {object} An image handle.
 */
export function CreateImage(width, height) { return __jBB.createImage(width, height); }
/**
 * Grabs a portion of the current drawing buffer into an existing image.
 * @param {object} targetImage The destination image handle.
 * @param {number} x The top-left x-coordinate of the grab area.
 * @param {number} y The top-left y-coordinate of the grab area.
 */
export function GrabImage(targetImage, x, y) { __jBB.grabImage(targetImage, x, y); }

/**
 * Creates a brush object from a tileset image for use with `TileBlock`.
 * @param {object} tilesetImage The image handle of the tileset.
 * @param {number} tileWidth The width of a single tile.
 * @param {number} tileHeight The height of a single tile.
 * @returns {object|null} A brush object.
 */
export function LoadBrush(tilesetImage, tileWidth, tileHeight) { return __jBB.loadBrush(tilesetImage, tileWidth, tileHeight); }
/**
 * Draws a map of tiles using a specified brush.
 * @param {object} brush The brush object created by `LoadBrush`.
 * @param {Array<Array<number>>} mapData A 2D array of 1-based tile IDs.
 * @param {number} [x=0] The top-left screen X coordinate to start drawing the map.
 * @param {number} [y=0] The top-left screen Y coordinate to start drawing the map.
 */
export function TileBlock(brush, mapData, x = 0, y = 0) { __jBB.tileBlock(brush, mapData, x, y); }
/**
 * Enables or disables automatic centering of the handle for all subsequently loaded images.
 * @param {boolean} [value=false] True to enable auto-mid-handling, false to disable.
	*/
export function AutoMidHandle(value = false){ __jBB.autoMidHandle(value); }
/**
 * This command moves the image's handle to the middle of the image.
 * @param {*} img The image to apply the midhandle to.
 */
export function MidHandle(img){ __jBB.midHandleImage(img); }
/**
 * This command loads an image and assigns it a Jmage object. You will use the 
 * DrawImage command to display the graphic later.
 *
 * @param {string} file The path to the image file.
 * @returns {object} An image handle.
 */
export function LoadImage(file){ return __jBB.loadImage(file); }
/**
 * 
 * @param {*} path 
 * @param {*} cellWidth 
 * @param {*} cellHeight 
 * @param {*} first 
 * @param {*} count 
 * @returns 
 * @param {string} path The path to the spritesheet file.
 * @param {number} cellWidth The width of a single frame.
 * @param {number} cellHeight The height of a single frame.
 * @param {number} first The index of the first frame in the animation sequence (1-based).
 * @param {number} count The total number of frames in the animation sequence.
 * @returns {object} An image handle.
 */
export function LoadAnimImage(path, cellWidth, cellHeight, first, count){ return __jBB.loadAnimImage(path, cellWidth, cellHeight, first, count); }
/**
 * This command draws a previously loaded image. This command draws both single image 
 * graphics (loaded with the LoadImage command) as well as animated images (loaded 
 * with the LoadAnimImage command).
 * You specify where on the screen you wish the image to appear. You can actually 
 * 'draw' off the screen as well by using negative values or positive values that are 
 * not visible 'on the screen'.
 * Finally, if you are using an animated image (loaded with LoadAnimImage), you can 
 * specify which frame of the imagestrip is displayed with the DrawImage command.
 * 
 * @param {object} img The image handle to draw.
 * @param {number} x The x-coordinate to draw the image at (relative to its handle).
 * @param {number} y The y-coordinate to draw the image at (relative to its handle).
 * @param {number} [frame] The animation frame to draw (1-based).
 */
export function DrawImage(img, x, y, frame){ __jBB.drawImage(img, x, y, frame); }
/**
 * rotate an image a specified number of degrees
 * @param {*} img a Jmage object
 * @param {*} value floating number from 0 to 360 degrees
 */
export function RotateImage(img, value){ img.rotate(value); }
/**
 * Use this command and ImageHeight to return the size of the given image in pixels.
 * 
 * @param {object} img The image handle.
 * @returns {number} The width in pixels.
 */
export function ImageWidth(img){ return __jBB.imageWidth(img); }
/**
 * Use this command and ImageWidth to return the size of the given image in pixels.
 * 
 * @param {object} img The image handle.
 * @returns {number} The height in pixels.
 */
export function ImageHeight(img){ return __jBB.imageHeight(img); }
/**
 * It is occasionally useful to determine the location of an image's image handle. This command
 * returns the X and Y coordinate.
 * @param {object} img The image handle.
 * @returns {{x: number, y: number}} An object containing the x and y coordinates of the handle.
 */
export function ImageHandle(img){ return __jBB.imageHandle(img); }
/**
 * It is occasionally useful to determine the location of an image's image handle. This command
 * returns the X coordinate. Use ImageYHandle to get the Y coordinate. Please see MidHandle for 
 * more information on the image's image handle. 
 * 
 * @param {object} img The image handle.
 * @returns {number} The x-coordinate of the handle.
 */
export function ImageXHandle(img){ return __jBB.imageXHandle(img); }
/**
 * It is occasionally useful to determine the location of an image's image handle. This command
 * returns the Y coordinate. Use ImageXHandle to get the X coordinate. Please see ;idHandle for 
 * more information on the image's image handle.
 * 
 * @param {object} img The image handle.
 * @returns {number} The y-coordinate of the handle.
 */
export function ImageYHandle(img){ return __jBB.imageYHandle(img); }
/**
 * Use this command to rescale an image to a new size using a floating point percentage 
 * (1.0 = 100%, 2.0 = 200%, etc). Using a negative value perform image flipping. You must've 
 * previously loaded the image with LoadImage or LoadAnimImage.
 * 
 * @param {object} img The image handle to scale.
 * @param {number} x The horizontal scale factor (e.g., 1.0 for 100%).
 * @param {number} y The vertical scale factor.
 */
export function ScaleImage(img, x, y){ __jBB.scaleImage(img, x, y); }

/**
 * Creates a copy of an image.
 * @param {object} img The image handle to copy.
 * @returns {object} A new image handle.
 */
export function CopyImage(img){ return __jBB.copyImage(img); }

/**
 * This command will draw a rectangle in the current drawing Color starting at the location specified. 
 * The last parameter determines if the rectangle is filled or just a 'box'.
 * 
 * @param {number} x The top-left x-coordinate.
 * @param {number} y The top-left y-coordinate.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @param {boolean} [filled=true] True to draw a filled rectangle, false for an outline.
 */
export function Rect(x, y, width, height, filled = true){ __jBB.rect(x, y, width, height, filled); }
/**
 * This command draws a line, in the current drawing color, from one point on the 
 * screen to another (from the x,y to x1,y1 location).
 * 
 * @param {number} x1 The starting x-coordinate.
 * @param {number} y1 The starting y-coordinate.
 * @param {number} x2 The ending x-coordinate.
 * @param {number} y2 The ending y-coordinate.
 */
export function Line(x1, y1, x2, y2){ __jBB.line(x1, y1, x2, y2); }
/**
 * Used to put a pixel on the screen defined by its x, y location in the current 
 * drawing color defined by the Color command 
 * @param {number} x The x-coordinate of the pixel.
 * @param {number} y The y-coordinate of the pixel.
 */
export function Plot(x, y){ __jBB.plot(x, y); }
/**
 * Reads the color data of a single pixel from the main canvas.
 * @param {number} x The x-coordinate of the pixel.
 * @param {number} y The y-coordinate of the pixel.
 * @returns {{r: number, g: number, b: number, a: number}} An object with the RGBA color components.
 */
export function ReadPixel(x, y) { return __jBB.readPixel(x, y); }
/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 * @param {*} filled 
 * @param {number} x The x-coordinate of the oval's center.
 * @param {number} y The y-coordinate of the oval's center.
 * @param {number} width The horizontal radius of the oval.
 * @param {number} height The vertical radius of the oval.
 * @param {boolean} [filled=true] True to draw a filled oval, false for an outline.
 */
export function Oval(x, y, width, height, filled = true){ __jBB.oval(x, y, width, height, filled); }
/**
 * 
 * @param {*} name 
 * @param {*} path 
 * @returns 
 * @param {string} name The name to assign to the font-family for CSS.
 * @param {string} path The path to the font file (e.g., .ttf, .woff).
 * @returns {object} A font handle.
 */
export function LoadFont(name, path){ return __jBB.loadFont(path, name); }
/**
 * Sets the active font for subsequent text drawing operations.
 * @param {object} fnt The font handle.
 * @param {number} size The font size in pixels.
 * @param {boolean} [bold=false] True to make the font bold.
 * @param {boolean} [italic=false] True to make the font italic.
 */
export function SetFont(fnt, size, bold = false, italic = false){ __jBB.setFont(fnt, size, bold, italic) }
/**
 * Draws text to the screen using the currently active font.
 * @param {number} x The x-coordinate to draw the text at.
 * @param {number} y The y-coordinate to draw the text at.
 * @param {string} value The text to draw.
 */
export function DrawText(x, y, value){ __jBB.text(x, y, value); }
/**
 * Returns the width of a capital 'W' character in the current font.
 * @returns {number} The width in pixels.
 */
export function FontWidth(){ return __jBB.fontWidth(); }
/**
 * Returns the height of the current font.
 * @returns {number} The height in pixels.
 */
export function FontHeight(){ return __jBB.fontHeight(); }
/**
 * Measures the width of a string using the currently active font.
 * @param {string} value The string to measure.
 * @returns {number} The width in pixels.
 */
export function StringWidth(value){ return __jBB.stringWidth(value); }
/**
 * Measures the height of a string using the currently active font.
 * @param {string} value The string to measure.
 * @returns {number} The height in pixels.
 */
export function StringHeight(value){ return __jBB.stringHeight(value); }

/**
 * Returns the x-coordinate of the mouse relative to the canvas.
 * @returns {number}
 */
export function MouseX(){ return __jBB.mouseX(); }
/**
 * Returns the y-coordinate of the mouse relative to the canvas.
 * @returns {number}
 */
export function MouseY(){ return __jBB.mouseY(); }

/**
 * Checks if a specific mouse button is currently held down.
 * @param {number} button The button to check (1=left, 2=right, 3=middle).
 * @returns {boolean}
 */
export function MouseDown(button) { return __jBB.mouseDown(button); }

/**
 * Checks if a specific mouse button was just pressed in the current frame.
 * @param {number} button The button to check (1=left, 2=right, 3=middle).
 * @returns {boolean}
 */
export function MouseHit(button) { return __jBB.mouseHit(button); }

/**
 * Checks if a specific key is currently being held down.
 * @param {number} keyCode The key code to check.
 * @returns {boolean} True if the key is down, false otherwise.
 */
export function KeyDown(keyCode) { return __jBB.keyDown(keyCode); }

/**
 * Checks if a specific key was pressed once. This is true for only one frame.
 * @param {number} keyCode The key code to check.
 * @returns {boolean} True if the key was just hit, false otherwise.
 */
export function KeyHit(keyCode) { return __jBB.keyHit(keyCode); }

/**
 * Returns the identifier string for a connected gamepad.
 * @param {number} [padIndex=0] The index of the gamepad.
 * @returns {string}
 */
export function JoyType(padIndex = 0) { return __jBB.joyType(padIndex); }
/**
 * Checks if a specific gamepad button is currently held down.
 * @param {number} button The index of the button to check.
 * @param {number} [padIndex=0] The index of the gamepad.
 * @returns {boolean}
 */
export function JoyDown(button, padIndex = 0) { return __jBB.joyDown(button, padIndex); }
/**
 * Returns the position of the primary horizontal axis of a gamepad.
 * @param {number} [padIndex=0] The index of the gamepad.
 * @returns {number} A value between -1.0 and 1.0.
 */
export function JoyX(padIndex = 0) { return __jBB.joyX(padIndex); }
/**
 * Returns the position of the primary vertical axis of a gamepad.
 * @param {number} [padIndex=0] The index of the gamepad.
 * @returns {number} A value between -1.0 and 1.0.
 */
export function JoyY(padIndex = 0) { return __jBB.joyY(padIndex); }

/**
 * Opens a file for reading/writing. Creates the file if it doesn't exist.
 * @param {string} path The path to the file in the virtual file system.
 * @returns {number} A file handle, or 0 on failure.
 */
export function OpenFile(path) { return __jBB.openFile(path); }
/**
 * Reads the next line from an open file.
 * @param {number} handle The file handle.
 * @returns {string} The content of the line.
 */
export function ReadFile(handle) { return __jBB.readFile(handle); }
/**
 * Appends a line of text to an open file.
 * @param {number} handle The file handle.
 * @param {string} text The text to write.
 */
export function WriteFile(handle, text) { return __jBB.writeFile(handle, text); }
/**
 * Closes an open file handle.
 * @param {number} handle The file handle to close.
 */
export function CloseFile(handle) { return __jBB.closeFile(handle); }
/**
 * Gets the current read/write position in an open file.
 * @param {number} handle The file handle.
 * @returns {number} The current position in the file.
 */
export function FilePos(handle) { return __jBB.filePos(handle); }
/**
 * Sets the read/write position for an open file.
 * @param {number} handle The file handle.
 * @param {number} pos The new position to seek to.
 */
export function SeekFile(handle, pos) { return __jBB.seekFile(handle, pos); }
/**
 * Checks if the end of an open file has been reached.
 * @param {number} handle The file handle.
 * @returns {boolean}
 */
export function Eof(handle) { return __jBB.eof(handle); }

/**
 * Opens a directory for reading its contents.
 * @param {string} path The path to the directory.
 * @returns {number} A directory handle, or 0 on failure.
 */
export function ReadDir(path) { return __jBB.readDir(path); }
/**
 * Reads the next entry from an open directory handle.
 * @param {number} handle The directory handle.
 * @returns {string} The name of the next file or directory.
 */
export function NextFile(handle) { return __jBB.nextFile(handle); }
/**
 * Closes an open directory handle.
 * @param {number} handle The directory handle to close.
 */
export function CloseDir(handle) { return __jBB.closeDir(handle); }

/**
 * Returns the current working directory path.
 * @returns {string}
 */
export function CurrentDir() { return __jBB.currentDir(); }
/**
 * Changes the current working directory.
 * @param {string} path The path to the new directory.
 * @returns {boolean} True on success.
 */
export function ChangeDir(path) { return __jBB.changeDir(path); }
/**
 * Creates a new directory.
 * @param {string} path The path of the directory to create.
 * @returns {boolean} True on success.
 */
export function CreateDir(path) { return __jBB.createDir(path); }
/**
 * Deletes an empty directory.
 * @param {string} path The path of the directory to delete.
 * @returns {boolean} True on success.
 */
export function DeleteDir(path) { return __jBB.deleteDir(path); }

/**
 * Determines the type of a path.
 * @param {string} path The path to check.
 * @returns {number} 0 for not found, 1 for a file, 2 for a directory.
 */
export function FileType(path) { return __jBB.fileType(path); }
/**
 * Gets the size of a file in bytes.
 * @param {string} path The path to the file.
 * @returns {number} The size of the file.
 */
export function FileSize(path) { return __jBB.fileSize(path); }
/**
 * Copies a file from a source path to a destination path.
 * @param {string} sourcePath The path of the file to copy.
 * @param {string} destPath The destination path for the new file.
 * @returns {boolean} True on success.
 */
export function CopyFile(sourcePath, destPath) { return __jBB.copyFile(sourcePath, destPath); }
/**
 * Deletes a file.
 * @param {string} path The path of the file to delete.
 * @returns {boolean} True on success.
 */
export function DeleteFile(path){ return __jBB.deleteFile(path); }
/**
 * Checks if a file exists at the given path.
 * @param {string} path The path to check.
 * @returns {boolean}
 */
export function FileExists(path) { return __jBB.fileExists(path); }

/**
 * Triggers a browser download for a file stored in the virtual file system.
 * @param {string} path The path of the file to download.
 * @param {string} [downloadName] Optional. The name for the downloaded file.
 * @returns {boolean} True if the download was initiated.
 */
export function DownloadFile(path, downloadName) { return __jBB.downloadFile(path, downloadName); }

/**
 * Asynchronously loads a text file, using a read-through cache.
 * It first checks the virtual file system. If not found or stale, it fetches it from the server.
 * @param {string} path The path to the text file.
 * @returns {Promise<string|null>} A promise that resolves with the file content or null.
 */
export async function LoadTextFile(path) { return __jBB.loadTextFile(path); }

/**
 * Starts the game engine after all assets have been queued for loading.
 * This function must be called at the end of your main script.
 */
export function Start() { __jBB.start(); }
/**
 * Returns the number of milliseconds that have elapsed since the Unix epoch.
 * @returns {number}
 */
export function Millisecs(){ return __jBB.millisecs(); }

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number}
 */
export function Rand(min, max){ return __jBB.rand(min, max); }
/**
 * Returns the value of PI.
 * @returns {number}
 */
export function Pi(){ return __jBB.pi(); }
/**
 * Converts a value to a floating-point number.
 * @param {*} value The value to convert.
 * @returns {number}
 */
export function Float(value){ return __jBB.float(value); }
/**
 * Converts a value to an integer.
 * @param {*} value The value to convert.
 * @returns {number}
 */
export function Int(value){ return __jBB.int(value); }

/**
 * Checks if two axis-aligned rectangles overlap.
 * @param {number} x1 X-coordinate of the first rectangle.
 * @param {number} y1 Y-coordinate of the first rectangle.
 * @param {number} w1 Width of the first rectangle.
 * @param {number} h1 Height of the first rectangle.
 * @param {number} x2 X-coordinate of the second rectangle.
 * @param {number} y2 Y-coordinate of the second rectangle.
 * @param {number} w2 Width of the second rectangle.
 * @param {number} h2 Height of the second rectangle.
 * @returns {boolean} True if the rectangles overlap, false otherwise.
 */
export function RectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) { return __jBB.rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2); }
/**
 * Checks if the bounding boxes of two (potentially transformed) images overlap.
 * @param {object} img1 The first image handle.
 * @param {number} x1 The x-coordinate of the first image.
 * @param {number} y1 The y-coordinate of the first image.
 * @param {object} img2 The second image handle.
 * @param {number} x2 The x-coordinate of the second image.
 * @param {number} y2 The y-coordinate of the second image.
 * @returns {boolean} True if the images' bounding boxes overlap, false otherwise.
 */
export function ImagesOverlap(img1, x1, y1, img2, x2, y2) { return __jBB.imagesOverlap(img1, x1, y1, img2, x2, y2); }

/**
 * Checks for pixel-perfect collision between two images, correctly handling transformations.
 * @param {object} img1 The first image handle.
 * @param {number} x1 The x-coordinate of the first image.
 * @param {number} y1 The y-coordinate of the first image.
 * @param {number} frame1 The animation frame of the first image.
 * @param {object} img2 The second image handle.
 * @param {number} x2 The x-coordinate of the second image.
 * @param {number} y2 The y-coordinate of the second image.
 * @param {number} frame2 The animation frame of the second image.
 * @returns {boolean} True if any solid pixels overlap, false otherwise.
 */
export function ImagesCollide(img1, x1, y1, frame1, img2, x2, y2, frame2) { return __jBB.imagesCollide(img1, x1, y1, frame1, img2, x2, y2, frame2); }

/**
 * Loads a sound effect into memory.
 * @param {string} path The path to the sound file (e.g., .mp3, .wav).
 * @returns {number} A sound handle.
 */
export function LoadSound(path) { return __jBB.loadSound(path); }
/**
 * Releases a sound from memory.
 * @param {number} handle The sound handle to free.
 */
export function FreeSound(handle) { return __jBB.freeSound(handle); }
/**
 * Sets a sound to loop.
 * @param {number} handle The sound handle.
 * @param {boolean} loop True to enable looping.
 */
export function LoopSound(handle, loop) { return __jBB.loopSound(handle, loop); }
/**
 * Sets the default volume for a sound.
 * @param {number} handle The sound handle.
 * @param {number} volume The volume (0.0 to 1.0).
 */
export function SoundVolume(handle, volume) { return __jBB.soundVolume(handle, volume); }
/**
 * Sets the default pitch for a sound.
 * @param {number} handle The sound handle.
 * @param {number} pitch The pitch multiplier (1.0 is normal).
 */
export function SoundPitch(handle, pitch) { return __jBB.soundPitch(handle, pitch); }
/**
 * Sets the default stereo panning for a sound.
 * @param {number} handle The sound handle.
 * @param {number} pan The pan value (-1.0 is left, 0.0 is center, 1.0 is right).
 */
export function SoundPan(handle, pan) { return __jBB.soundPan(handle, pan); }
/**
 * Plays a sound.
 * @param {number} soundHandle The sound handle to play.
 * @returns {number} A channel handle for the playing instance of the sound.
 */
export function PlaySound(soundHandle) { return __jBB.playSound(soundHandle); }
/**
 * Stops a playing sound on a specific channel.
 * @param {number} channelHandle The channel handle returned by `PlaySound`.
 */
export function StopChannel(channelHandle) { return __jBB.stopChannel(channelHandle); }
/**
 * Changes the volume of a currently playing sound on a specific channel.
 * @param {number} channelHandle The channel handle.
 * @param {number} volume The new volume (0.0 to 1.0).
 */
export function ChannelVolume(channelHandle, volume) { return __jBB.channelVolume(channelHandle, volume); }
/**
 * Checks if a sound is still playing on a specific channel.
 * @param {number} channelHandle The channel handle.
 * @returns {boolean}
 */
export function ChannelPlaying(channelHandle) { return __jBB.channelPlaying(channelHandle); }

/**
 * Streams and plays a music file.
 * @param {string} path The path to the music file.
 * @param {boolean} [loop=true] True to loop the music.
 */
export function PlayMusic(path, loop) { return __jBB.playMusic(path, loop); }
/**
 * Stops the currently playing music and rewinds it to the beginning.
 */
export function StopMusic() { return __jBB.stopMusic(); }
/**
 * Pauses the currently playing music.
 */
export function PauseMusic() { return __jBB.pauseMusic(); }
/**
 * Resumes paused music.
 */
export function ResumeMusic() { return __jBB.resumeMusic(); }
/**
 * Sets the volume for the music stream.
 * @param {number} volume The volume (0.0 to 1.0).
 */
export function MusicVolume(volume) { return __jBB.musicVolume(volume); }

/**
 * Emulates BlitzBasic's Type/New functionality by creating a factory function for a specific object structure.
 * @param {object} templateObject An object defining the fields and default values for the new type.
 * @returns {function} A function that, when called, returns a new object based on the template.
 * @example
 * const NewBullet = jbb.CreateType({ x: 0, y: 0, speed: 8, active: true });
 * let myBullet = NewBullet(); // myBullet is now { x: 0, y: 0, speed: 8, active: true }
 */
export function CreateType(templateObject) {
    return function() {
        // Use structuredClone for a deep copy to prevent objects/arrays from being shared across instances.
        return structuredClone(templateObject);
    };
}

// --- Stub Functions (Not Implemented in Browser) ---
export function Execute(command) { return __jBB.execute(command); }
export function GetEnv(variable) { return __jBB.getEnv(variable); }
export function SetEnv(variable, value) { return __jBB.setEnv(variable, value); }
export function PlayCDTrack(track, mode) { return __jBB.playCDTrack(track, mode); }
export function StopCD() { return __jBB.stopCD(); }
export function CallDLL(dllFile, functionName, ...args) { return __jBB.callDLL(dllFile, functionName, ...args); }
