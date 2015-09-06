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
      // GAME.Render.drawBlock(GAME.Block.blocks[i].pos.x, GAME.Block.blocks[i].pos.y);
      GAME.Render.drawBlock(GAME.Block.blocks[i]);
    }
    // GAME.Render.drawBlock(GAME.Block.currentBlock.pos.x,GAME.Block.currentBlock.pos.y);
    // for(var i in GAME.Block.placedBlocks){
    //   GAME.Render.drawBlock(GAME.Block.placedBlocks[i][0], GAME.Block.placedBlocks[i][1]);
    // }

    // console.log(GAME.Block.currentBlock.pos.x, GAME.Block.currentBlock.pos.y);
  }

  function drawBg(){
    ctx.clearRect(0, 0, 300, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawBlock(block){
    ctx.fillStyle = "green";
    ctx.strokeWidth = "2px";
    ctx.strokeStyle = "white";
    // ctx.strokeRect(x, y, GAME.Block.blockWidth, GAME.Block.blockHeight);
    ctx.strokeRect(block.pos.x, block.pos.y, block.width, block.height);

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