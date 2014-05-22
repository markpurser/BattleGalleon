
uk.co.markpurser.CombatTables = new function() {

    // Lookup keyed on sail setting and wind speed (0 -> 5)
    this.speedLookup = { "stop":[ 0, 0, 0, 0, 0, 0 ],
                         "anchor":[ 0, 0, 0, 0, 0, 0 ],
                         "battle":[ 0, 96, 120, 144, 264, 216 ],
                         "normal":[ 0, 192, 240, 288, 528, 432 ] };

    this.speedMPerTurn = function( sailSetting, windSpeed ) {
        return this.speedLookup[sailSetting][windSpeed];
    }

}
