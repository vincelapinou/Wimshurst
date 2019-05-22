"use strict";

function generateSpark(sceneThreeJs) {
	const particleSystem = new THREE.GPUParticleSystem( {
				maxParticles: 10000
			} );
    particleSystem.name='particleSystem';
	sceneThreeJs.sceneGraph.add(particleSystem);
	const options = {
				position: new THREE.Vector3(),
				positionRandomness: .1,
				velocity: new THREE.Vector3(),
				velocityRandomness: .1,
				color: 0xaa88ff,
				colorRandomness: .2,
				turbulence: 0,
				lifetime: 100,
				size: 20,
				sizeRandomness: 0.1
			};

		const spawnerOptions = {
				spawnRate: 10000,
				horizontalSpeed: 10000,
				verticalSpeed: 0,
				timeScale: 1
			};
		const delta = clock.getDelta() * spawnerOptions.timeScale;

			tick += delta;

			

		if ( delta > 0 && options.position.x<=2) {

				options.position.x = tick * spawnerOptions.horizontalSpeed*0.000292-2;
				options.position.y = 0;
				options.position.z = 5;
				particleSystem.update( tick );
				for ( let x = 0; x < spawnerOptions.spawnRate * delta; x ++ ) {

					// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
					// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
					if (options.position.x<2){
						particleSystem.spawnParticle( options );
                    }

				}
               	//	options.position.x=-2;

		}
    		

		particleSystem.update( tick );
		if (options.position.x>=2){
		sceneThreeJs.sceneGraph.remove(particleSystem);
		render();
		}

		

}