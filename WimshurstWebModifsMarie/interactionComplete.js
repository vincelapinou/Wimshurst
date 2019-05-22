"use strict"

function onMouseDown(event,raycaster,pickingData,screenSize,camera) {
	console.log('onMouse down');
	// Gestion du picking
    if( pickingData.enabled==true ) { // activation si la touche CTRL est enfoncée
		console.log('entered the onMouseDown Function');
        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;
		console.log(x,y);
        // Calcul d'un rayon passant par le point (x,y)
        //  c.a.d la direction formé par les points p de l'espace tels que leurs projections sur l'écran par la caméra courante soit (x,y).
        raycaster.setFromCamera(new THREE.Vector2(x,y),camera);

        // Calcul des interections entre le rayon et les objets passés en paramètres
        const intersects = raycaster.intersectObjects( pickingData.selectableObjects );
		console.log(intersects[0])
        const nbrIntersection = intersects.length;
		console.log(nbrIntersection);
        if( nbrIntersection>0 ) {

            // Les intersections sont classés par distance le long du rayon. On ne considère que la première.
            const intersection = intersects[0];

            // Sauvegarde des données du picking
            pickingData.selectedObject = intersection.object; // objet selectionné
            pickingData.selectedPlane.p = intersection.point.clone(); // coordonnées du point d'intersection 3D
            pickingData.selectedPlane.n = camera.getWorldDirection(new THREE.Vector3()).clone(); // normale du plan de la caméra

            pickingData.enableDragAndDrop = true;
        }
    }

}


function onMouseUp(event,pickingData) {
    pickingData.enableDragAndDrop = false;
}

function onMouseMove( event, pickingData, screenSize, camera, sceneGraph ) {
	// Gestion du drag & drop
	
    if( pickingData.enableDragAndDrop==true) {
	console.log("mousemove");
		// Coordonnées de la position de la souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;
        // Projection inverse passant du point 2D sur l'écran à un point 3D
        const selectedPoint = Vector3(x, y, 0.5 /*valeur de z après projection*/ );
        selectedPoint.unproject( camera );

        // Direction du rayon passant par le point selectionné
        const p0 = camera.position;
        const d = selectedPoint.clone().sub( p0 );

        // Intersection entre le rayon 3D et le plan de la camera
        const p = pickingData.selectedPlane.p;
        const n = pickingData.selectedPlane.n;
        // tI = <p-p0,n> / <d,n>
        const tI = ( (p.clone().sub(p0)).dot(n) ) / ( d.dot(n) );
        // pI = p0 + tI d
        const pI = (d.clone().multiplyScalar(tI)).add(p0); // le point d'intersection

        // Translation à appliquer
        const translation = pI.clone().sub( p );

        // Translation de l'objet et de la représentation visuelle
        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
		const xDrop = pickingData.selectedObject.position.x;
		const yDrop = pickingData.selectedObject.position.y;
		const sphere = sceneGraph.getObjectByName("sphereManivelle");
		const xC = sphere.position.x;
		const yC = sphere.position.y;
        const zC = sphere.position.z;
		const norme = Math.sqrt((xDrop-xC)*(xDrop-xC) + (yDrop-yC)*(yDrop-yC));
        console.log(xDrop, yDrop, xC,yC, zC, norme);
		pickingData.selectedObject.position.set(xC+(xDrop-xC)/(norme)*3,yC+(yDrop-yC)/(norme)*3,zC);
		
		
		const levier = sceneGraph.getObjectByName("crankMobile");
		const p1 = [xC,yC,zC];
        console.log(levier);
		const p2 = [pickingData.selectedObject.position.x,pickingData.selectedObject.position.y,0];
        console.log(p1,p2);
		barBetween(p2,p1,levier);
		
        pickingData.selectedPlane.p.add( translation );


    }

}