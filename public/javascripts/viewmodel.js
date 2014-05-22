

StatusDisplayName = { "windinsails":"Wind In Sails", "inirons":"In Irons", "tacking":"Tacking" };
SailSettingDisplayName = { "stop":"Stop", "anchor":"Anchor", "battle":"Battle", "normal":"Normal" };

function SelectedShipViewModel() {
    this.name = ko.observable("Destroyer");
    this.status = ko.observable("Wind in sails");
    this.speed = ko.observable("4 knots");
    this.sailSetting = ko.observable("Stop");
    this.speedRating = ko.observable("Light Slow");
    this.crewGrade = ko.observable("A");

    this.selectedShip = function(galleon, windSpeed) {
      this.name( galleon.name );
      this.status( StatusDisplayName[galleon.status] );
      this.sailSetting( SailSettingDisplayName[galleon.sailSetting] );
      var speedMPerTurn = galleon.speedMPerTurn(windSpeed);
      var knots = speedMPerTurn * 0.001 * 30 * 0.54;    // 2 minutes per turn, 1km = 0.54nm
      this.speed( knots + " knots, " + speedMPerTurn + "m/turn" );
    };
}

uk.co.markpurser.selectedShipViewModel = new SelectedShipViewModel();

// Activates knockout.js
ko.applyBindings(uk.co.markpurser.selectedShipViewModel);
