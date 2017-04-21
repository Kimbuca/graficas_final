var gui = new dat.GUI({
    height : 10
});


var param = {
	interaction:5000,
	radius: 100,
	density: 100,

}

gui.add(param, 'interaction');
gui.add(param, 'radius');
gui.add(param, 'density');