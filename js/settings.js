var params = {

	bushNumber: 10,
	bushRadius: 30,
	checkTree: true
}

var ControlPanel = function (){

	var Gui = new dat.GUI({
   		height : 10
	});

	Gui.add(params, 'bushNumber').min(1).max(10).step(1)
	.name('Arbustos')
	.onFinishChange(function(){
		setBushNum(params.bushNumber);
		console.log("Cambiaste! ", numBush);
	})

	Gui.add(params, 'bushRadius').min(10).max(30).step(.5)
	.name('Radio')
	.onChange(function(){
		setBushRadius(params.bushRadius);
		console.log("Cambiaste! ", params.bushRadius);
	})

	return Gui;
}


var CP = new ControlPanel();