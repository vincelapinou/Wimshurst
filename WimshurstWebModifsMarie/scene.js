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
    
    // Les données associées au picking
    const pickingData = {
        descente:false,
		remontee:false,
		enabled: true,		// Mode picking en cours ou désactivé (CTRL enfoncé)
        enableDragAndDrop: false, // Drag and drop en cours ou désactivé
        selectableObjects: [],    // Les objets selectionnables par picking
        selectedObject: null,     // L'objet actuellement selectionné
        selectedPlane: {p:null,n:null}, // Le plan de la caméra au moment de la selection. Plan donné par une position p, et une normale n.
    }


    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph, pickingData);
    
	// à décommenter si modélisation expressive
    // *************************** //
    // Creation d'un lanceur de rayon (ray caster) de Three.js pour le calcul de l'intersection entre un objet et un rayon
    // *************************** //
    const raycaster = new THREE.Raycaster();
    // *************************** //
    // Fonction de rappels
    // *************************** //

    // Récupération de la taille de la fenetre en tant que variable à part
    const screenSize = {
        w:sceneThreeJs.renderer.domElement.clientWidth,
        h:sceneThreeJs.renderer.domElement.clientHeight
    };
    // Fonction à appeler lors du clic de la souris: selection d'un objet
    //  (Création d'un wrapper pour y passer les paramètres souhaités)
    
    
    const wrapperMouseUp = function(event) { onMouseUp(event,pickingData); };
    document.addEventListener( 'mouseup', wrapperMouseUp );
    
	const wrapperMouseDown = function(event) { onMouseDown(event,raycaster,pickingData,screenSize,sceneThreeJs.camera); };
    document.addEventListener( 'mousedown', wrapperMouseDown );
    
    // Fonction à appeler lors du déplacement de la souris: translation de l'objet selectionné
    const wrapperMouseMove = function(event) { onMouseMove(event, pickingData, screenSize, sceneThreeJs.camera,sceneThreeJs.sceneGraph) };
    document.addEventListener( 'mousemove', wrapperMouseMove );

    // *************************** //
    // Lancement de l'animation
    // *************************** //
    //interaction(sceneThreeJs);
    animationLoop(sceneThreeJs,pickingData); //si modélisation expressive
	
} 

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph,pickingData) {
	
	const frontCy = createCylinderTransparent("frontCy",Vector3(0,0,0.5),10,0.1);
	const backCy = createCylinderTransparent("backCy",Vector3(0,0,-0.5),10,0.1);
	const verticalFrontCy = createCylinder("verticalFrontCy",Vector3(0,-5.2,0.6),0.5,10.4);
	const verticalBackCy = createCylinder("verticalBackCy",Vector3(0,-5.2,-0.6),0.5,10.4);
	const plan = createBox(22,10,1,Vector3(0,-10.4,0),0, "plan");
    const sparkSource1 = createSphere("sparkSource1",Vector3(-2,0,5),1);
    const sparkSource2 = createSphere("sparkSource2",Vector3(2,0,5),1);
    const sphereManivelle= createSphere("sphereManivelle",Vector3(0,-5,2.2),0.5);
    const sphereBoutLevier=createSphere("sphereBoutLevier",Vector3(3,-5,2.2),0.7);
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
    sceneGraph.add(sphereBoutLevier);
    crankMobile.rotateZ(Math.PI/2);
    sphereManivelle.add(crankMobile);
    pickingData.selectableObjects.push(sphereBoutLevier);
	console.log(pickingData.selectableObjects);
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

function animate(sceneThreeJs, time, pickingData) {

    const t = time/1000;//time in second
     
    render(sceneThreeJs);
}
function animationLoop(sceneThreeJs, pickingData) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(sceneThreeJs,timeStamp, pickingData); // appel de notre fonction d'animation
            animationLoop(sceneThreeJs, pickingData); // relance une nouvelle demande de mise à jour
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
	//sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera,sceneThreeJs.renderer.domElement);

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
function barBetween(p1,p2,barre){
	barre.position.set((p1[0]+p2[0])/2,(p1[1]+p2[1])/2,(p1[2]+p2[2])/2);
	const angle = Math.atan(-(p1[0]-p2[0])/(p1[1]-p2[1]));
	barre.rotation.z = angle;
}
// Creation de repères visuels indiquants les axes X,Y,Z entre [-1,1]
function initFrameXYZ( sceneGraph ) {

    const rCylinder = 0.01;
    const rCone = 0.04;
    const alpha = 0.1;

    // Creation des axes
    const axeXGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(1,0,0), rCylinder, rCone, alpha);
    const axeX = new THREE.Mesh(axeXGeometry, MaterialRGB(1,0,0));

    const axeYGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(0,1,0), rCylinder, rCone, alpha);
    const axeY = new THREE.Mesh(axeYGeometry, MaterialRGB(0,1,0));

    const axeZGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(0,0,1), rCylinder, rCone, alpha);
    const axeZ = new THREE.Mesh(axeZGeometry, MaterialRGB(0,0,1));

    axeX.receiveShadow = true;
    axeY.receiveShadow = true;
    axeZ.receiveShadow = true;

    sceneGraph.add(axeX);
    sceneGraph.add(axeY);
    sceneGraph.add(axeZ);

    // Sphère en (0,0,0)
    const rSphere = 0.05;
    const sphereGeometry = primitive.Sphere(Vector3(0,0,0), rSphere);
    const sphere = new THREE.Mesh(sphereGeometry, MaterialRGB(1,1,1));
    sphere.receiveShadow = true;
    sceneGraph.add(sphere);



    // Creation des plans
    const L = 1;
    const planeXYGeometry = primitive.Quadrangle(Vector3(0,0,0), Vector3(L,0,0), Vector3(L,L,0), Vector3(0,L,0));
    const planeXY = new THREE.Mesh(planeXYGeometry, MaterialRGB(1,1,0.7));

    const planeYZGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,L,0),Vector3(0,L,L),Vector3(0,0,L));
    const planeYZ = new THREE.Mesh(planeYZGeometry,MaterialRGB(0.7,1,1));

    const planeXZGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,0,L),Vector3(L,0,L),Vector3(L,0,0));
    const planeXZ = new THREE.Mesh(planeXZGeometry,MaterialRGB(1,0.7,1));

    planeXY.receiveShadow = true;
    planeYZ.receiveShadow = true;
    planeXZ.receiveShadow = true;


    sceneGraph.add(planeXY);
    sceneGraph.add(planeYZ);
    sceneGraph.add(planeXZ);

}


