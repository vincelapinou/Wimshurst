"use strict";

function interaction(sceneThreeJs){ //ajoute les evenements à la scene

const onMouseUpFunction = function(event) { onMouseUp(sceneThreeJs); };
window.addEventListener('mouseup', onMouseUpFunction);

const onMouseDownFunction = function(event) { onMouseDown(sceneThreeJs); };
window.addEventListener('mousedown', onMouseDownFunction);

const onMouseMoveFunction = function(event) { onMouseMove(sceneThreeJs); };
window.addEventListener('mousemove', onMouseMoveFunction);

}

function onMouseDown(sceneThreeJs) {
    console.log('Mouse down');  

}

// Fonction appelée lors du relachement de la souris
function onMouseUp(sceneThreeJs) {
    console.log('Mouse up');
}

// Fonction appelée lors du déplacement de la souris
function onMouseMove(sceneThreeJs) {
	
    const xPixel = event.clientX;
    const yPixel = event.clientY;
	
	const x = xPixel - window.innerWidth/2;
	const y = -yPixel + window.innerHeight/2;
	
	const angle = Math.atan(x/y);
    
    
    // animation of the crank TO BE FIXED
	const sphereManivelle = sceneThreeJs.sceneGraph.getObjectByName("sphereManivelle");
    //difficult rotation 
    // Translation inverse
	const Tinv = new THREE.Matrix4().makeTranslation(0,5,-2.2);

	//Rotation
	const R = new THREE.Matrix4().makeRotationAxis(new Vector3(0,0,1), 0.01);

	// Translation pour replacer l'objet à sa position initiale
	const T = new THREE.Matrix4().makeTranslation(0,-5,2.2);

	const M_objet = new THREE.Matrix4().multiply(T).multiply(R).multiply(Tinv);
    //const M_objet = new THREE.Matrix4().multiply(R);

	sphereManivelle.applyMatrix(M_objet);
    const frontCy = sceneThreeJs.sceneGraph.getObjectByName("frontCy");
    frontCy.rotation.y+=0.1;
    const backCy = sceneThreeJs.sceneGraph.getObjectByName("backCy");
    backCy.rotation.y-=0.1;
    
    generateSpark(sceneThreeJs); // was in animate before... 
	//render(sceneThreeJs);
   
}