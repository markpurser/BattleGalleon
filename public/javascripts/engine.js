(function(window) {

    function Engine() {
        this.gameState = new GameState();
        this.selectedGalleon = {};

        this.windSpeed = 2;

    }

    Engine.prototype.start = function() {
        this.gameState.reset();

        this.selectedGalleon = this.gameState.galleonContainer["Antelope"];

        uk.co.markpurser.selectedShipViewModel.selectedShip( this.selectedGalleon, this.windSpeed );

    }

    window.Engine = Engine;

})(window);

