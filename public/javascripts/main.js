
uk = { co:{ markpurser:{} } };

uk.co.markpurser.BattleGalleon = new function() {

    var squaresize = 50;
    var halfsquaresize = squaresize/2;

    var windHeading = Math.PI;

    var camera;

    var pressed = false;
    var pressMarker = { x: 0, y: 0 };
    var mousePos = { x: 0, y: 0 };

    this.main = function() {

        console.log('Running script');

        this.engine = new Engine();
        this.engine.start();


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

                var t = 0;
                scene.beforeRender = function() {

                    var pm = camera.getProjectionMatrix();
                    var vm = camera.getViewMatrix();
                    var wm = BABYLON.Matrix.Identity();
                    var gridIntersect = {};
                    var viewportWidth = scene.getEngine().getRenderWidth() * scene.getEngine().getHardwareScalingLevel();
                    var viewportHeight = scene.getEngine().getRenderHeight() * scene.getEngine().getHardwareScalingLevel();
                    var myRay = BABYLON.Ray.CreateNew( mousePos.x, mousePos.y, viewportWidth, viewportHeight, wm, vm, pm );
                    gridIntersect.x = myRay.origin.x + myRay.direction.x * -myRay.origin.y/myRay.direction.y;
                    gridIntersect.z = myRay.origin.z + myRay.direction.z * -myRay.origin.y/myRay.direction.y;

                };
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


};