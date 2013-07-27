define("sketchpad", ["layer"], function(require, exports, module) {
	var Layer = require("layer");
	// console.log(Layer);
	// var Raphael = require("Raphael");
	var SketchpadPrototype = {
		createLayer: {
			value: function(){
				return Layer(this)
			}
		}
	};
	exports.Sketchpad = function Sketchpad(newSketchpad_id, width, height) {
		var newSketchpad = Object.create(Raphael(newSketchpad_id, width, height), SketchpadPrototype);

			// newSketchpad.desc.title = newSketchpad_id;
			// newSketchpad.createLayer = createLayer;

		return newSketchpad;
	};
});
