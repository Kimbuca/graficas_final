let RADIUS = 15;

var Bush = function(){
	var base = new THREE.Mesh(
		new THREE.TetrahedronGeometry(6,2),
		new THREE.MeshStandardMaterial({
			color: 0xd3d3d3, 
			shading: THREE.FlatShading, 
			metalness: 0})
	);

	base.name = "Bush";
	base.castShadow = true;
	base.receiveShadow = true;
	return base;
}

function deleteEntityFromScene (name) {
	let selectedObject = scene.getObjectByName(name);
	console.log("GRUPO", selectedObject);
	scene.remove(selectedObject);
}


var setBushRadius = function(rad){
	RADIUS = rad;
	let angle = 0;
	let slice = Math.PI * 2/bushArrange.length;

	for(i in bushArrange){
		angle = i*slice;
		bushArrange[i].position.x = Math.cos(angle) * (RADIUS+10);
		bushArrange[i].position.z = Math.sin(angle) * (RADIUS+10);
		i++;
	}
}


var setBushRandomly = function(num, limx, limy){
	let group = new THREE.Object3D();

	for(var i=0; i<num; i++){
		var bush = new Bush();
		bush.position.x = (Math.random() * limx);
		bush.position.z =(Math.random() * limy);

		group.add(bush);
		bushArrange.push(bush);	
	}

	group.name = 'groupRocks';
	group.applyMatrix( new THREE.Matrix4().makeTranslation( -limx/2, 3, -limy/2 ));

	scene.add(group);
}


var deleteBushes = function(num){
	deleteEntityFromScene('groupBushes');
}


var setBushNum = function (num) {

	if(scene.children.find((child) => child.name === 'groupBushes')){
		deleteBushes(BushNum);
		BushNum = num;
		bushArrange = [];
	}
	
	let group = new THREE.Object3D();
	let slice = Math.PI * 2/num;
	var angle2 = 0;

	for(var i=0; i<num; i++){
		angle2 = i*slice;
		var bush = new Bush();

		bush.position.x = Math.cos(angle2) * (RADIUS+10);
		bush.position.y -= 3;
		bush.position.z = Math.sin(angle2) * (RADIUS+10);

		group.add(bush);
		bushArrange.push(bush);
		
	}

	group.name = 'groupBushes';
	group.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 6, 0 ));
	scene.add(group);
	console.log(scene.children)
}



