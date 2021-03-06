

StatusDisplayName = { "windinsails":"Wind In Sails", "inirons":"In Irons", "tacking":"Tacking" };
SailSettingDisplayName = { "stop":"Stop", "anchor":"Anchor", "battle":"Battle", "normal":"Normal" };
SpeedRatingDisplayName = { "heavyslow":"Heavy Slow", "heavyfast":"Heavy Fast", "lightslow":"Light Slow", "lightfast":"Light Fast" };
CrewGradeDisplayName = { "A":"A", "B":"B", "C":"C", "D":"D", "E":"E" };
MoveActionDisplayName = { "stop":"Stop", "reducespeed":"Reduce Speed", "anchoring":"Anchoring", "rotateatanchor":"Rotate At Anchor",
                          "makesternway":"Make Sternway", "changesail":"Change Sail Setting" };

function KnockoutViewModel() {
    this.name = ko.observable("Destroyer");
    this.status = ko.observable("Wind in sails");
    this.speed = ko.observable("4 knots");
    this.sailSetting = ko.observable("Stop");
    this.speedRating = ko.observable("Light Slow");
    this.crewGrade = ko.observable("A");
    this.remainingMovement = ko.observable("100");

    this.selectShipDropDownOptions = ko.observableArray();
    this.selectShipDropDownValue = ko.observable();

    this.moveActionDropDownOptions = _.values(MoveActionDisplayName);
    this.moveActionDropDownValue = ko.observable();

    this.engine = {};
    this.updateSelectedGalleonCallback = {};

    this.selectShipDropDownClicked = function() {
      this.updateSelectedGalleonCallback.apply(this.engine, [this.selectShipDropDownValue()]);
    };

    this.populateSelectShipDropDown = function(galleonList) {
      self = this;
      _.each(galleonList, function(galleonItem) {
        self.selectShipDropDownOptions.push(galleonItem);
      });
    }

    this.selectedShip = function(galleon, windSpeed) {

      var speedMPerTurn = galleon.speedMPerTurn(windSpeed);
      var knots = speedMPerTurn * 0.001 * 30 * 0.54;    // 2 minutes per turn, 1km = 0.54nm

      this.name( galleon.name );
      this.status( StatusDisplayName[galleon.status] );
      this.speed( knots + " knots, " + speedMPerTurn + "m/turn" );
      this.sailSetting( SailSettingDisplayName[galleon.sailSetting] );
      this.speedRating( SpeedRatingDisplayName[galleon.speedRating] );
      this.crewGrade( CrewGradeDisplayName[galleon.crewGrade] );
      this.remainingMovement( galleon.remainingMovement );

      this.selectShipDropDownValue( galleon.name );
    };
}

uk.co.markpurser.knockoutViewModel = new KnockoutViewModel();

// Activates knockout.js
ko.applyBindings(uk.co.markpurser.knockoutViewModel);
