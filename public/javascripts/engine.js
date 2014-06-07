(function(window) {

    function Engine() {
        this.gameState = new GameState();
        this.selectedGalleon = {};

        this.windSpeed = 2;

    }

    Engine.prototype.start = function() {
        this.gameState.reset();

        // Knockout viewmodel setup
        uk.co.markpurser.knockoutViewModel.engine = this;
        uk.co.markpurser.knockoutViewModel.updateSelectedGalleonCallback = this.updateSelectedGalleon;

        this.updateSelectedGalleon("Antelope");

        uk.co.markpurser.knockoutViewModel.populateSelectShipDropDown( this.gameState.galleonList() );

        // Babylon 3D viewmodel setup
        uk.co.markpurser.babylon3DViewModel.start();

    }

    Engine.prototype.updateSelectedGalleon = function(name) {
        this.selectedGalleon = this.gameState.galleonContainer[name];
        uk.co.markpurser.knockoutViewModel.selectedShip( this.selectedGalleon, this.windSpeed );

    }

    window.Engine = Engine;

})(window);

