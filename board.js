var GAME = GAME || {};

GAME.Board = (function(){

  var canvas = $('#canvas');
  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();
  var needNewBlock = false;

  function init(){

  }

  function hasBlock(x, y){
    // if(GAME.Block.placedBlocks[x] && GAME.Block.placedBlocks[x].toString() === [x, y].toString() ){
    if(GAME.Block.placedBlocks[x]){
      for( var i = 0; i < GAME.Block.placedBlocks[x].length; i++ ){
        if(GAME.Block.placedBlocks[x][i] && GAME.Block.placedBlocks[x][i].toString() === [x, y].toString() ){
          console.log("placedblocks:"+GAME.Block.placedBlocks[x][i]);
          console.log(x,y);
          return true;
        }
      }
    }
    else{
      return false;
    }
  }

  function reachedBoundary(block, shiftx, shifty){
    var y = block.pos.y + shifty;
    var x = block.pos.x + shiftx;

    if( x <= -GAME.Block.blockWidth || x >= canvasWidth ){
      console.log(canvasWidth);
      console.log("bound: "+ x,y);
      return true;
    }
    
    if(hasBlock(x,y) || y >= canvasHeight){
      GAME.Board.needNewBlock = true;
      return true;
    }

    else{
      return false;
    }

  }

  return {
    
    reachedBoundary: reachedBoundary,
    needNewBlock: needNewBlock
  
  };

})();