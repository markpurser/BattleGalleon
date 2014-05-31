(function(window) {

    function Engine() {
        this.gameState = new GameState();
        this.selectedGalleon = {};

        this.windSpeed = 2;

    }

    Engine.prototype.start = function() {
        this.gameState.reset();

        uk.co.markpurser.selectedShipViewModel.engine = this;
        uk.co.markpurser.selectedShipViewModel.updateSelectedGalleonCallback = this.updateSelectedGalleon;

        this.updateSelectedGalleon("Antelope");

        uk.co.markpurser.selectedShipViewModel.populateGalleonOptions( this.gameState.galleonList() );


    }

    Engine.prototype.updateSelectedGalleon = function(name) {
        this.selectedGalleon = this.gameState.galleonContainer[name];
        uk.co.markpurser.selectedShipViewModel.selectedShip( this.selectedGalleon, this.windSpeed );

    }

    window.Engine = Engine;

})(window);

