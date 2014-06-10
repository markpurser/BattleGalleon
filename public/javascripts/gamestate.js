(function(window) {

    function GameState() {
        this.startFormation =  [ { name:"Ark",       x:19,  y:21  },
                                 { name:"Elizabeth", x:18,  y:17  },
                                 { name:"Antelope",  x:20, y:19  },
                                 { name:"Nonpareil", x:21, y:21  },
                                 { name:"Hope",      x:23, y:24  },
                                 { name:"Swiftsure", x:24, y:20  },
                                 { name:"Swallow",   x:25, y:24  } ];
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

    GameState.prototype.galleonList = function() {
        return _.keys( this.galleonContainer );
    }

    GameState.prototype.euclideanDist = function(a, b) {
        return Math.sqrt( pow(a.x-b.x,2) + pow(a.y-b.y,2) );
    }

    GameState.prototype.getNameOfNearestGalleon = function(location) {
        var self = this;
        var nearest =_.min( self.startFormation, function(sfItem) {
            return sfItem.x;
            //var dist = euclideanDist(location, sfItem);
            //if(dist < minDist) minDist =  
        });

        return nearest.name;
    }


    window.GameState = GameState;

})(window);

