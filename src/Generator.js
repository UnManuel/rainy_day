// by @unmanuel

/*
	Generator

	Placed somewhere on the scene, it emits the
	objects of its inner pool at random intervals.
*/

class Generator {

	position = null;	// Position where objects are to be emitted
	scene = null		// Scene to place objects
	pool = null;		// Object pool

	objectData = {};	// References to generated objects

	minDelay = 1;		// Minimum time before emitting a new object
	maxDelay = 2;		// Maximum time before emitting a new object

	time = 0;			// Internal clock
	maxTime = 0;		// Clock is reset when this value is reached

	enabled = true;		// Stops generating when false
/*
	constructor

	Params
	- position(Vector3): the generator position on the scene.
	- scene(Scene): the scene to place generated objects.
	- pool(object[]): an object pool that is shared with other generators.
*/
	constructor(position, scene, pool) {

		this.position = position;
		this.scene = scene;
		this.pool = pool;

		this.maxTime = this.minDelay + Math.random() * (this.maxDelay - this.minDelay);
		this.time = Math.random() * this.maxTime;
	}
/*
	Update

	It updates the generator and its emitted objects once per frame.

	Params
	- deltaTime(float): time in seconds between this frame and the previous one.
*/
	Update(deltaTime) {

		let obj;

		if(this.enabled) {

			this.time += deltaTime;

			if(this.time > this.maxTime) {

				obj = this.pool.length > 0 ? this.pool.pop() : null;

				if(obj != null) {

					obj.sprite.position.x = this.position.x + (Math.random() - 0.5);
					obj.sprite.position.y = this.position.y;
					obj.sprite.position.z = this.position.z + (Math.random() - 0.5);

					this.scene.add(obj.sprite);
					this.objectData[obj.tag] = obj;

					obj.alive = true;
				}

				this.time = 0;
				this.maxTime = this.minDelay + Math.random() * (this.maxDelay - this.minDelay);
			}
		}

		let tag;

		for(tag in this.objectData) {

			obj = this.objectData[tag];

			obj.Update(deltaTime);

			if(!obj.alive) {
				this.pool.push(obj);
				this.scene.remove(obj.sprite);
				delete this.objectData[tag];
			}
		}
	}
/*
	SetDelays

	Use this to change the generation rate.

	Params
	- minDelay(float): the new minimum generation delay.
	- maxDelay(float): the new maximum generation delay.
*/
	SetDelays(minDelay, maxDelay) {
		this.minDelay = minDelay;
		this.maxDelay = maxDelay;
		this.maxTime = this.minDelay + Math.random() * (this.maxDelay - this.minDelay);
		this.time = Math.random() * this.maxTime;
	}
}