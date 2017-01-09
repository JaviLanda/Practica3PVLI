(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        var button2 = this.game.add.button(400, 150, 
                                          'button', 
                                          this.actionOnClick2, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        var texto = this.game.add.text(0, 0, "Return Main Menu");
        texto.anchor.set(0.5);
        button2.addChild(texto);
    },
     actionOnClick2: function () {
        this.game.state.start('menu');
    },
    
    
    actionOnClick: function () {
        this.game.state.start('preloader');
    }

};

module.exports = GameOver;
},{}],2:[function(require,module,exports){
'use strict';


var play = require('./play_scene');
var gameOver = require('./gameover_scene');
var menu = require('./menu_scene');
var pause = require('./pause');
var victory = require('./victory_scene');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('fondo', 'images/fondoMenu.png');
    this.game.load.image('coltan', 'images/coltan.png');
    this.game.load.image('enemy', 'images/enemy.png');
    this.game.load.image('trigger', 'images/trigger.png');


  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
   
    this.game.load.onLoadComplete.add(this.loadComplete, this);
      
      

      this.game.load.tilemap('tilemap', 'images/lvlphaser.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'images/simples_pimples.png');
      this.game.load.image('personaje', 'images/personaje.png');


      
      /***-- esto creo que no nos hace falta --**
      this.game.load.atlasJSONHash('rush_idle01','images/rush_spritesheet.png',
      'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      **--------------------------------------***/

      this.game.load.onLoadComplete.add(this.loadComplete, this);
      

	},
      

  loadStart: function () {
    
    console.log("Game Assets Loading ...");
   
    
  },
    

   loadComplete: function(){
    this.game.state.start('play');
    this.ready = true;
   },
    
    
    update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }
 
};

window.onload = function () {
  WebFont.load(wfconfig);   

};

function init (){

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('preloader', PreloaderScene);
  game.state.add('boot', BootScene);
  game.state.add('menu', menu);
  game.state.add('gameOver', gameOver);
  game.state.add('play', play);
  game.state.add('pause', pause);
  game.state.add('victory', victory);
 
  game.state.start('boot');
 
 
};

},{"./gameover_scene":1,"./menu_scene":3,"./pause":4,"./play_scene":5,"./victory_scene":6}],3:[function(require,module,exports){
var MenuScene = {
    create: function () {
        
        var fondo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'fondo');
        fondo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var style = {font:"70px Impact", fill:"#a0a0a0", align: "center"};
        var TextTitle = this.game.add.text(230,30, "MINEBLOWN",style);
        var style1 = {font:"15px Courier New", fill:"#a0a0a0", align: "center"};
        var textnomb = this.game.add.text(10,560, "María García Raldúa", style1);
        textnomb.addColor("#ffffff",0);
        var textnomb = this.game.add.text(10,580, "Javier Landaburu Sánchez", style1);
        textnomb.addColor("#ffffff",0);
        var textStart = this.game.add.text(0, 0, "Play!");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],4:[function(require,module,exports){
var Pause = { 
	create: function() {

	var menu = this.game.add.group();
	menu.x = this.game.world.centerX;
	// make the menu invisible for now 
	menu.visible = false;  
	// create 3 buttons and add them to the 'menu' group
	var button1 = this.game.add.button(-50, 100, 'button1', button1Click, this, 2, 1, 0, this.menu);
	var button2 = this.game.add.button(-50, 200, 'button2', button2Click, this, 2, 1, 0, this.menu);
	
	},

	// pause the game and show the menu
	/*pauseGame: function() {
   		this.game.paused = true;
   		this.menu.visible = true;
   	
   	}*/
 

   	// ensure the game is paused before allowing the action to go ahead
   button1Click: function() {
   	if (this.game.paused) {
   	  	this.game.paused = false;
   	   this.menu.visible = false;
   	}
   },
   	        
   button2Click: function() {
   	if (this.game.paused) {
   	    this.game.state.start('menu');
   	}
   }       
   





};

module.exports = Pause
},{}],5:[function(require,module,exports){
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
    enemy:{},
    coltan:{},
	  triggerR:{},
    triggerL:{},

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
      this._rush = this.game.add.sprite(250, 1950, 'personaje');
      this.coltan = this.game.add.sprite(350, 1950, 'coltan');
      this.enemy = this.game.add.sprite(450, 1900, 'enemy');
      this.enemy.scale.setTo(0.5, 0.5);
      this._rush.scale.setTo(0.5, 0.5);
      this.coltan.scale.setTo(0.5, 0.5);

      this.triggerR = this.game.add.sprite(550, 1925, null, 0 /*aqui va el nombre del grupo de triggers*/);
      this.triggerR.scale.setTo(0.25, 0.25);
      this.triggerL = this.game.add.sprite(200, 1925, null, 0 /*aqui va el nombre del grupo de triggers*/);
      this.triggerL.scale.setTo(0.25, 0.25);

      //Limites y fisicas
      this.game.world.setBounds(0, 0, 2000, 2700);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.stage.backgroundColor = '#000000';
      this.game.physics.arcade.gravity.y = 300;
      this.game.physics.enable(this._rush, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.coltan, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.triggerR, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.triggerL, Phaser.Physics.ARCADE);


      this._rush.body.bounce.y = 0.1;

      this._rush.body.gravity.y = 550;
      this._rush.body.gravity.x = 0;
     
      this.game.camera.follow(this._rush);

      this.groundLayer.resizeWorld(); //resize world and adjust to the screen+
      //Camara siguiendo al player
      this.game.camera.follow(this._rush);

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
     var collisionWithTrigger = this.game.physics.arcade.collide(this.triggerR, this.groundLayer);
     var collisionWithTrigger2 = this.game.physics.arcade.collide(this.triggerL, this.groundLayer);
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
    //this.game.physics.arcade.overlap(this.enemy, this.triggerR, this.changeDirection, null, this);
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
      this.game.debug.bodyInfo(this.enemy, 16, 24);
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


},{}],6:[function(require,module,exports){
var VictoryScene = {
    create: function () {
        console.log("Victory");
        var button = this.game.add.button(400, 300,
            'button',this.actionOnClick, this, 2, 1, 0);

        button.anchor.set(0.5);

        var goText = this.game.add.text(400, 100, "¡Enhorabuena!");

        var text = this.game.add.text(0, 0, "Restart");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        
        var button2 = this.game.add.button(400, 150,
                                          'button',
                                          this.actionOnClick2, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        var text2 = this.game.add.text(0, 0, "Return Menu");
        text2.anchor.set(0.5);
        button2.addChild(text2);
    },
    
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    },

   
    actionOnClick2: function(){
        
        this.game.state.start('menu');
    }
};

module.exports = VictoryScene;
},{}]},{},[2]);
