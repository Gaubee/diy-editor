define("layerManage", ["Layer"],function(require, exports, module) {
	var Layer = require("Layer");
	var container = {
		img: [],
		layer: [],
		layerAttribute: [],
		layerControllerSet: []
	}
	module.exports = {
		instances: container,
		create: function createLayer(sketchpad){
			var newLayer = Layer(sketchpad);
			var i = container.img.length;
			container.img[i] = newLayer.img;
			container.layer[i] = newLayer.img;
			container.layerAttribute[i] = newLayer.layerAttribute;
			container.layerControllerSet[i] = newLayer.layerControllerSet;
			return newLayer;
		}
	}
});