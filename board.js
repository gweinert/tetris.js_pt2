var GAME = GAME || {};

GAME.Board = (function(){

  var canvas = $('#canvas');
  var canvasWidth = canvas.width();
  var canvasHeight = canvas.height();
  var needNewBlock = false;

  function init(){

  }

  function hasBlock(x, y, block){
    // if(GAME.Block.placedBlocks[x] && GAME.Block.placedBlocks[x].toString() === [x, y].toString() ){
    
  //   if(GAME.Block.placedBlocks[x]){
  //     for( var i = 0; i < GAME.Block.placedBlocks[x].length; i++ ){
  //       // console.log(GAME.Block.placedBlocks[x]);
  //       if(GAME.Block.placedBlocks[x][i] && GAME.Block.placedBlocks[x][i].toString() === [x, y].toString() ){
  //         console.log("placedblocks:"+GAME.Block.placedBlocks[x][i]);
  //         console.log(x,y);
  //         return true;
  //       }
  //     }
  //   }
  // }
    
    var occupied = false;
    for(var i = 0; i < block.pieces.length ; i++ ){
      x = block.pieces[i][0];
      if(GAME.Block.placedBlocks[x]){
        for( var j = 0; j < GAME.Block.placedBlocks[x].length; j++ ){
          // console.log("x,y:"+x,y);
          if(GAME.Block.placedBlocks[x][j] && GAME.Block.placedBlocks[x][j].toString() === [x, y].toString() ){
            console.log("hit block");
            console.log(x,y);
            occupied = true;
          }
        }
      }
    }
    // console.log("occupied "+occupied);
    return occupied;
    
  }

  function reachedBoundary(block, shiftx, shifty){
    var y = block.pos.y + shifty;
    var x = block.pos.x + shiftx;

    if( x <= -GAME.Block.blockWidth || x >= canvasWidth ){
      console.log(canvasWidth);
      console.log("bound: "+ x,y);
      return true;
    }
    
      if(hasBlock(x, y , block) || y >= canvasHeight){
      console.log(x,y)
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