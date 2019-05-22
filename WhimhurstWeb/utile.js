"use strict";

function createCylinder(name,position,radius,height){ // creer une sphere rouge dont les coordonnées seront position
	const CGeometry = new THREE.CylinderGeometry(radius,radius,height,8);
    const textureLoader = new THREE.TextureLoader();
   const textureCylinder = textureLoader.load('golden.jpg');
    
    const materialCylinder = new THREE.MeshLambertMaterial({ map: textureCylinder });
	const cylinder = new THREE.Mesh(CGeometry,materialCylinder);
	cylinder.rotateX(Math.PI/2);
	cylinder.position.set(position.x, position.y,position.z);
	cylinder.castShadow = true;
	cylinder.name = name;
	return cylinder;
}
function createCylinderGrey(name,position,radius,height){ // creer une sphere rouge dont les coordonnées seront position
	const CGeometry = new THREE.CylinderGeometry(radius,radius,height,8);
    const textureLoader = new THREE.TextureLoader();
   const textureCylinder = textureLoader.load('golden.jpg');
    
    const materialCylinder = new THREE.MeshLambertMaterial(MaterialRGB(192,192,192));
	const cylinder = new THREE.Mesh(CGeometry,materialCylinder);
	cylinder.rotateX(Math.PI/2);
	cylinder.position.set(position.x, position.y,position.z);
	cylinder.castShadow = true;
	cylinder.name = name;
    cylinder.material.transparent=false;
    cylinder.material.opacity=1;
	return cylinder;
}
function createCylinderTransparent(name,position,radius,height){ // creer une sphere rouge dont les coordonnées seront position
	const CGeometry = new THREE.CylinderGeometry(radius,radius,height,8);
    const textureLoader = new THREE.TextureLoader();
   const textureCylinder = textureLoader.load('transparent.jpg');
    
    const materialCylinder = new THREE.MeshLambertMaterial({ map: textureCylinder });
	const cylinder = new THREE.Mesh(CGeometry,materialCylinder);
	cylinder.rotateX(Math.PI/2);
	cylinder.position.set(position.x, position.y,position.z);
	cylinder.castShadow = true;
	cylinder.name = name;
    cylinder.material.transparent=true;
    cylinder.material.opacity=0.2;
	return cylinder;
}
function createBox(length, width, depth, position,angle, name){
	const BGeometry = new THREE.BoxGeometry(length, width, depth);
    const textureLoader = new THREE.TextureLoader();
    const textureBox = textureLoader.load('wood.jpg');
    const materialBox= new THREE.MeshLambertMaterial({ map: textureBox });
	const box = new THREE.Mesh(BGeometry,materialBox )
    ;
	box.rotateZ(angle);
	box.position.set(position.x,position.y,position.z);
	box.castShadow = true;
	box.name = name;
	return box;
}
function createSphere(name,position,radius){
    const SGeometry = new THREE.SphereGeometry(radius);
    const textureLoader = new THREE.TextureLoader();
    const textureSphere = textureLoader.load('golden.jpg');
    const materialSphere = new THREE.MeshLambertMaterial({ map: textureSphere });
    const sphere = new THREE.Mesh(SGeometry,materialSphere);
    sphere.position.set(position.x,position.y,position.z);
    sphere.castShadow=true;
    sphere.name=name;
    return sphere;
}
function createBar(l, n ,position,angle){
	const BGeometry = new THREE.BoxGeometry(1,l,0.2);
	const barre = new THREE.Mesh(BGeometry,MaterialRGB(1,1,1) );
	barre.rotateZ(angle);
	barre.position.set(position.x+l/2*Math.sin(angle),position.y-l/2*Math.cos(angle),position.z);
	barre.castShadow = true;
	barre.name = n;
	return barre;
}
