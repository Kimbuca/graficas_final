var renderer ;
var scene = new THREE.Scene();

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 20;
camera.position.z = 35;

controls = new THREE.OrbitControls(camera, renderer.domElement);

// Configure renderer clear color
renderer.setClearColor("#f4dbc2");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );
var material = new THREE.MeshNormalMaterial();

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
var bird = new Birdie();

bird.scale.set(.18,.18,.18);

const RADIUS  = 18;

bird.position.z = 18;
bird.position.y = 12;


scene.add(tree);
scene.add(bird);


var angle = 0;
var open = 0;
var rotation = 0;


var numBush = 8,
	slice = Math.PI * 2/numBush;
var angle2 = 0;

for(var i=0; i<numBush; i++){
	angle2 = i*slice;

	var bush = new Bush();
	bush.position.x = Math.cos(angle2) * (RADIUS+10);
	bush.position.y -= 3;
	bush.position.z = Math.sin(angle2) * (RADIUS+10);
	scene.add(bush);
}

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
// Render Loop
var render = function () {
  requestAnimationFrame(render);

  bird.position.x = Math.cos(angle) * RADIUS;
  bird.position.y = 12 + Math.sin(open) * 4; //up and down
  bird.position.z = Math.sin(angle) * RADIUS;
  //bird.position.z = bird.position.z + Math.sin(angle) * RADIUS;

  open += .085;
  angle += .025;

  renderer.render(scene, camera);
  controls.update();
};

render();