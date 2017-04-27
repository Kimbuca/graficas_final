var params = {

	color: "#4dba6d",
	checkTree: true,
	treeWidth: 10,
	treeHeight: 1,
	leafColor: 10,
}

var ControlPanel = function (){

	var Gui = new dat.GUI({
   		height : 10
	});

	Gui.add(params, 'checkTree')
	.name('Arbol Default')
	.listen()
	.onFinishChange(function(checked){
		if(!checked){
			deleteBirdAndTree();
		}else{
			hexColor = '4dba6d';
			createBirdAndTree();
		}
	})

	Gui.addColor(params, 'color')
	.name('Color Hojas')
	.onChange(function() {
		hexColor = params.color;
		changeTreeColor(params.color);
	})

	Gui.add(params, 'treeWidth').min(1).max(20).step(1)
	.name('Ancho Arbol')
	.onFinishChange(function(){
		setTreeWidth(params.treeWidth * .1);
		console.log("Cambiaste Alto! ", params.treeWidth);
	})

	Gui.add(params, 'treeHeight').min(.1).max(2).step(.1)
	.name('Alto Arbol')
	.onChange(function(){
		setTreeHeight(params.treeHeight);
		console.log("Cambiaste Ancho! ", params.treeHeight);
	})

	return Gui;
}


var CP = new ControlPanel();