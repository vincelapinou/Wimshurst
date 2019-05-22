"use strict";

function createCylinder(name,position,radius,height){ // creer une sphere rouge dont les coordonnées seront position
	const CGeometry = new THREE.CylinderGeometry(radius,radius,height,8);
    const textureLoader = new THREE.TextureLoader();
   const textureCylinder = textureLoader.load('golden.jpg');
    
    const materialCylinder = new THREE.MeshLambertMaterial( { map: textureCylinder }); //new THREE.Color("rgb(255, 0, 0)"));
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
    
    const materialCylinder = new THREE.MeshLambertMaterial(MaterialRGB(192,192,192)); //new THREE.MeshLambertMaterial(new THREE.Color("rgb(0, 255, 0)"));
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
    
    const materialCylinder = new THREE.MeshLambertMaterial({ map: textureCylinder });//new THREE.MeshLambertMaterial(new THREE.Color("rgb(0, 0, 255)"));
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
    const materialBox= new THREE.MeshLambertMaterial({ map: textureBox });//new THREE.MeshLambertMaterial(new THREE.Color("rgb(0, 100, 0)"));
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
    const materialSphere = new THREE.MeshLambertMaterial({ map: textureSphere }); //new THREE.MeshLambertMaterial(new THREE.Color("rgb(255, 150, 0)"));//
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
function barBetween(p1,p2,barre){
	barre.position.set((p1[0]+p2[0])/2,(p1[1]+p2[1])/2,(p1[2]+p2[2])/2);
	const angle = Math.atan(-(p1[0]-p2[0])/(p1[1]-p2[1]));
	barre.rotation.z = angle;
}
