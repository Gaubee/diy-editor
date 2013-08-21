define("layerManage", ["Layer"],function(require, exports, module) {
	var Layer = require("Layer");
	var container = [];
	container.img= [];
	container.sketchpad= [];
	container.layerAttribute= [];
	container.layerControllerSet= [];
	module.exports = {
		instances: container,
		create: function createLayer(sketchpad,layerConfig){
			var newLayer = Layer(sketchpad,layerConfig);
			var i = container.length;
			container.push(newLayer);
			container.img[i] = newLayer.img;
			container.sketchpad[i] = newLayer.sketchpad;
			container.layerAttribute[i] = newLayer.layerAttribute;
			container.layerControllerSet[i] = newLayer.layerControllerSet;
			return newLayer;
		}
	}
});