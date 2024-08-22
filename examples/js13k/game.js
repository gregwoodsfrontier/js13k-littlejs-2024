/*
    LittleJS JS13K Starter Game
    - For size limited projects
    - Includes all core engine features
    - Builds to 7kb zip file
*/

'use strict';

// sound effects
const sound_click = new Sound([1,.5]);

// game variables
let particleEmitter;

const asciiTilemapB = [
    '1               ',
    '111             ',
    '111             ',
    '11              ',
    '1111111111   11111   111111'
]

// webgl can be disabled to save even more space
//glEnable = false;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create tile collision and visible tile layer
    initTileCollision(vec2(32,16));
    // const tileImage = textureInfos[0].image;
    // mainContext.drawImage(tileImage, 0, 0);
    // const imageData = mainContext.getImageData(0,0,tileImage.width,tileImage.height).data;

    const pos = vec2();
    const tileLayer = new TileLayer(pos, tileCollisionSize);
    const tileIndex = 3;

    for(let row = asciiTilemapB.length ; row--;) {
        for(let col = asciiTilemapB[row].length; col--;) {
            if(asciiTilemapB[row][col] === " ") continue
            
            const direction = 0
            const mirror = 0;
            const color = 0;
            const data = new TileLayerData(tileIndex, direction, mirror, undefined);
            
            pos.y = asciiTilemapB.length - row
            pos.x = 6 + col


            tileLayer.setData(pos, data);
            setTileCollisionData(pos, 1);
        }
    }

    // for(pos.x = 1; pos.x < 3; pos.x++) {
    //     const tileIndex = 1;
    //     const direction = randInt(4)
    //     const mirror = randInt(2);
    //     const color = randColor();
    //     const data = new TileLayerData(tileIndex, direction, mirror, color);
    //     tileLayer.setData(pos, data);
    //     setTileCollisionData(pos, 1);
    // }

    // draw tile layer with new data
    tileLayer.redraw();

    // setup camera
    cameraPos = vec2(16,8);

    // enable gravity
    gravity = -.01;

    // create particle emitter
    particleEmitter = new ParticleEmitter(
        vec2(16,9), 0,              // emitPos, emitAngle
        1, 0, 500, PI,              // emitSize, emitTime, emitRate, emiteCone
        tile(2),                // tileIndex, tileSize
        new Color(1,1,1),   new Color(0,0,0),   // colorStartA, colorStartB
        new Color(0,0,0,0), new Color(0,0,0,0), // colorEndA, colorEndB
        2, .2, .2, .1, .05,   // time, sizeStart, sizeEnd, speed, angleSpeed
        .99, 1, 1, PI,        // damping, angleDamping, gravityScale, cone
        .05, .5, 1, 1         // fadeRate, randomness, collide, additive
    );
    particleEmitter.elasticity = .3; // bounce when it collides
    particleEmitter.trailScale = 2;  // stretch in direction of motion
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    if (mouseWasPressed(0))
    {
        // play sound when mouse is pressed
        sound_click.play(mousePos);

        // change particle color and set to fade out
        particleEmitter.colorStartA = new Color;
        particleEmitter.colorStartB = randColor();
        particleEmitter.colorEndA = particleEmitter.colorStartA.scale(1,0);
        particleEmitter.colorEndB = particleEmitter.colorStartB.scale(1,0);
    }

    // move particles to mouse location if on screen
    if (mousePosScreen.x)
        particleEmitter.pos = mousePos;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // draw a grey square in the background without using webgl
    drawRect(vec2(16,8), vec2(20,14), new Color(.6,.6,.6), 0, 0);
    drawRect(vec2(0,0), vec2(1,1), new Color(1, 0, 0), 0, 0 )
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // draw to overlay canvas for hud rendering
    drawTextScreen('LittleJS JS13K Demo', vec2(mainCanvasSize.x/2, 70), 80);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);