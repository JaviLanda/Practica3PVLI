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


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('fondo', 'images/fondoMenu.png');
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
      
      

      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'images/tileset.png');
      this.game.load.image('pinchos', 'images/pinchosdef.png');
      this.game.load.image('back', 'images/fondoclaroscuro.png');
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
 
  game.state.start('boot');
 
 
};

},{"./gameover_scene":1,"./menu_scene":3,"./pause":4,"./play_scene":5}],3:[function(require,module,exports){
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

	var menu = game.add.group();
	menu.x = game.world.centerX;
	// make the menu invisible for now 
	menu.visible = false;  
	// create 3 buttons and add them to the 'menu' group
	var button1 = game.add.button(-50, 100, 'button1', button1Click, this, 2, 1, 0, this.menu);
	var button2 = game.add.button(-50, 200, 'button2', button2Click, this, 2, 1, 0, this.menu);
	
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
   	        
   	        
   	        }}       
   





};

module.exports = Pause
},{}],5:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}

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
     
      
      this._rush = this.game.add.sprite(69, 98, 'personaje');

      this.map = this.game.add.tilemap('tilemap', 32, 32);
      this.map.addTilesetImage('tileset','tiles');
      this.map.addTilesetImage('pinchosdef','pinchos');
      this.map.addTilesetImage('fondoclaroscuro','back');

      
      this.backgroundLayer = this.map.createLayer('fondo');
      this.groundLayer = this.map.createLayer('plataformas');
      this.death = this.map.createLayer('death');

      this.map.setCollisionBetween(1, 5000, true, 'death');
      this.map.setCollisionBetween(1, 5000, true, 'plataformas');
      
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);
      

      //this.groundLayer.resizeWorld(); //resize world and adjust to the screen
 
  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var movement = this.GetMovement();
        
		this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();

    },

    pressPause: function (){
        if(this.game.input.keyboard.isDown(Phaser.KeyCode.P))
            this.game.state.start('pause');
    },
     
    onPlayerFell: function(){
        this.game.state.start('gameOver');

    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },
        
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 2400, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        
        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 20000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this.game.camera.follow(this._rush);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    
    shutdown: function() {

    this.cache.removeTilemap('tilemap');
    this.cache.removeImage('tileset');
    this.cache.removeImage('pinchosdef');
    this.cache.removeImage('fondoclaroscuro');
    this.game.world.setBounds(0,0,800,600);
    }

};

module.exports = PlayScene;

},{}]},{},[2]);
