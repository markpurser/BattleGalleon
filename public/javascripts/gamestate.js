(function(window) {

    function GameState() {
        this.startFormation =  [ { name:"Ark",       x:4,  y:6  },
                                 { name:"Elizabeth", x:8,  y:7  },
                                 { name:"Antelope",  x:10, y:4  },
                                 { name:"Nonpareil", x:11, y:6  },
                                 { name:"Hope",      x:13, y:8  },
                                 { name:"Swiftsure", x:14, y:5  },
                                 { name:"Swallow",   x:15, y:9  } ];
        this.galleonContainer = {};
    }

    GameState.prototype.reset = function() {
        var self = this;
        _.each( self.startFormation, function(sfItem) {
            var clonedMesh = [];
         /*   newMeshes.map( function(item) {
                clonedMesh.push( item.clone() );
            });*/
            var galleon = new Galleon( sfItem.name, sfItem.x, sfItem.y, clonedMesh );
            self.galleonContainer[sfItem.name] = galleon;
        });
    }

    window.GameState = GameState;

})(window);

