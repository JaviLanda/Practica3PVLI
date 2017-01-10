'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}

//var enemy;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    enemy1:{},
    enemy2:{},
    enemy3:{},
    enemy4:{},
    coltan:{},
	 

    //Método constructor...
  create: function () {
      //creacion del mapa
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('simples_pimples','tiles');
      
      //creacion de las capas
      this.backgroundLayer = this.map.createLayer('fondo');
      this.groundLayer = this.map.createLayer('platforms');
      this.death = this.map.createLayer('death');

      this.map.setCollisionBetween(1, 5000, true, 'death');
      this.map.setCollisionBetween(1, 5000, true, 'platforms');
      
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);

      this.death.visible = true;

      //Añadimos los sprites de las entidades
      this._rush = this.game.add.sprite(250, 100, 'personaje');
      this.coltan = this.game.add.sprite(350, 1950, 'coltan');
      
      var enemyGroup = this.game.add.group();
      this._rush.scale.setTo(0.5, 0.5);
      this.coltan.scale.setTo(0.5, 0.5);
      this.enemy = this.game.add.sprite(430, 500, 'enemy', 0, enemyGroup);
      this.enemy2 = this.game.add.sprite(260, 850, 'enemy', 0, enemyGroup);
      this.enemy3 = this.game.add.sprite(280, 1160, 'enemy', 0, enemyGroup);
      this.enemy4 = this.game.add.sprite(280, 1900, 'enemy', 0, enemyGroup);
     
      
      //this.triggerR = this.game.add.sprite(550, 1925, null, 0 /*aqui va el nombre del grupo de triggers*/);
      //this.triggerR.scale.setTo(0.25, 0.25);
      //this.triggerL = this.game.add.sprite(200, 1925, null, 0 /*aqui va el nombre del grupo de triggers*/);
      //this.triggerL.scale.setTo(0.25, 0.25);

      //Limites y fisicas
      this.game.world.setBounds(0, 0, 2000, 2700);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.stage.backgroundColor = '#000000';
      this.game.physics.arcade.gravity.y = 300;
      this.game.physics.enable(this._rush, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.coltan, Phaser.Physics.ARCADE);
      
      //Fisicas para que los enemigos vuelen
      this.enemy.body.immovable = true;
      this.enemy.body.collideWorldBounds = true;
      this.enemy.body.allowGravity = false;

      this._rush.body.bounce.y = 0.1;
      this._rush.body.gravity.y = 550;
      this._rush.body.gravity.x = 0;
     
      this.groundLayer.resizeWorld(); //resize world and adjust to the screen+
      //Camara siguiendo al player
      this.game.camera.follow(this._rush);

      //tiempo cambio direccion enemigos
      this.game.time.events.loop(Phaser.Timer.SECOND, this.changeDirection, this);

      //ajustamos aqui el movimiento del enemigo para que pueda girar sin problemas
      this.enemy.body.velocity.x = 50;

      //Pause------------------
      var Esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
      Esc.onDown.add(this.unpause,this);

 },
  collectStars: function() {
    	coltan.kill();
    	console.log("tooma")
    
    },

  update: function() {
  	 var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
     var collisionWithEnemies = this.game.physics.arcade.collide(this.enemy, this.groundLayer);
     var collisionWithColtan = this.game.physics.arcade.collide(this.coltan, this.groundLayer);
  	 var cursors = this.game.input.keyboard.createCursorKeys();
     var jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	   this.game.camera.follow(this._rush);
     this.Input();


	   this._rush.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        this._rush.body.velocity.x = -200;

    }
     if (cursors.right.isDown)
    {
        this._rush.body.velocity.x = 200;
    }
    
    if (jumpButton.isDown && this._rush.body.onFloor())
    {
        this._rush.body.velocity.y = -450; 
    }

    this.checkPlayerFell();
    this.enemyCollision();
    //this.enemyMovement();
    this.game.physics.arcade.overlap(this._rush, this.coltan, this.takeColtan, null, this);
    //this.game.phy sics.arcade.overlap(this.enemy, this.triggerR, this.changeDirection, null, this);
    //this.game.physics.arcade.overlap(this.enemy, this.triggerL, this.changeDirection, null, this);

    },

  onPlayerFell: function(){
        console.log("muerto");
        this.game.state.start('gameOver');
    },

  checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death)){
            this.onPlayerFell();
        }
    },

    render: function() {
      this.game.debug.bodyInfo(this._rush, 16, 24);
    },

    enemyMovement: function(){
     // this.enemy.body.velocity.x = 50; 
      
      },

    changeDirection: function(){
      this.enemy.body.velocity.x *= -1;
      console.log('sa girao');
    },

    enemyCollision: function() {
      if(this.game.physics.arcade.overlap(this._rush, this.enemy)){
        console.log("san tocao");
        this.game.state.start('gameOver');
      }
    },

    takeColtan: function(){
      this.coltan.destroy();
      console.log('coltaaan');
      //this.game.state.start('victory');

    },


  Input: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC))
      this.Pause();
  },

  Pause: function(){
    this.menu = new menu(this.game);
    this.game.paused = true;
  },

  unpause: function(event){
    if(this.game.paused){
      this.game.paused = false;
      this.menu.destroy();
    }
  },

    shutdown: function() {

    this.cache.removeTilemap('tilemap');
    this.cache.removeImage('tiles');
    this.game.world.setBounds(0,0,800,600);
    console.log("saa rotooo	")
    
    }
  };


function menu(game){

  this.button = game.add.sprite(game.world.centerX, 200, 'button');
 
  this.button.inputEnabled = true;
  game.input.onDown.add(actionOnClick, this);

  this.button.anchor.set(0.5);
  this.pText = game.add.text(game.world.centerX, 100, "Pause");
  this.text = game.add.text(0, 0, "Continue");
  this.text.anchor.set(0.5);
  this.pText.anchor.set(0.5);
  this.button.addChild(this.text);
    
  this.button2 = game.add.sprite(game.world.centerX, 300, 'button');
  this.button2.anchor.set(0.5);
  this.text2 = game.add.text(0, 0, "Return Menu");
  this.text2.anchor.set(0.5);
  this.button2.addChild(this.text2);

  function actionOnClick(event){
      if(this.button.getBounds().contains(event.x,event.y)){
          game.paused = false;
          this.destroy();
      }
      else if(this.button2.getBounds().contains(event.x,event.y)){
          game.paused = false;
          game.state.start('menu');
      }
  }
}

menu.prototype.destroy = function(){
  this.button.kill();
  this.pText.destroy();
  this.text.destroy();
  this.button2.kill();
  this.text2.destroy();
}

module.exports = PlayScene;

