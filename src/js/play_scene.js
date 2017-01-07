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
