var Tree = function (){
	THREE.Group.apply(this, arguments);

	var base = new THREE.Mesh(
		new THREE.CylinderGeometry( 5, 10, 20, 12, 8),
		new THREE.MeshStandardMaterial({
			color: 0x43304c, 
			shading: THREE.FlatShading, 
			metalness: 0})
	);


	base.castShadow = true;
	base.receiveShadow = true;
	this.add(base);

	var treetop = new THREE.Mesh(
	    new THREE.OctahedronGeometry(14,1),
	    new THREE.MeshStandardMaterial({
	        color: 0x4dba6d,
	        shading: THREE.FlatShading,
	        metalness: 0,
	        roughness: 1 })
	);

	treetop.position.y += 12; 
	treetop.castShadow = true;
	treetop.receiveShadow = true;
	this.add(treetop);
}

Tree.prototype = Object.create(THREE.Group.prototype);
Tree.prototype.constructor = Tree;