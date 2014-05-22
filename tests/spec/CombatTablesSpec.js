
describe('CombatTables.speedMPerTurn', function() {
  it('should return 144 when sails are set to battle and wind speed is 3', function() {
    expect(uk.co.markpurser.CombatTables.speedMPerTurn('battle', 3)).toEqual(144);
  });
});

describe('CombatTables.speedMPerTurn', function() {
  it('should return 528 when sails are set to normal and wind speed is 4', function() {
    expect(uk.co.markpurser.CombatTables.speedMPerTurn('normal', 4)).toEqual(528);
  });
});

describe("CombatTables.speedMPerTurn", function() {
  it("should throw an exception if wind speed < 0", function() {
    expect(function() {
      uk.co.markpurser.CombatTables.speedMPerTurn('battle', -1);
    }).toThrowError("Wind speed out of range");
  });
});

describe("CombatTables.speedMPerTurn", function() {
  it("should throw an exception if wind speed > 5", function() {
    expect(function() {
      uk.co.markpurser.CombatTables.speedMPerTurn('battle', 6);
    }).toThrowError("Wind speed out of range");
  });
});

describe("CombatTables.speedMPerTurn", function() {
  it("should not throw an exception if wind speed in range 0 -> 5", function() {
    expect(function() {
      uk.co.markpurser.CombatTables.speedMPerTurn('battle', 4);
    }).not.toThrowError("Wind speed out of range");
  });
});

describe("CombatTables.speedMPerTurn", function() {
  it("should throw an exception if sail setting is not one of the predefined types", function() {
    expect(function() {
      uk.co.markpurser.CombatTables.speedMPerTurn('weird_sail', 4);
    }).toThrowError("Invalid sail setting");
  });
});
