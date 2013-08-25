define("sketchpadManage", ["sketchpad", "materialPanel"], function(require, exports, module) {
	var Sketchpad = require("sketchpad");
	var materialDrag = require("materialPanel");
	var sketchpads = [];
	var $layer = $(".layer");
	$layer.viewInstance= ViewParser.modules["layer"]().append($layer[0]);
	module.exports = {
		instances: sketchpads,
		create: function createSketchpad(opction) {
			opction = opction || {};
			opction.width = opction.width || 640;
			opction.height = opction.height || 480;
			opction.className = (opction.className || "") + " sketchpad";
			var newSketchpad_id = "sketchpad_" + sketchpads.length;
			var sketchpadContainer = document.createElement("div");
			sketchpadContainer.id = newSketchpad_id;
			sketchpadContainer.className = opction.className;
			$sketchpadContainer = $(sketchpadContainer);
			materialDrag.registeredEndpoints(sketchpadContainer, {
				enter: function(session, e) {
					session.endpointEvent = function() {

						for (var i = 0, fileItem; fileItem = session.files[i]; i += 1) {
							console.log(session.point.start.x, session.point.end.x, fileItem.offsetLeft, sketchpadContainer.offsetLeft)
							newSketchpad.createLayer({
								src: fileItem.src,
								x: session.point.end.x - sketchpadContainer.offsetLeft - (session.point.start.x - fileItem.offsetLeft),
								y: session.point.end.y - sketchpadContainer.offsetTop - (session.point.start.y - fileItem.offsetTop),
								width: fileItem.width,
								height: fileItem.height,
								RC_x: sketchpadContainer.offsetLeft,
								RC_y: sketchpadContainer.offsetTop
							});
						}
					}
				},
				leave: function(session, e) {
					if (!session.toSvg) {
						session.endpointEvent = function() {}
					}
				}
			});
			(opction.container || $("body")).append(sketchpadContainer)
			// document.body.appendChild(sketchpadContainer);
			var newSketchpad = Sketchpad(newSketchpad_id, opction.width, opction.height);
			sketchpads.push(newSketchpad);
			sketchpads[newSketchpad_id] = newSketchpad;
			return newSketchpad;
		},
		createMaterialPanel: function createMaterialPanel(opction) {
			var M = ViewParser.modules["mterial"](opction.data);
			M.append((opction.container || $("body"))[0])
			Array.prototype.forEach.call($("[draggable='true']"), function(imgElement) {
				materialDrag.registeredStartingpoints(imgElement, {
					end: function(session, e) {
						console.log(session.toSvg)
						if (session.toSvg) {
							session.endpointEvent()
						}
					}
				})
			});
		},
		createLayerManager: function createLayerManager(opction) {
			var lis = require("layerManage").instances.slice(),
				layersData = [];
			lis.sort(function(a, b) {
				return a.layerAttribute.zIndex - b.layerAttribute.zIndex;
			});
			lis.forEach(function(layerInstance) {
				layersData.push({
					id:layerInstance.id
				})
			});
			$layer.viewInstance.set("layers",layersData);
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