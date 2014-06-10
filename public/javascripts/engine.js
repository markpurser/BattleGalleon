(function(window) {

    function Engine() {
        this.gameState = new GameState();
        this.selectedGalleon = {};
        this.selectedGalleonName = {};

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
        uk.co.markpurser.babylon3DViewModel.registerCallback(this, this.updateSelectedGalleonByNearest);

        uk.co.markpurser.babylon3DViewModel.start();

    }

    Engine.prototype.updateSelectedGalleonByNearest = function(location) {
        var name = this.gameState.getNameOfNearestGalleon(location);
        this.updateSelectedGalleon(name);
    }

    Engine.prototype.updateSelectedGalleon = function(name) {
        if( this.selectedGalleonName != name )
        {
            this.selectedGalleonName = name;
            this.selectedGalleon = this.gameState.galleonContainer[name];
            uk.co.markpurser.knockoutViewModel.selectedShip( this.selectedGalleon, this.windSpeed );
            uk.co.markpurser.babylon3DViewModel.cameraTransit( { x:this.selectedGalleon.gridx, y:this.selectedGalleon.gridy } );
        }

    }

    window.Engine = Engine;

})(window);

