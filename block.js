
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

  function Square(){

    this.pos = {
                  x: 150,
                  y: 0
                };
    this.height = model.blockHeight*2;
    this.width = model.blockWidth*2;
    this.acceleration = 20;
    this.pieces = [];

    this.pieces[0] = [150, 0];
    this.pieces[1] = [180, 0];
    this.pieces[2] = [150, 30];
    this.pieces[3] = [180, 30];
  }

  // Block.prototype.tic = function(){
  //    if( GAME.Board.reachedBoundary(this, 0, GAME.Block.blockHeight) === true ){
  //     this.acceleration = 0;
  //   }
  //   this.pos.y += this.acceleration;
  // };



  model.tic = function(block){
    if( GAME.Board.reachedBoundary(model.currentBlock, 0, model.currentBlock.height) === true ){
      model.currentBlock.acceleration = 0;
    }
    model.currentBlock.pos.y += model.currentBlock.acceleration;
    for(var i = 0; i < block.pieces.length; i++ ){
      block.pieces[i][1] += block.acceleration;
    }
  };

  model.eachBlock = function(block, fn){
    for(var i = 0; i<block.pieces.length; i++){
      fn(block.pieces[i][0], block.pieces[i][1]);
    }
  };

  model.buildNewBlock = function(){
    // var block = new Block(150, 0, model.blockWidth, model.blockHeight);
    var block = new Square(100);
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