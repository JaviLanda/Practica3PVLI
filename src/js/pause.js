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