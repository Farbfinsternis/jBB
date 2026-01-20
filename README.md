# JBB - A simple JavaScript library for 2D tile-based games

JBB is a minimalist JavaScript library designed for the quick and easy creation of 2D games and applications based on tile graphics. It is ideal for prototyping, game jams, or learning projects.

The API is intentionally kept simple and is inspired by classic game development libraries to allow for a quick start.

## ✨ Features

*   Easy initialization of a graphics canvas.
*   Loading of images and tilesets.
*   Creation of "brushes" from tilesets for easy use.
*   Efficient rendering of entire tilemaps.
*   A straightforward main loop (game loop) for logic and rendering.

## 🚀 Getting Started

To get started with JBB, you only need an HTML file that loads your JavaScript file as a module, the `jbbp.js` library, and a tileset image.

### Prerequisites

1.  A modern web browser.
2.  A local web server (e.g., XAMPP, `live-server` for VS Code, or `python -m http.server`).
3.  A tileset image (e.g., `tileset.png`) in the same directory as your script.

### Usage

Here is a simple example that shows how to draw a map on the screen. This example is based on the `examples/test.js` file.

1.  **HTML Structure (`index.html`)**

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JBB Example</title>
        <style>
            body { margin: 0; overflow: hidden; }
        </style>
    </head>
    <body>
        <script src="examples/test.js" type="module"></script>
    </body>
    </html>
    ```

2.  **JavaScript Code (`examples/test.js`)**

    ```javascript
    // Import ALL functions from the library into the "jbb" namespace.
    import * as jbb from '../dist/jbbp.js';
    
    const TILE_WIDTH = 32;
    const TILE_HEIGHT = 32;
    const SCREEN_WIDTH = 800;
    const SCREEN_HEIGHT = 600;
    
    // Initializes the graphics and starts the main loop
    jbb.Graphics(SCREEN_WIDTH, SCREEN_HEIGHT, mainLoop);
    
    // 1. Load the tileset image.
    let tilesetImage = jbb.LoadImage('tileset.png');
    
    // 2. Create a "brush" from the tileset.
    let tileBrush = jbb.LoadBrush(tilesetImage, TILE_WIDTH, TILE_HEIGHT);
    
    // 3. Define the map data (2D array).
    // Each number corresponds to a tile in the tileset (1-based). 0 means empty.
    const mapData = [
       ,
       ,
       ,
       ,
       
    ];
    
    // The main loop, which is called continuously
    function mainLoop() {
        // Clear the screen
        jbb.Cls();
    
        // 4. Draw the tilemap to the screen at coordinates (50, 50).
        jbb.TileBlock(tileBrush, mapData, 50, 50);
    }
    ```

## 📚 API Reference (Basics)

*   `jbb.Graphics(width, height, loopFunction)`: Creates a canvas element and starts the main loop.
*   `jbb.LoadImage(path)`: Loads an image file and returns an image object.
*   `jbb.LoadBrush(image, tileWidth, tileHeight)`: Creates a tile brush from an image.
*   `jbb.Cls()`: Clears the entire screen (usually at the beginning of each frame).
*   `jbb.TileBlock(brush, mapArray, x, y)`: Draws an entire map based on a 2D array.
