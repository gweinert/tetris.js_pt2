var GAME = GAME || {};

GAME.Controller = (function(){

  var canvas = document.getElementById('canvas');
  
  var keys = {
                37: moveLeft,
                // 38: rotatePiece,
                39: moveRight,
                40: moveDown
              };

  function _startKeyListener(){
    $(document).keydown(function(e){
      e.preventDefault();
      if (keys[e.keyCode]){
        keys[e.keyCode]();
      }
      e.preventDefault();
    });
  }

  function moveDown(){

    GAME.Block.drop();
  }



  function moveLeft(){
    var block = GAME.Block.currentBlock;
    if( GAME.Board.reachedBoundary(block, -GAME.Block.blockWidth, 0) !== true ){
      GAME.Block.currentBlock.pos.x -= GAME.Block.blockWidth;
      // GAME.Block.eachBlock(GAME.Block.currentBlock, ticLeft);
      for(var i = 0; i<GAME.Block.currentBlock.pieces.length; i++ ){
        GAME.Block.currentBlock.pieces[i][0] -= GAME.Block.blockWidth;
      }
      console.log(GAME.Block.currentBlock);
    }
  }


  function moveRight(){
    var block = GAME.Block.currentBlock;
    if( GAME.Board.reachedBoundary(block, block.width, 0) !== true ){
      GAME.Block.currentBlock.pos.x += GAME.Block.blockWidth;
      for(var i = 0; i<GAME.Block.currentBlock.pieces.length; i++ ){
        GAME.Block.currentBlock.pieces[i][0] += GAME.Block.blockWidth;
      }

    }
  }
  
  function init(){
    _startKeyListener();
    GAME.Render.init();
    GAME.Render.drawBg();
    GAME.Block.buildNewBlock();
    var currentBlock = GAME.Block.currentBlock;


    _startGameLoop();
  }


  function playGameLogic(){
    if( GAME.Board.needNewBlock === true ){
      GAME.Block.addToPlacedBlocks(GAME.Block.currentBlock);
      GAME.Block.buildNewBlock();
      GAME.Board.needNewBlock = false;
    }
    else
    {
      // GAME.Block.currentBlock.tic();
      GAME.Block.tic(GAME.Block.currentBlock);
    }
  }

  function checkFullRows(){
    var rowCheck = 0;
    var row = 0;
    var clear = false;
    var rowHolder = {};
      for( var i in GAME.Block.placedBlocks){
        for( var j = 0; j < GAME.Block.placedBlocks[i].length; j++ ){
        // for(var j in GAME.Block.placedBlocks[i]){
          if(GAME.Block.placedBlocks[i][j]){
            if(rowHolder[GAME.Block.placedBlocks[i][j][1]] >= 1 ){
            
              rowHolder[GAME.Block.placedBlocks[i][j][1]] += 1;
            }

            else{
              rowHolder[GAME.Block.placedBlocks[i][j][1]] = 1 ;
            }
          }
        }
      }
    for(var key in rowHolder){
      if(rowHolder[key] > 9){
        console.log("WINNN");
        row = key;
        rowHolder[key] = 0;
        clear = true;
        // console.log("key"+key);
        break;
      }
    }
    if(clear === true){
      clearRow(key);
      rowHolder[key] = 0;
      clear = false;
    }
    // console.log(rowHolder);
    
  }

  function clearRow(row){
    for( var i in GAME.Block.placedBlocks){
      for(var j = 0; j<GAME.Block.placedBlocks[i].length; j++ ){
        if(GAME.Block.placedBlocks[i][j][1] == row ){
          GAME.Block.placedBlocks[i][j] = undefined;
        }
      }
    }
    for(var j = 0; j<GAME.Block.blocks.length; j++){
      while(GAME.Block.blocks[j].pos.y == row){
        GAME.Block.blocks.splice(j, 1);
      }
      if(GAME.Block.blocks[j].pos.y != row){
        //DO SAME FOR PLACED BLOCKS?
        GAME.Block.blocks[j].pos.y += GAME.Block.blockHeight;
      }
    }
    console.log("clearrr");
  }

  function _startGameLoop(){
    
    var gameLoop = setInterval(function(){
      checkFullRows();
      playGameLogic();
      GAME.Render.drawGameLoop();
      
      
      // GAME.Block.currentBlock.tic();
    }, 400);
  }

  return {
    init: init,
    canvas: canvas
  };

})();

$(document).ready(function(){

  GAME.Controller.init();

});