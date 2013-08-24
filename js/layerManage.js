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
			var i = container.length;
			layerConfig.zIndex = i;
			console.log(layerConfig)
			var newLayer = Layer(sketchpad,layerConfig);
			container.push(newLayer);
			container.img[i] = newLayer.img;
			container.sketchpad[i] = newLayer.sketchpad;
			container.layerAttribute[i] = newLayer.layerAttribute;
			container.layerControllerSet[i] = newLayer.layerControllerSet;

			require("sketchpadManage").createLayerManager()
			$("#aside").scrollspy('refresh')
			return newLayer;
		}
	}
});