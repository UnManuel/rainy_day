// by @unmanuel

/*
	Cloud

	A sprite-based cloud that remains on the scene until the camera reaches it.
*/

class Cloud {

	tag = "";		// Unique identifier
	fadeSpeed = 2;	// Cloud will materialize at this rate

	sprite = null;	// Sprite to be added to the scene
	cam = null;		// A camera to compare distances

	alive = true;	// Makes the cloud go back into the cloud pool
/*
	constructor

	Creates the cloud's sprite with the provided material.

	Params
	- material(SpriteMaterial): a material with a bitmap texture.
	- cam(PerspectiveCamera): the camera to be used for checkups.
	- tag(string = ""): must be set up to be found and updated.
*/
	constructor(material, cam, tag = "") {

		this.sprite = new THREE.Sprite(material);
		this.sprite.scale.set(4, 4, 1);

		this.cam = cam;

		this.tag = tag;
	}
/*
	Update

	It updates the cloud once per frame.

	Params
	- deltaTime(float): time in seconds between this frame and the previous one.
*/
	Update(deltaTime) {

		if(this.sprite.material.opacity < 1) {

			// The cloud fades in
			this.sprite.material.opacity += deltaTime * this.fadeSpeed;

			if(this.sprite.material.opacity > 1)
				this.sprite.material.opacity = 1;
		}
		
		if(this.sprite.position.z > this.cam.position.z)
			this.alive = false;	// Cloud is marked for retrieval
	}
}