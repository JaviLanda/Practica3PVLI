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