var Tree = function (x = 0, y = 0, z = 0, color = 0x4dba6d){
	
	THREE.Group.apply(this, arguments);

	var base = new THREE.Mesh(
		new THREE.CylinderGeometry( 5, 10, this.height, 12, 8),
		new THREE.MeshStandardMaterial({
			color: 0x43304c, 
			shading: THREE.FlatShading, 
			metalness: 0})
	);

	base.castShadow = true;
	base.receiveShadow = true;
	//base.position.y = this.height/2;
	this.add(base);

	var treetop = new THREE.Mesh(
	    new THREE.OctahedronGeometry(14,1),
	    new THREE.MeshStandardMaterial({
	        color: color,
	        shading: THREE.FlatShading,
	        metalness: 0,
	        roughness: 1 })
	);

	treetop.position.y = base.position.y + 15; 
	treetop.castShadow = true;
	treetop.receiveShadow = true;
	this.add(treetop);

	this.position.set(x, y, z);
	this.applyMatrix( new THREE.Matrix4().makeTranslation( 0, this.height/2, 0 ));
	
}


Tree.prototype = Object.create(THREE.Group.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.height = 20;
Tree.prototype.relativeHeight = 20;

Tree.prototype.setColor = function (c) {
	hexColor = c.slice(1, 7);
	this.children[1].material.color.setHex("0x"+hexColor);
}


Tree.prototype.setHeight = function (h) {
	this.children[0].scale.set(1,h,1);
	let diff = this.height * h;

	if(h < 1){
		this.position.set(0, (diff - (diff/2)), 0)
	}else{
		this.position.set(0, diff/2, 0)
	}
	this.relativeHeight = this.relativeHeight*h;
	console.log("REL HEIGHT ",this.relativeHeight);
}
