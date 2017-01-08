'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
var coltan;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

	  

    //Método constructor...
  create: function () {

      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('simples_pimples','tiles');
      
      this.backgroundLayer = this.map.createLayer('fondo');
      this.groundLayer = this.map.createLayer('platforms');
      this.death = this.map.createLayer('death');

      this.map.setCollisionBetween(1, 5000, true, 'death');
      this.map.setCollisionBetween(1, 5000, true, 'platforms');
      
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);

      this.death.visible = true;

      this._rush = this.game.add.sprite(300, 50, 'personaje');
      coltan = this.game.add.sprite(300, 100, 'coltan');
      this._rush.scale.setTo(0.5, 0.5);
      coltan.scale.setTo(0.5, 0.5);
     
      this.game.world.setBounds(0, 0, 2000, 2700);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
	  this.game.stage.backgroundColor = '#000000';
      this.game.physics.arcade.gravity.y = 300;
      this.game.physics.enable(this._rush, Phaser.Physics.ARCADE);

      this._rush.body.bounce.y = 0.1;
   	  //this._rush.body.collideWorldBounds = true;
      
      this._rush.body.gravity.y = 1000;
      this._rush.body.gravity.x = 0;
     
      this.game.camera.follow(this._rush);

      this.groundLayer.resizeWorld(); //resize world and adjust to the screen
  },

  collectStars: function() {
    	coltan.kill();
    	console.log("tooma")
    
    },

  update: function() {
  	 var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
  	 var cursors = this.game.input.keyboard.createCursorKeys();
     var jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	 this.game.camera.follow(this._rush);

	this._rush.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        this._rush.body.velocity.x = -300;

    }
     if (cursors.right.isDown)
    {
        this._rush.body.velocity.x = 300;
    }
    
    if (jumpButton.isDown && this._rush.body.onFloor())
    {
        this._rush.body.velocity.y = -500; 
    }    

  	//GameOver
    if(this.game.physics.arcade.collide(this._rush, this.death)){
            this.game.state.start('gameOver');
        }
    },

	

    
    
    shutdown: function() {

    this.cache.removeTilemap('tilemap');
    this.cache.removeImage('tiles');
    this.game.world.setBounds(0,0,800,600);
    console.log("saa rotooo	")
    }



   
};

module.exports = PlayScene;