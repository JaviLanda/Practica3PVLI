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