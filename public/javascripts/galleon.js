(function(window) {

    function Galleon( name, gridx, gridy, meshes ) {
        this.name = name;
        this.gridx = gridx;
        this.gridy = gridy;
        this.heading = Math.random()*2*Math.PI;
        this.alpha = Math.random()*Math.PI*2;
        this.meshes = meshes;

        this.status = _.sample(["inirons","windinsails"]);
        this.sailSetting = _.sample(["battle","normal"]);
        this.speedRating = _.sample(["lightfast","lightslow","heavyfast","heavyslow"]);
        this.crewGrade = _.sample(["A","B","C","D","E"]);
        this.remainingMovement = 140;

        this.speedMPerTurn = function(windSpeed) {
          return uk.co.markpurser.CombatTables.speedMPerTurn(this.sailSetting, windSpeed);
        }
    }

    window.Galleon = Galleon;

})(window);

