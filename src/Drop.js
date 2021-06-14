// by @unmanuel

/*
	Drop

	A single raindrop that falls from a generator to the bottom of the scene.
*/

class Drop {

	tag = "";		// Unique identifier
	sprite = null;	// Sprite to be added to the scene
	speed = null;	// Fall speed
	alive = true;	// Makes the drop go back into the generator pool
/*
	constructor

	Creates the drop's sprite with the provided material.

	Params
	- material(SpriteMaterial): a material with a bitmap texture.
	- tag(string = ""): must be set up to be found by the generator.
*/
	constructor(material, tag = "") {
		
		this.sprite = new THREE.Sprite(material);
		this.sprite.scale.set(0.2, 2, 1);

		this.tag = tag;

		this.speed = new THREE.Vector3(10, -20, 0);
	}
/*
	Update

	It makes the drop fall once per frame.

	Params
	- deltaTime(float): time in seconds between this frame and the previous one.
*/
	Update(deltaTime) {
		
		this.sprite.position.x += deltaTime * this.speed.x;
		this.sprite.position.y += deltaTime * this.speed.y;

		if(this.sprite.position.y < -10)
			this.alive = false; // Drop is removed at the bottom's reach
	}
}