// Importieren Sie ALLE Funktionen aus der Bibliothek in den "jbb" Namespace.
import * as jbb from './dist/jbbp.js';

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

jbb.Graphics(SCREEN_WIDTH, SCREEN_HEIGHT, mainLoop);

// 1. Laden Sie das Tileset-Bild.
// HINWEIS: Sie müssen ein Bild 'tileset.png' bereitstellen, das Ihre Kacheln in einem Raster enthält.
let tilesetImage = jbb.LoadImage('tileset.png');

// 2. Erstellen Sie einen "Brush" aus dem Tileset.
let tileBrush = jbb.LoadBrush(tilesetImage, TILE_WIDTH, TILE_HEIGHT);

// 3. Definieren Sie die Kartendaten (2D-Array).
// Jede Zahl entspricht einer Kachel im Tileset (1-basiert). 0 bedeutet leer.
const mapData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 1],
    [1, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function mainLoop() {
    jbb.Cls();

    // 4. Zeichne die Tilemap auf den Bildschirm.
    jbb.TileBlock(tileBrush, mapData, 50, 50);
}
