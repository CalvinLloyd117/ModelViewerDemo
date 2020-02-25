/*LOADING SCRIPT ON LOAD*/

window.onload = init;

/*VARIABLES*/

var container;
var controls;
var camera;
var scene;
var renderer;
var placeModel;

animate();
render();

function init() {

    /*NEW SCENE*/

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-10, 0, 0);

    /*ORBIT CONTROLS*/

    controls = new THREE.OrbitControls(camera);
    controls.target.set(0, -0.2, -0.2);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    /*RENDERING CANVAS*/

    container = document.getElementById("3d_model");
    placeModel = document.getElementById("Place__Model");
    placeModel.appendChild(container);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    renderer.setClearColor(0x000000, 0);

    renderer.gammaOutput = true;
    renderer.gammaInput = true;

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    /*LIGHTS*/
    var hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 1);

    scene.add(hemiLight);


    /*LOADING MODEL*/
    var loader = new THREE.GLTFLoader();
    loader.load('models/Sheath/sheath.gltf',

        function(gltf) {

            scene.add(gltf.scene);

        });

}

/*CANVAS RESIZING*/
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

}

/*ANIMATING THE MODEL*/
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();

}