define("sketchpadManage", ["sketchpad"], function(require,exports,module) {
	var Sketchpad = require("sketchpad");
	var sketchpads = [];
	module.exports = {
		instances: sketchpads,
		create: function createSketchpad(opction) {
			opction = opction||{};
			opction.width = opction.width || 640;
			opction.height = opction.height || 480;
			opction.className = opction.className || "sketchpad";
			var newSketchpad_id = "sketchpad_" + sketchpads.length;
			var sketchpadContainer = document.createElement("div");
			sketchpadContainer.id = newSketchpad_id;
			sketchpadContainer.className = opction.className;
			document.body.appendChild(sketchpadContainer);
			var newSketchpad = Sketchpad(newSketchpad_id, opction.width, opction.height);
			sketchpads.push(newSketchpad);
			sketchpads[newSketchpad_id] = newSketchpad;
			return newSketchpad;
		},
		find: function findSketchpad(id_or_num) {
			if ((typeof id_or_num === "string") && isNaN(parseInt(id_or_num))) { //String
				return sketchpads[id_or_num];
			} else { //Number
				return sketchpads["sketchpad_" + parseInt(id_or_num)];
			}
		},
		destroy: function destroySketchpad(abandonedSketchpad) {
			if (sketchpads) {
				sketchpads.every(function(sketchpad, i) {
					if (sketchpad === abandonedSketchpad) {
						var sketchpadContainer = sketchpad.canvas.parentElement;
						sketchpadContainer.parentElement.removeChild(sketchpadContainer);
						sketchpad.splice(i, 1);
						delete sketchpad[sketchpadContainer.id];
						return false;
					}
					return true;
				})
			}
		}
	}
});