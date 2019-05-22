"use strict";

var clock = new THREE.Clock(), tick=0;
main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null
    };
    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph);
	animationLoop(sceneThreeJs);
} 

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph) {
	const particleSystem = new THREE.GPUParticleSystem( {
				maxParticles: 2500000
			} );
    particleSystem.name='particleSystem';
	sceneGraph.add(particleSystem);
	
}
// Demande le rendu de la scène 3D

// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
    sceneThreeJs.controls = new THREE.TrackballControls( sceneThreeJs.camera, sceneThreeJs.renderer.domElement );
			sceneThreeJs.controls.rotateSpeed = 5.0;
			sceneThreeJs.controls.zoomSpeed = 2.2;
			sceneThreeJs.controls.panSpeed = 1;
			sceneThreeJs.controls.dynamicDampingFactor = 0.3;
}

function animate(sceneThreeJs, time) {

    const t = time/1000;//time in second
    const particleSystem = sceneThreeJs.sceneGraph.getObjectByName("particleSystem");
    const options = {
				position: new THREE.Vector3(-2,0,0),
				positionRandomness: 0,
				velocity: new THREE.Vector3(0.1,0,0),
				velocityRandomness: 0,
				color: 0xaa88ff,
				colorRandomness: .2,
				turbulence: 0,
				lifetime: 40,
				size: 3,
				sizeRandomness: 0.1
			};

	const spawnerOptions = {
				spawnRate: 50000,
				horizontalSpeed: 500,
				verticalSpeed: 0,
				timeScale: 0.0001
			};
    
    particleSystem.spawnParticle( options );

	particleSystem.update( tick );
    render(sceneThreeJs);
}
function animationLoop(sceneThreeJs) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(sceneThreeJs,timeStamp); // appel de notre fonction d'animation
            animationLoop(sceneThreeJs); // relance une nouvelle demande de mise à jour
        }

     );

}


// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene( );

    sceneThreeJs.camera = sceneInit.createCamera(0,8,30);
	sceneThreeJs.camera.lookAt(0,0,0);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(0,0,20));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);
	sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera,sceneThreeJs.renderer.domElement);

    const onResizeFunction = function(event) { onResize(sceneThreeJs); };
    window.addEventListener('resize', onResizeFunction );
}


// Fonction appelée lors du redimensionnement de la fenetre
function onResize(sceneThreeJs) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneThreeJs.camera.aspect = width / height;
    sceneThreeJs.camera.updateProjectionMatrix();

    sceneThreeJs.renderer.setSize(width, height);
}

function Vector3(x,y,z) {
    return new THREE.Vector3(x,y,z);
}

function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}


