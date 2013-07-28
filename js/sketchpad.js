define("sketchpad", ["layerManage","eventStackManage","Raphael"], function(require, exports, module) {
	var layerManage = require("layerManage");
	var eventStack = require("eventStackManage");
	// console.log(Layer);
	// var Raphael = require("Raphael");
	var SketchpadPrototype = {
		createLayer: {
			value: function(){
				return layerManage.create(this);
			}
		},
		eventStack:{
			value:eventStack.create(eventStack.instances.length)
		}
	};
	function Sketchpad(newSketchpad_id, width, height) {
		var newSketchpad = Object.create(Raphael(newSketchpad_id, width, height), SketchpadPrototype);

			// newSketchpad.desc.title = newSketchpad_id;
			// newSketchpad.createLayer = createLayer;

		return newSketchpad;
	};
	return Sketchpad;
});
