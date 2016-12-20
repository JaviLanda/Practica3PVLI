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
   
    
      //Carga del tilemap e imagenes 
      this.load.onLoadStart.add(this.loadStart, this);
      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'images/simples_pimples.png');
      this.game.load.atlasJSONHash('rush_idle01','images/rush_spritesheet.png','images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    	this.game.load.onLoadComplete.add(this.loadComplete, this);
      
      /*CODIGO NUEVO
      this.load.onLoadStart.add(this.loadStart, this);
      this.game.load.tilemap('tilemap', 'images/level1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'images/tilesMaria.png');
      this.game.load.image('personaje', 'images/personaje.png');
      
      **-- esto creo que no nos hace falta --**
      this.game.load.atlasJSONHash('rush_idle01','images/rush_spritesheet.png',
      'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      
      this.game.load.onLoadComplete.add(this.loadComplete, this);
      */

	},
      

  loadStart: function () {
 
    console.log("Game Assets Loading ...");
    this.game.state.start('play');
    
  },
    

   loadComplete: function(){
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
function init (){

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('preloader', PreloaderScene);
  game.state.add('boot', BootScene);
  game.state.add('menu', menu);
  game.state.add('gameOver', gameOver);
  game.state.add('play', play);
  game.state.add('pause', pause);
 
  game.state.start('boot');
 
}
 
window.onload = function () {
  WebFont.load(wfconfig); 	


 
};
