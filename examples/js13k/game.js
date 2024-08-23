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

let spriteAtlas

// webgl can be disabled to save even more space
//glEnable = false;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create a table of all sprites
    spriteAtlas =
    {
        // large tiles
        player:  tile(1),
        wall:    tile(3),
        demon:   tile(4),
        blob:    tile(5),
        ladder:  tile(7),
        door:    tile(8),
        key:     tile(11),
        block:   tile(12)
    };

    // enable touch gamepad on touch devices
    touchGamepadEnable = true;
    
    buildLevel()
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
     // setup camera
     cameraPos = vec2(16,8);
    //  cameraScale = 48;
    // if (mouseWasPressed(0))
    // {
    //     // play sound when mouse is pressed
    //     sound_click.play(mousePos);

    //     // change particle color and set to fade out
    //     particleEmitter.colorStartA = new Color;
    //     particleEmitter.colorStartB = randColor();
    //     particleEmitter.colorEndA = particleEmitter.colorStartA.scale(1,0);
    //     particleEmitter.colorEndB = particleEmitter.colorStartB.scale(1,0);
    // }

    // // move particles to mouse location if on screen
    // if (mousePosScreen.x)
    //     particleEmitter.pos = mousePos;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // draw a grey square in the background without using webgl
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