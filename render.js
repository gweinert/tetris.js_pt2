var GAME = GAME || {};

GAME.Render = (function(){

  // var canvas = $('#canvas');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  
  function init(){
    // canvas = document.getElementById('canvas');
    // console.log(canvas);
    ctx = canvas.getContext('2d');
  }

  function drawGameLoop(){

    GAME.Render.drawBg();
    
    for(var i = 0 ; i < GAME.Block.blocks.length ; i++ ){

      // GAME.Render.drawBlock(GAME.Block.blocks[i]);
      GAME.Block.eachBlock(GAME.Block.blocks[i], drawBlock);
    }
  }

  function drawBg(){
    // ctx.clearRect(0, 0, 300, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawBlock(x, y){
    // ctx.fillStyle = "green";
    ctx.strokeWidth = "4px";
    ctx.strokeStyle = "white";
    // ctx.strokeRect(block.pieces[0][0], block.pieces[0][1], GAME.Block.blockWidth, GAME.Block.blockHeight);
    ctx.strokeRect(x, y, GAME.Block.blockWidth, GAME.Block.blockHeight);

    // for(var i = 0; i < block.pieces.length ; i++ ){
    //   console.log(block.pieces[i][0],block.pieces[i][1])
    //   console.log(block.width, block.height)
    //   ctx.strokeRect(block.pieces[i][0], block.pieces[i][1], block.width, block.height);
    // }
    // GAME.model.eachBlock(block, )

    ctx.stroke();
    
  }

  return {
    init: init,
    canvas: canvas,
    ctx: ctx,
    drawBg: drawBg,
    drawBlock:drawBlock,
    drawGameLoop: drawGameLoop
  };

})();