/*
    Little JS Platforming Game
    - A basic platforming starter project
    - Platforming phyics and controls
    - Includes destructibe terrain
    - Control with keyboard, mouse, touch, or gamepad
*/

'use strict';

// show the LittleJS splash screen
// setShowSplashScreen(true);

let spriteAtlas, score, deaths;

const TILE_SIZE = 16
let walkTiles = {}
let uniqueCount = 0
let lastTileX, lastTileY

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create a table of all sprites
    spriteAtlas =
    {
        // large tiles
        circle:  tile(0),
        crate:   tile(2),
        player:  tile(3),
        enemy:   tile(5),
        coin:    tile(6),

        // small tiles
        gun:     tile(2,8),
        grenade: tile(3,8),
    };

    // enable touch gamepad on touch devices
    touchGamepadEnable = true;

    // setup level
    buildLevel();

    // init game
    score = deaths = 0;
    gravity = -.01;
    objectDefaultDamping = .99;
    objectDefaultAngleDamping = .99;
    cameraScale = 4*16;
    cameraPos = getCameraTarget();

    // countTiles()
    drawRect(vec2(15, 15),vec2(TILE_SIZE, TILE_SIZE), new Color(0, 1, 0))
}

///////////////////////////////////////////////////////////////////////////////
function countTiles()
{
    if(!player) return

    const playerTileVec = new Vector2(
        Math.floor(player.pos.x),
        Math.floor(player.pos.y)
    )

    if(!lastTileX || !lastTileY) {
        lastTileX = playerTileVec.x
        lastTileY = playerTileVec.y
    }

    let currX = lastTileX;
    let currY = lastTileY;

    while (currX !== playerTileVec.x || currY !== playerTileVec.y)
    {
        const tileKey = `${currX},${currY}`

        if(!walkTiles[tileKey]) {
            walkTiles[tileKey] = true;
            uniqueCount++
        }

        if(currX !== playerTileVec.x) currX += Math.sign(playerTileVec.x - currX)
        if(currY !== playerTileVec.y) currY += Math.sign(playerTileVec.y - currY)

        const finalTileKey = `${playerTileVec.x},${playerTileVec.y}`
        if(!walkTiles[finalTileKey]) {
            walkTiles[finalTileKey] = true;
            uniqueCount++
        }

        lastTileX = playerTileVec.x
        lastTileY = playerTileVec.y

        // console.info(`Tiles walked over: `)
        console.log(walkTiles)
        // for(const tilekey in walkTiles)
        //     {
        //         if(walkTiles.hasOwnProperty(tilekey))
        //         {
        //             const[tileX, tileY] = tilekey.split(',').map(Number)
        //             const x = tileX * TILE_SIZE
        //             const y = tileY * TILE_SIZE
        
        //             drawRect(vec2(x, y),vec2(TILE_SIZE, TILE_SIZE), new Color(0, 1, 0))
        //             // drawText("X", x, y)
        //         }
        //     }
    }
}

function gameUpdate()
{
    // respawn player
    if (player.deadTimer > 1)
    {
        player = new Player(playerStartPos);
        player.velocity = vec2(0,.1);
        sound_jump.play();
    }
    
    // mouse wheel = zoom
    cameraScale = clamp(cameraScale*(1-mouseWheel/10), 1, 1e3);
    
    // T = drop test crate
    if (keyWasPressed('KeyT'))
        new Crate(mousePos);
    
    // E = drop enemy
    if (keyWasPressed('KeyE'))
        new Enemy(mousePos);

    // X = make explosion
    if (keyWasPressed('KeyX'))
        explosion(mousePos);

    // M = move player to mouse
    if (keyWasPressed('KeyM'))
        player.pos = mousePos;

    countTiles()
}

///////////////////////////////////////////////////////////////////////////////
function getCameraTarget()
{
    // camera is above player
    const offset = 3*percent(mainCanvasSize.y, 300, 600);
    return player.pos.add(vec2(0, offset));
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // update camera
    cameraPos = cameraPos.lerp(getCameraTarget(), clamp(player.getAliveTime()/2));
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    const drawText = (text, x, y, size=40) =>
        {
            overlayContext.textAlign = 'center';
            overlayContext.textBaseline = 'top';
            overlayContext.font = size + 'px arial';
            overlayContext.fillStyle = '#fff';
            overlayContext.lineWidth = 3;
            overlayContext.strokeText(text, x, y);
            overlayContext.fillText(text, x, y);
        }

    for(const tilekey in walkTiles)
    {
        if(walkTiles.hasOwnProperty(tilekey))
        {
            const[tileX, tileY] = tilekey.split(',').map(Number)
            const x = tileX * TILE_SIZE
            const y = tileY * TILE_SIZE

            drawRect(vec2(x, y),vec2(TILE_SIZE, TILE_SIZE), new Color(0, 1, 0))
            // drawText("X", x, y)
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // draw to overlay canvas for hud rendering
    const drawText = (text, x, y, size=40) =>
    {
        overlayContext.textAlign = 'center';
        overlayContext.textBaseline = 'top';
        overlayContext.font = size + 'px arial';
        overlayContext.fillStyle = '#fff';
        overlayContext.lineWidth = 3;
        overlayContext.strokeText(text, x, y);
        overlayContext.fillText(text, x, y);
    }
    drawText('Score: ' + score,   overlayCanvas.width*1/4, 20);
    drawText('Tiles walked over: ' + uniqueCount,   overlayCanvas.width*1/4, 50);
    drawText('Deaths: ' + deaths, overlayCanvas.width*3/4, 20);

    
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png', 'tilesLevel.png']);