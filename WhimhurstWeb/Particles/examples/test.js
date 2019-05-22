"use strict";

function generateSpark(sceneThreeJs) {
	var particleSystem = new THREE.GPUParticleSystem( {
				maxParticles: 10000
			} );
	sceneThreeJs.add(particleSystem);
	var options = {
				position: new THREE.Vector3(),
				positionRandomness: .1,
				velocity: new THREE.Vector3(),
				velocityRandomness: .1,
				color: 0xaa88ff,
				colorRandomness: .2,
				turbulence: .5,
				lifetime: 1,
				size: 3,
				sizeRandomness: 0.1
			};

		var spawnerOptions = {
				spawnRate: 500000,
				horizontalSpeed: 0.1,
				verticalSpeed: 0,
				timeScale: 0.5
			};
		var delta = clock.getDelta() * spawnerOptions.timeScale;

			tick += delta;

			

			if ( delta > 0 && options.position.x<=2) {

				options.position.x = tick * spawnerOptions.horizontalSpeed*300-2;
				options.position.y = 0;
				options.position.z = 5;

				for ( var x = 0; x < spawnerOptions.spawnRate * delta; x ++ ) {

					// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
					// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below

					particleSystem.spawnParticle( options );

				}

			}

			particleSystem.update( tick );
	

}