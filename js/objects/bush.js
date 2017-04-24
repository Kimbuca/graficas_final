var Bush = function (){
	THREE.Group.apply(this, arguments);

	var base = new THREE.Mesh(
		new THREE.TetrahedronGeometry(6,2),
		new THREE.MeshStandardMaterial({
			color: 0x4dba6d, 
			shading: THREE.FlatShading, 
			metalness: 0})
	);

	base.castShadow = true;
	base.receiveShadow = true;
	this.name = "Bush";
	this.add(base);
}

Bush.prototype = Object.create(THREE.Group.prototype);
Bush.prototype.constructor = Bush;