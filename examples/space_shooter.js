import * as jbb from './dist/jbbp.js';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;
const ENEMY_SPEED = 2;

jbb.Graphics(SCREEN_WIDTH, SCREEN_HEIGHT, mainLoop);

let player = { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT - 50 };
let bullets = [];
let enemies = [];
let score = 0;
let enemySpawnTimer = 0;

const NewBullet = jbb.CreateType({ x: 0, y: 0 });
const NewEnemy = jbb.CreateType({
    squadStartX: 0,
    squadStartY: 0,
    spawnTime: 0,
    baseAngle: 0,
    radius: 80,
    currentAngle: 0,
    x: 0, y: 0
});

console.log("Reihe Assets zum Laden ein...");
const playerImage = jbb.LoadImage('assets/ship.png');
const enemyImage = jbb.LoadImage('assets/ship.png');
const bulletImage = jbb.LoadImage('assets/bullet.png');
const shootSound = jbb.LoadSound('assets/shoot.wav');
const explosionSound = jbb.LoadSound('assets/explosion.wav');
const mainFont = jbb.LoadFont("Teko", "assets/Teko-Regular.ttf");

jbb.SoundVolume(shootSound, 0.5);
jbb.SoundVolume(explosionSound, 0.25);

jbb.MidHandle(playerImage);
jbb.MidHandle(enemyImage);
jbb.MidHandle(bulletImage);
jbb.ScaleImage(enemyImage, 1.0, -1.0);

function mainLoop() {
    jbb.Cls();
    handleInput();
    updatePlayer();
    updateBullets();
    updateEnemies();
    checkCollisions();
    drawGameObjects();
    drawUI();
}

function handleInput() {
    if (jbb.KeyDown(37)) player.x -= PLAYER_SPEED; // Pfeil links
    if (jbb.KeyDown(39)) player.x += PLAYER_SPEED; // Pfeil rechts
    if (jbb.KeyDown(38)) player.y -= PLAYER_SPEED; // Pfeil hoch
    if (jbb.KeyDown(40)) player.y += PLAYER_SPEED; // Pfeil runter

    if (jbb.KeyHit(32)) {
        let bullet = NewBullet();
        bullet.x = player.x;
        bullet.y = player.y - 30; // Kugel startet etwas vor dem Spieler
        bullets.push(bullet);
        jbb.PlaySound(shootSound);
    }
}

function updatePlayer() {
    if (player.x < 25) player.x = 25;
    if (player.x > SCREEN_WIDTH - 25) player.x = SCREEN_WIDTH - 25;
    if (player.y < 25) player.y = 25;
    if (player.y > SCREEN_HEIGHT - 25) player.y = SCREEN_HEIGHT - 25;
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= BULLET_SPEED;
        if (bullets[i].y < -20) {
            bullets.splice(i, 1);
        }
    }
}

function updateEnemies() {
    enemySpawnTimer++;
    if (enemySpawnTimer > 150) { // Alle 2.5 Sekunden eine neue Formation
        const spawnTime = jbb.Millisecs();
        const startX = jbb.Rand(100, SCREEN_WIDTH - 100);
        const startY = -100;

        for (let i = 0; i < 6; i++) {
            let enemy = NewEnemy();
            enemy.spawnTime = spawnTime;
            enemy.squadStartX = startX;
            enemy.squadStartY = startY;
            enemy.baseAngle = i * 60; // 6 Gegner im Kreis (360 / 6 = 60)
            enemies.push(enemy);
        }
        enemySpawnTimer = 0;
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        const timeAlive = jbb.Millisecs() - enemy.spawnTime;

        const squadCurrentY = enemy.squadStartY + (timeAlive / 16.66) * ENEMY_SPEED;
        const squadRotation = (timeAlive / 16.66) * 2; // 2 Grad pro Frame rotieren
        enemy.currentAngle = enemy.baseAngle + squadRotation;

        const angleInRadians = enemy.currentAngle * Math.PI / 180;
        enemy.x = enemy.squadStartX + Math.cos(angleInRadians) * enemy.radius;
        enemy.y = squadCurrentY + Math.sin(angleInRadians) * enemy.radius;

        if (squadCurrentY > SCREEN_HEIGHT + 150) {
            enemies.splice(i, 1);
        }
    }
}

function checkCollisions() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (jbb.ImagesCollide(bulletImage, bullets[i].x, bullets[i].y, 1, enemyImage, enemies[j].x, enemies[j].y, 1)) {
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score += 100;
                jbb.PlaySound(explosionSound);
                break; // Kugel kann nur einen Gegner treffen
            }
        }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        if (jbb.ImagesCollide(playerImage, player.x, player.y, 1, enemyImage, enemies[i].x, enemies[i].y, 1)) {
            enemies.splice(i, 1);
            score = 0; // Bei Treffer Punktzahl zurücksetzen
            jbb.PlaySound(explosionSound);
        }
    }
}

function drawGameObjects() {
    jbb.DrawImage(playerImage, player.x, player.y);
    bullets.forEach(bullet => jbb.DrawImage(bulletImage, bullet.x, bullet.y));
    
    enemies.forEach(enemy => {
        jbb.RotateImage(enemyImage, enemy.currentAngle + 90);
        jbb.DrawImage(enemyImage, enemy.x, enemy.y);
    });
}

function drawUI() {
    jbb.SetFont(mainFont, 32);
    jbb.Color(255, 255, 255);
    jbb.DrawText(10, 10, "Score: " + score);
}

jbb.Start();