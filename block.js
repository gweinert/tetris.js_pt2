
var GAME = GAME || {};

GAME.Block = (function(){

  var canvas = document.getElementById('canvas');
  var blockTypes = {
                      1: Square,
                      2: Rectangle
                  };
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

  function Square(x, y){

    this.pos = {
                  x: x,
                  y: y
                };
    this.type = {1 : Square};
    this.height = model.blockHeight*2;
    this.width = model.blockWidth*2;
    this.acceleration = 30;
    this.pieces = [];

    // this.pieces[0] = [150, 0];
    // this.pieces[1] = [180, 0];
    // this.pieces[2] = [150, 30];
    // this.pieces[3] = [180, 30];
     this.pieces[0] = [this.pos.x, this.pos.y];
    this.pieces[1] = [this.pos.x + 30, this.pos.y];
    this.pieces[2] = [this.pos.x, this.pos.y +30];
    this.pieces[3] = [this.pos.x + 30, this.pos.y + 30];
  }

  function Rectangle(x, y){
    this.pos = {
                  x: x,
                  y: y
               };

    this.type = {1 : Rectangle};

    this.height = model.blockHeight;
    this.width = model.blockWidth;
    this.acceleration = 30;
    this.pieces = [];

    // this.pieces[0] = [x - 60, y];
    // this.pieces[1] = [x - 30, y];
    // this.pieces[2] = [x, y];
    // this.pieces[3] = [x + 30, y];
    this.pieces[0] = [this.pos.x - 60, this.pos.y];
    this.pieces[1] = [this.pos.x - 30, this.pos.y];
    this.pieces[2] = [this.pos.x, this.pos.y];
    this.pieces[3] = [this.pos.x + 30, this.pos.y];
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

  //will need to fix
  model.dropToBottom = function(block, pos){
    // block.pos.y = pos - block.height;
    var x = block.pos.x;
    var y = canvas.height - block.height;
    model.blocks.pop();
    blockType = block.type[1];
    model.currentBlock = {};
    var droppedBlock = new blockType(x, y);
    model.blocks.push(droppedBlock);
    model.addToPlacedBlocks(droppedBlock)
    // for(var i = 0; i<block.pieces.length; i++){
      //bottom blocks
      // model.
      // block.pieces[i][1] = (pos - block.height);
      // if(i > 1 ){
      //     block.pieces[i][1] = pos - model.blockHeight;
      // }
      // //top blocks
      // else{
      //   block.pieces[i][1] = pos - block.height;
      // }
    // }
  };
  
  model.drop = function(){
    var pos = canvas.height;
    var block = model.currentBlock;
    // var x = model.currentBlock.pos.x;
    var min = 0;
    var x_exist = false;

    for(var i = 0; i < block.pieces.length; i++){
      x = block.pieces[i][0];
      if(model.placedBlocks[x] && model.placedBlocks[x].length > 0){
        x_exist = true;
        console.log(model.placedBlocks[x]);
        for( var j = 0; j < model.placedBlocks[x].length ; j++){
          //finds next available spot by seeing smallest y value of all placed blocks blow it
          console.log("min"+min);
          min =  model.placedBlocks[x][j][1];
          if(model.placedBlocks[x][j][1] < min){
            min = model.placedBlocks[x][j][1];
          }
        }
      }
    }

    if(x_exist){
      model.dropToBottom(GAME.Block.currentBlock, min-30);

      GAME.Board.needNewBlock = true;
    }
    else{
      model.dropToBottom(GAME.Block.currentBlock, pos);
    }
  };

  model.eachBlock = function(block, fn){
    for(var i = 0; i<block.pieces.length; i++){
      fn(block.pieces[i][0], block.pieces[i][1]);
    }
  };

  model.buildNewBlock = function(){
    var randomNum = Math.floor(Math.random() * 2)+1;
    var randomBlock = blockTypes[randomNum];
    console.log(randomBlock);
    var block = new randomBlock(150, 0);
    model.currentBlock = block;
    model.blocks.push(block);
  };


  model.addToPlacedBlocks = function(block){

    // if(model.placedBlocks[block.pos.x]){
      // model.placedBlocks[block.pos.x].push([block.pos.x, block.pos.y]);
    // }
    // else{
      // model.placedBlocks[block.pos.x] = [[block.pos.x, block.pos.y]];
    // }

    for(var i = 0 ; i < block.pieces.length ; i++){
      if( model.placedBlocks[ block.pieces[i][0] ] ){
        model.placedBlocks[block.pieces[i][0]].push([block.pieces[i][0], block.pieces[i][1]]);
      }
      else{
        model.placedBlocks[block.pieces[i][0]] = [ [ block.pieces[i][0], block.pieces[i][1]] ];
      }
    }

  };

  return model;

})();