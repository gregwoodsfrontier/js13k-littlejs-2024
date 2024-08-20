
// import module
import * as LittleJS from '../../dist/littlejs.esm.js';
const {
    tileCollisionSize,
    randColor
} = LittleJS;


const tileType_ladder    = -1;
const tileType_empty     = 0;
const tileType_solid     = 1;
const tileType_breakable = 2;

let player, playerStartPos, tileData, tileLayers, foregroundLayerIndex, sky;
let levelSize, levelColor, levelBackgroundColor, levelOutlineColor, warmup;

const setTileData = (pos, layer, data)=>
    pos.arrayCheck(tileCollisionSize) && (tileData[layer][(pos.y|0)*tileCollisionSize.x+pos.x|0] = data);
const getTileData = (pos, layer)=>
    pos.arrayCheck(tileCollisionSize) ? tileData[layer][(pos.y|0)*tileCollisionSize.x+pos.x|0]: 0;
