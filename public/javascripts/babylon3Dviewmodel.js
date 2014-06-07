

function Babylon3DViewModel() {
}

Babylon3DViewModel.prototype.start = function() {

    var startFormation =  [ { name:"Ark",       x:1,  y:1  },
                            { name:"Elizabeth", x:8,  y:7  },
                            { name:"Antelope",  x:10, y:4  },
                            { name:"Nonpareil", x:11, y:6  },
                            { name:"Hope",      x:13, y:8  },
                            { name:"Swiftsure", x:14, y:5  },
                            { name:"Swallow",   x:15, y:9  } ];
    var galleonRenderList = {};


    var squaresize = 50;
    var halfsquaresize = squaresize/2;

    var windHeading = Math.PI;

    var camera;

    var pressed = false;
    var pressMarker = { x: 0, y: 0 };
    var mousePos = { x: 0, y: 0 };

    function onMouseDown(e) {
        pressed = true;
        pressMarker.x = camera.position.x + e.offsetX;
        pressMarker.y = camera.position.z - e.offsetY;
    }

    function onMouseUp(e) {
        pressed = false;
    }

    function onMouseMove(e) {
        //stats.innerHTML = "X: " + e.offsetX + "<br>" +
        //                  "Y: " + e.offsetY + "<br>";
        if(pressed) {
            camera.position.x = -e.offsetX + pressMarker.x;
            camera.position.z = e.offsetY + pressMarker.y;
        }

        mousePos.x = e.offsetX;
        mousePos.y = e.offsetY;
    }

    function onMouseWheel(e) {
        var evt=window.event || e //equalize event object
        var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
        //stats.innerHTML = "Wheel: " + delta + "<br>";
        camera.position.y -= delta;
    }

    function beforeRender() {

        var pm = camera.getProjectionMatrix();
        var vm = camera.getViewMatrix();
        var wm = BABYLON.Matrix.Identity();
        var gridIntersect = {};
        var viewportWidth = scene.getEngine().getRenderWidth() * scene.getEngine().getHardwareScalingLevel();
        var viewportHeight = scene.getEngine().getRenderHeight() * scene.getEngine().getHardwareScalingLevel();
        var myRay = BABYLON.Ray.CreateNew( mousePos.x, mousePos.y, viewportWidth, viewportHeight, wm, vm, pm );
        gridIntersect.x = myRay.origin.x + myRay.direction.x * -myRay.origin.y/myRay.direction.y;
        gridIntersect.z = myRay.origin.z + myRay.direction.z * -myRay.origin.y/myRay.direction.y;

        _.each( galleonRenderList, function(galleon) {
            _.each( galleon.meshes, function(item) {
                item.position.x = halfsquaresize + squaresize * galleon.gridx;
                item.position.z = halfsquaresize + squaresize * galleon.gridy;
                item.position.y = 0;

                var s = Math.sin(galleon.heading);
                var c = Math.cos(galleon.heading);
                item.rotation.x = 0;
                item.rotation.z = 0;
                item.rotation.y = galleon.heading;

                item.material.backFaceCulling = false;
            });
            galleon.alpha += 0.01;
        });
    };


    if (BABYLON.Engine.isSupported()) {
        console.log('Babylon engine supported');
        var canvas = document.getElementById("renderCanvas");
        var babylonengine = new BABYLON.Engine(canvas, true);
        var scene = new BABYLON.Scene(babylonengine);
        scene.ambientColor = new BABYLON.Color3(0.8,0.8,0.7);
        camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(900, 800, 400), scene);
        camera.rotation.x=Math.PI/2.1;
        camera.rotation.y=0.005;
        camera.maxZ = 2000;
        var directional = new BABYLON.DirectionalLight("directional", new BABYLON.Vector3(-1, -1, 0), scene);

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mousemove", onMouseMove);

        // mouse wheel
        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
        if (document.attachEvent) //if IE (and Opera depending on user setting)
            document.attachEvent("on"+mousewheelevt, onMouseWheel)
        else if (document.addEventListener) //WC3 browsers
            document.addEventListener(mousewheelevt, onMouseWheel, false)

        uk.co.markpurser.GameGrid.generate(scene, squaresize);

        BABYLON.SceneLoader.ImportMesh( "", "", "sailing_ship.babylon", scene, function (newMeshes, particleSystems) {
           // printObject(newMeshes[0]);

            _.each( startFormation, function(startForm) {
                var clonedMesh = [];
                newMeshes.map( function(item) {
                    clonedMesh.push( item.clone() );
                });
                galleonRenderList[startForm.name] = { gridx:startForm.x, gridy:startForm.y, heading:0, meshes:clonedMesh };
            });

            var t = 0;
            scene.beforeRender = beforeRender;
        });

        var background0 = new BABYLON.Layer("back0", "bkgrnd_gradient.png", scene);

        // Render loop
        var renderLoop = function () {
            scene.render();
        };

        // Launch render loop
        babylonengine.runRenderLoop(renderLoop);

    }
    else {
        console.log('Babylon engine NOT supported');
    }
}


uk.co.markpurser.babylon3DViewModel = new Babylon3DViewModel();

