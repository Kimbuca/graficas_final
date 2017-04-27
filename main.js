let renderer, scene, camera, cRenderer;
let bird;

let BushNum = 25;
let bushArrange = [];

let setOfParticles = [];

let particleCount = 500;
let particles; //cube asdefault
let pMaterial;
let particleSystem;

let exploding = false;
let explodingTimer = 0;

let hexColor = '4dba6d'; //tree top default color

let tree;
let terrainDimension = 500;

function init(){
	scene = new THREE.Scene();
	initRenderer();
	initLight();

	initTerrain();
	setBushRandomly(BushNum, terrainDimension-50, terrainDimension-50);
	createBirdAndTree();

	//Add Mouse Listener
	document.addEventListener('mousedown', OnMouseDown, false);

	render();
}

function initRenderer() {
	// Create a renderer with Antialiasing
	renderer = new THREE.WebGLRenderer({antialias:true});
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.5, 10000 );
	
	camera.position.set(0,175,300);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minPolarAngle = -15;
	controls.maxPolarAngle = Math.PI / 2;

	// Configure renderer clear color
	renderer.setClearColor(0x43304c);
	// Configure renderer size
	renderer.setSize( window.innerWidth, window.innerHeight );
	// Append Renderer to DOM
	document.body.appendChild( renderer.domElement );
}

function initLight() {
	/** Light **/
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	let ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
	scene.add( ambientLight );

	let pointLight = new THREE.PointLight( 0xffffff, 1 );
	pointLight.position.set( 150, 100, 150);
	scene.add( pointLight );

	pointLight.castShadow = true;
	pointLight.shadow.mapSize.width = 1024;
	pointLight.shadow.mapSize.height = 1024;

	let shadowMaterial = new THREE.ShadowMaterial( { color: 0xeeeeee } );
	shadowMaterial.opacity = 0.5;
}

function initTerrain() {

	let floorTexture = new THREE.TextureLoader().load("img/grass.jpg");
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set( 5, 5 );

	let terrain = new THREE.Mesh(
	new THREE.PlaneGeometry(terrainDimension,terrainDimension,40),
	new THREE.MeshBasicMaterial({
			map: floorTexture,
			 shading: THREE.FlatShading,
    		})
	);

	terrain.name = "terrain";
	terrain.receiveShadow = true;
	terrain.position.y = 0;
	terrain.rotateX(Math.PI * 1.5);

	bushArrange.push(terrain);
	scene.add(terrain);
}



function createTree(x, y, z){
	var newTree = tree.clone();
	console.log(hexColor);
	newTree.children[1].material.color.setHex("0x"+hexColor);

	scene.add(newTree);
	newTree.position.set(x,(tree.relativeHeight/2), z);

}

//global function to change on scene tree color
function changeTreeColor(c){
	tree.setColor(c);
}


// Instanciate a bunch of particles
function createParticlesFor(obj){

	THREE.ImageUtils.crossOrigin = "";
	particles = new THREE.Geometry(); //cube as default

	let texture = new THREE.TextureLoader().load("img/ps_ball.png");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1, 1 );

	pMaterial = new THREE.PointsMaterial({
		color: 0xFFFF33, 
		size: 20, 
		alphaTest: .6, 
		map: texture,
	  	blending: THREE.AdditiveBlending,
	  	transparent: true
  	});

	for(let i=0; i<particleCount;i++){
		
		let particle = new THREE.Vector3(
	        (obj.position.x-  ((terrainDimension-50)/2))+Math.random()*4, 
	         obj.position.y+Math.random()*4,
	        (obj.position.z- ((terrainDimension-50)/2))+Math.random()*4
	    );
    	particles.vertices.push(particle);
	}

  	particleSystem = new THREE.Points(
	    particles,
	    pMaterial
	);

  	particleSystem.name = 'Particle System';

	scene.add(particleSystem);

	exploding = true;
	explodingTimer =0;

}


//explosion effect for particles
function particlesExplode() {

	let velocity = 0.2;
	let angle = Math.PI*2/particles.vertices.length;
	let zdirection = 1;

	let i = 0;
	
	particleSystem.material.size -= velocity*4;
	particles.vertices.forEach(function (v) {
		v.x = v.x + Math.cos(angle*i) * 4 * velocity;
		v.y = v.y + Math.sin(angle*i) * 4 * velocity;
		v.z = v.z + Math.cos(angle+i) * 4 * velocity;
		i++;
	})

	explodingTimer += 0.1;

	if(explodingTimer >= 4  ){
		deleteEntityFromScene('Particle System');
		exploding =false;
	}

	particles.verticesNeedUpdate = true;
}


function OnMouseDown(event) {

	event.preventDefault();

	mouseX =   (event.clientX / window.innerWidth)  * 2 - 1;
	mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

	let vector = new THREE.Vector3( mouseX, mouseY, 1 );
    vector.unproject(camera);

  	let ray = new THREE.Raycaster( camera.position, vector.sub(camera.position).normalize() );
	let intersects = ray.intersectObjects(bushArrange);

	if(intersects.length > 0){
		let object = intersects[0].object;

		if(object.name == 'terrain'){
			let terrainPortion = intersects[0].point;
			createTree(terrainPortion.x, terrainPortion.y, terrainPortion.z);
		}else{
			let selectedObject = scene.getObjectByName('groupRocks');
			createParticlesFor(object);
			selectedObject.remove(object);
		}	
	}
}


var deleteBirdAndTree = function () {
	deleteEntityFromScene('BirdAndTree');
	bird = undefined;
}

//creates couple of bird and tree
var createBirdAndTree = function () {
	let group = new THREE.Object3D();
	tree = new Tree();
	bird = new Birdie();

	bird.scale.set(.18,.18,.18);
	bird.position.z  = 80;
	bird.position.y -= 100;

	group.add(bird);
	group.add(tree);
	group.name = 'BirdAndTree';

	scene.add(group);
}


var setTreeWidth = function(scale) {
	tree.scale.set(1*scale, 1, 1*scale);

}

var setTreeHeight = function(scale) {
	tree.setHeight(scale);
}


// Render Loop
var render = function () {
  	requestAnimationFrame(render);

  	if (bird) { bird.fly()	}
  	if (exploding) { particlesExplode() }
  	
 	renderer.render(scene, camera);
  	controls.update();
};

init();
