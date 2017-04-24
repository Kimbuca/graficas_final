let renderer, scene, camera;
let bird;

let RADIUS = 18;

let BushNum = 10;
let bushArrange = [];

function init(){
	scene = new THREE.Scene();
	// Create a renderer with Antialiasing
	renderer = new THREE.WebGLRenderer({antialias:true});
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.position.y = 20;
	camera.position.z = 35;

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	// Configure renderer clear color
	renderer.setClearColor("#f4dbc2");
	// Configure renderer size
	renderer.setSize( window.innerWidth, window.innerHeight );
	// Append Renderer to DOM
	document.body.appendChild( renderer.domElement );

	/** Light **/
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 1 );
	pointLight.position.set( 25, 50, 25 );
	scene.add( pointLight );

	pointLight.castShadow = true;
	pointLight.shadow.mapSize.width = 1024;
	pointLight.shadow.mapSize.height = 1024;

	var shadowMaterial = new THREE.ShadowMaterial( { color: 0xeeeeee } );
	shadowMaterial.opacity = 0.5;

	var tree = new Tree();
	bird = new Birdie();
	bird.scale.set(.18,.18,.18);
	bird.position.z = 18;
	bird.position.y = 12;

	//bird.fly();

	var terrain = new THREE.Mesh(
	new THREE.PlaneGeometry(120,120,35),
	new THREE.MeshStandardMaterial({
			color: 0x4dba6d, 
			metalness: 0})
	);

	terrain.receiveShadow = true;
	terrain.position.y -= 8;
	terrain.rotateX(Math.PI * 1.5);
	scene.add(terrain);

	scene.add(tree);
	scene.add(bird);

	setBushNum(BushNum);
}


var setBushRadius = function(rad){
	RADIUS = rad;
	let angle = 0;
	let slice = Math.PI * 2/bushArrange.length;


	for(i in bushArrange){
		//console.log(bush);
		angle = i*slice;
		bushArrange[i].position.x = Math.cos(angle) * (RADIUS+10);
		//bushArrange[i].position.y -= 3;
		bushArrange[i].position.z = Math.sin(angle) * (RADIUS+10);
		i++;
	}


}


var deleteBushes = function(num){
	//console.log(scene.children);
	for(var i=0; i<num; ++i)
		console.log(scene.children.pop());

	delete bushArrange
}


var setBushNum = function (num) {

	if(scene.children.find((child) => child.name === 'Bush')){
		deleteBushes(BushNum);
		BushNum = num;
		bushArrange = [];
	}
	
	let slice = Math.PI * 2/num;
	var angle2 = 0;

	for(var i=0; i<num; i++){
		angle2 = i*slice;
		var bush = new Bush();
		bush.position.x = Math.cos(angle2) * (RADIUS+10);
		bush.position.y -= 3;
		bush.position.z = Math.sin(angle2) * (RADIUS+10);
		bushArrange.push(bush);
		scene.add(bush);
	}
}

var drawSetOfBushes = function () {

}


var numBush = 8;
// Render Loop
var render = function () {
  requestAnimationFrame(render);
  bird.fly();

  renderer.render(scene, camera);
  controls.update();
};

init();
render();

