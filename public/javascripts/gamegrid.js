uk.co.markpurser.GameGrid = new function() {

    this.generate = function(scene,squaresize) {
        var plane = new BABYLON.Mesh("grid", scene);
        var material = new BABYLON.StandardMaterial("gridmat", scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        material.specularPower = 0;
       // material.wireframe = true;
        plane.material = material;

        plane.visibility = 0.06;

        var indices = [];
        var positions = [];
        var normals = [];

        // Vertices
        var gridsize = 40;  // must be even
        var boardsize = squaresize * gridsize;

        for( var i in _.range(gridsize+1) ) {
            for( var j in _.range(gridsize+1) ) {
                positions.push(j*squaresize, 0, i*squaresize);
                normals.push(0, 1.0, 0);
            }
        }

        // Indices
        var gridsizeDivTwo = gridsize/2;
        var currentVert = 0;
        var lineFlip = 2;
        for( var i in _.range(gridsize) ) {
            for( var j in _.range(gridsizeDivTwo) ) {
                indices.push(currentVert);
                indices.push(currentVert+1);
                indices.push(currentVert+2+gridsize);

                indices.push(currentVert);
                indices.push(currentVert+2+gridsize);
                indices.push(currentVert+1+gridsize);
                currentVert += 2;
            }
            currentVert += lineFlip;
            lineFlip = lineFlip == 2 ? 0 : 2;
        }

        plane.setVerticesData(positions, BABYLON.VertexBuffer.PositionKind);
        plane.setVerticesData(normals, BABYLON.VertexBuffer.NormalKind);
        plane.setIndices(indices);

        return plane;
    }

}
