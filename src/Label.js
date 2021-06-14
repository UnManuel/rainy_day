// by @unmanuel

/*
	Label

	A basic label to display the time and day of the week. It needs to repaint the text
	in a DOM canvas element every time we set it up, so let's try not to overdo it.
*/

class Label {

	text = "";				// The text to render
	font = "ethnocentric";	// Default font

	context = null;			// Context to paint in the canvas
	canvas = null;			// Target canvas for painting
	
	mesh = null;			// A plane facing the camera to add to the scene
	texture = null;			// Needs update when we repaint the canvas
/*
	constructor

	Creates a canvas for the label and the mesh that it's going to use.

	Params
	- text(string): the label text.
	- x(float = 0): position in the x-axis.
	- y(float = 0): position in the y-axis.
	- z(float = 0): position in the z-axis.
	- size(int = 256): font size. Default is 256.
	- color(string = "#ffffff"): CSS hexcolor. Default is white.
*/
	constructor(text, x = 0, y = 0, z = 0, size = 256, color = "#ffffff") {

		this.text = text;

		this.canvas = document.createElement("canvas");

		// Make it dynamic later
		this.canvas.width = 2176;
		this.canvas.height = 256;	
		
		this.context = this.canvas.getContext("2d");

		this.context.font = "normal " + size + "px '" + this.font + "'";
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillStyle = color;
		this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);

		this.texture = new THREE.Texture(this.canvas);
		this.texture.needsUpdate = true;

		let mat = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, fog: false });

		this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height, 1, 1), mat);
		this.mesh.scale.set(0.0002, 0.0002, 1);	// Must be configurable
		
		this.mesh.position.x = x;
		this.mesh.position.y = y;
		this.mesh.position.z = z;
	}
/*
	SetText

	It clears the canvas and repaints the new text with
	the option to override the previous size and color.

	Params
	- text(string): the new label text.
	- size(int = null): optional font size.
	- color(string = null): optional new color as CSS hexcolor.
*/
	SetText(text, size = null, color = null) {

		this.text = text;
		
		if(size != null)
			this.context.font = "normal " + size + "px '" + this.font + "'";
		
		if(color != null)
			this.context.fillStyle = color;

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);

		this.texture.needsUpdate = true;
	}
}