var Birdie = function (){
	THREE.Group.apply(this, arguments);

	var body = new THREE.Mesh(
		new THREE.SphereGeometry(10, 10, 5),
		new THREE.MeshStandardMaterial({
			color: 0xd8605b, 
			shading: THREE.FlatShading, 
			metalness: 0})
	);

	body.rotateZ(Math.PI * .5);
	body.castShadow = true;
	body.receiveShadow = true;
	this.add(body);


	var peak = new THREE.Mesh(
	    new THREE.ConeGeometry(5, 7, 8),
	    new THREE.MeshStandardMaterial({
	        color: 0xdaa520,
	        shading: THREE.FlatShading,
	        metalness: 0,
	        roughness: 1 })
	);

	peak.position.x -= 12; 
	peak.rotateZ(Math.PI * .5);
	peak.castShadow = true;
	peak.receiveShadow = true;
	this.add(peak);
}


Birdie.prototype = Object.create(THREE.Group.prototype);
Birdie.prototype.constructor = Birdie;


Birdie.prototype.open = 0;
Birdie.prototype.angle = 0;
Birdie.prototype.RADIUS = 18;


Birdie.prototype.fly = function(){

	this.position.x = Math.cos(this.angle) * this.RADIUS;
  	this.position.y = 12 + Math.sin(this.open) * 4; //up and down
 	this.position.z = Math.sin(this.angle) * this.RADIUS;
 
	this.open += .085;
	this.angle += .025;
}
