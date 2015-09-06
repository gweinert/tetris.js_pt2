
var GAME = GAME || {};

GAME.Block = (function(){

  var canvas = document.getElementById('canvas');
  var model = {};
  model.blockWidth = canvas.width/10;
  model.blockHeight = canvas.height/20;
  model.currentBlock = {};
  model.blocks = [];
  model.placedBlocks = [];

  function Block(x, y, height, width){

    this.pos = {
                  x: x,
                  y: y
    };

    this.width = width;
    this.height = height;
    this.color = "green";
    this.acceleration = 30;
  }

  Block.prototype.tic = function(){
     if( GAME.Board.reachedBoundary(this, 0, GAME.Block.blockHeight) === true ){
      this.acceleration = 0;
    }
    this.pos.y += this.acceleration;
  };

  model.buildNewBlock = function(){
    var block = new Block(150, 0, model.blockWidth, model.blockHeight);
    model.currentBlock = block;
    model.blocks.push(block);
  };

  model.build2x2 = function(){
    var block = new Block(150, 0, model.blockWidth, model.blockHeight);
    model.currentBlock = block;
    model.blocks.push(block);
  };

  model.addToPlacedBlocks = function(block){
    //before!!!
    // model.placedBlocks[block.pos.x] = [block.pos.x, block.pos.y];

    if(model.placedBlocks[block.pos.x]){
      model.placedBlocks[block.pos.x].push([block.pos.x, block.pos.y]);
    }
    else{
      model.placedBlocks[block.pos.x] = [[block.pos.x, block.pos.y]];
    }

  };

  return model;

})();