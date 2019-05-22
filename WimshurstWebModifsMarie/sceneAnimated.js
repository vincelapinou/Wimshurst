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
	
	const frontCy = createCylinderTransparent("frontCy",Vector3(0,0,0.5),10,0.1);
	const backCy = createCylinderTransparent("backCy",Vector3(0,0,-0.5),10,0.1);
	const verticalFrontCy = createCylinder("verticalFrontCy",Vector3(0,-5.2,0.6),0.5,10.4);
	const verticalBackCy = createCylinder("verticalBackCy",Vector3(0,-5.2,-0.6),0.5,10.4);
	const plan = createBox(22,10,1,Vector3(0,-10.4,0),0, "plan");
    const sparkSource1 = createSphere("sparkSource1",Vector3(-2,0,5),1);
    const sparkSource2 = createSphere("sparkSource2",Vector3(2,0,5),1);
    const sphereManivelle= createSphere("sphereManivelle",Vector3(0,-5,2.2),0.5);
    const crankFix = createCylinder("crankFix",Vector3(0,-5,1.25),0.5,1.5);
    const crankMobile = createCylinder("crankMobile",Vector3(1.5,0,0),0.5,3);
    const verticalSideRCy = createCylinder("verticalSideRCy",Vector3(-7,-5.2,2),1,9.5);
    const verticalSideLCy = createCylinder("verticalSideLCy",Vector3(7,-5.2,2),1,9.5);
	plan.rotateX(Math.PI/2);
	sceneGraph.add(verticalFrontCy);
	sceneGraph.add(verticalBackCy);
	sceneGraph.add(frontCy);
	sceneGraph.add(backCy);
    sceneGraph.add(plan);
	sceneGraph.add(sparkSource1);
    sceneGraph.add(sparkSource2);
    sceneGraph.add(sphereManivelle);
    sceneGraph.add(crankFix);
    sceneGraph.add(verticalSideRCy);
    sceneGraph.add(verticalSideLCy);
    crankMobile.rotateZ(Math.PI/2);
    sphereManivelle.add(crankMobile);
    
	const cylinder = sceneGraph.getObjectByName("verticalFrontCy");
    	// Rotation du cylinder
    	cylinder.setRotationFromAxisAngle(Vector3(0,1,0),Math.PI/2); // rotation de l'objet
	const cylinder2 = sceneGraph.getObjectByName("verticalBackCy");
    	// Rotation du cylinder
    	cylinder2.setRotationFromAxisAngle(Vector3(0,1,0),Math.PI/2);
    // rotation de l'objet
    const cylinder3 = sceneGraph.getObjectByName("verticalSideRCy");
    	// Rotation du cylinder
    	cylinder3.setRotationFromAxisAngle(Vector3(0,1,0),Math.PI/2);
    const cylinder4 = sceneGraph.getObjectByName("verticalSideLCy");
    	// Rotation du cylinder
    	cylinder4.setRotationFromAxisAngle(Vector3(0,1,0),Math.PI/2);
	const cylinder5 = sphereManivelle.getObjectByName("crankMobile");
    	cylinder5.setRotationFromAxisAngle(Vector3(0,0,1), Math.PI/2);
    // arcs des balais
    const circleRadius = 0.4;
    let circleShape=new THREE.Shape();
    circleShape.moveTo(0,circleRadius);
    circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
	circleShape.quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius );
	circleShape.quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 );
	circleShape.quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );
    let points=[];
    for (let t=0.05;t<Math.PI/2-Math.PI/15;t=t+Math.PI/50){
        points.push(new THREE.Vector3(5*Math.cos(t),0,5*Math.sin(t)));
    }
    const spline= new THREE.CatmullRomCurve3(points);
    const extrudeSettings = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: spline
	}
    const extrudeGeometry = new THREE.ExtrudeBufferGeometry( circleShape, extrudeSettings);
    const extrudeObject = new THREE.Mesh( extrudeGeometry, MaterialRGB(0.0,0.0,0.0) ) ;
	extrudeObject.position.set(0,0,0);
	extrudeObject.name = "arc";
    sceneGraph.add( extrudeObject );
    let points2=[];
    for (let t=0.05;t<Math.PI/2-Math.PI/15;t=t+Math.PI/50){
        points2.push(new THREE.Vector3(-5*Math.cos(t),0,5*Math.sin(t)));
    }
    const spline2= new THREE.CatmullRomCurve3(points2);
    const extrudeSettings2 = {
	steps: 150,
	bevelEnabled: false,
	extrudePath: spline2
	}
    const extrudeGeometry2 = new THREE.ExtrudeBufferGeometry( circleShape, extrudeSettings2);
    const extrudeObject2 = new THREE.Mesh( extrudeGeometry2, MaterialRGB(0.0,0.0,0.0) ) ;
	extrudeObject2.position.set(0,0,0);
	extrudeObject2.name = "arc2";
    sceneGraph.add( extrudeObject2 );
    
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
     
	const sphereManivelle = sceneThreeJs.sceneGraph.getObjectByName("sphereManivelle");
    /*//difficult rotation 
    // Translation inverse
	const Tinv = new THREE.Matrix4().makeTranslation(0,5,-2.2);

	//Rotation
	const R = new THREE.Matrix4().makeRotationAxis(new Vector3(0,0,1), 0.01);

	// Translation pour replacer l'objet à sa position initiale
	const T = new THREE.Matrix4().makeTranslation(0,-5,2.2);

	const M_objet = new THREE.Matrix4().multiply(T).multiply(R).multiply(Tinv);
    //const M_objet = new THREE.Matrix4().multiply(R);

	sphereManivelle.applyMatrix(M_objet);*/
    sphereManivelle.rotation.z+=0.05;
    
    const frontCy = sceneThreeJs.sceneGraph.getObjectByName("frontCy");
    frontCy.rotation.y+=0.1;
    const backCy = sceneThreeJs.sceneGraph.getObjectByName("backCy");
    backCy.rotation.y-=0.1;
    generateSpark(sceneThreeJs);
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


