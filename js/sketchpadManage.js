define("sketchpadManage", ["sketchpad", "materialPanel"], function(require, exports, module) {
	var Sketchpad = require("sketchpad");
	var materialDrag = require("materialPanel");
	var sketchpads = [];
	var $layer = require("layerManage").$layer || $(".layer"),
		layerOffSet = $layer.offset();
	$layer.viewInstance = ViewParser.modules["layer"]().append($layer[0]);
	$layer.on("click", "li", function() {
		var layerInstances = require("layerManage").instances;
		layerInstances.forEach(function(layerInstance) {
			layerInstance.blur();
		});
		layerInstances[this.getAttribute("data-index")].focus();
	});
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
							console.log(fileItem.getAttribute("data-type"))
							switch (fileItem.getAttribute("data-type")) {
								case "layer":
									newSketchpad.createLayer({
										// src: fileItem.src,
										src: fileItem.getAttribute("data-src"),
										x: session.point.end.x - sketchpadContainer.offsetLeft - (session.point.start.x - fileItem.offsetLeft),
										y: session.point.end.y - sketchpadContainer.offsetTop - (session.point.start.y - fileItem.offsetTop),
										width: parseInt(fileItem.getAttribute("data-width")) || fileItem.width,
										height: parseInt(fileItem.getAttribute("data-height")) || fileItem.height,
										RC_x: sketchpadContainer.offsetLeft,
										RC_y: sketchpadContainer.offsetTop
									});
									break;
								case "background":
									newSketchpad.createLayer({
										src: fileItem.getAttribute("data-src")
									}).toMax().lock();
									break;
								case "font":
									newSketchpad.createLayer({
										type: "font",
										src: fileItem.getAttribute("data-src")
									});
									break;
							}
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
				return b.layerAttribute.zIndex - a.layerAttribute.zIndex;
			});
			lis.forEach(function(layerInstance) {
				// var active = layerInstance.layerAttribute.active;
				layersData.push(layerInstance.layerAttribute)
				// active?layerInstance.focus():ayerInstance.blur();
			});
			$layer.viewInstance.set("layers", layersData);
			setTimeout(function() {
				var $layerNode = $("#layer"),
					$activeNode = $layerNode.find("li[class*='active']"),
					$aside = $("#aside"),
					id = $activeNode.find("a").attr("href"),
					$activeContentNode = $(id);

				$activeNode.length && $layerNode.scrollTop($activeNode.offset().top - $layerNode.offset().top + $layerNode.scrollTop());
				$aside.scrollTop($activeContentNode.offset().top - $aside.offset().top + $aside.scrollTop())
			}, 0)
		},
		refreshLayerManager: function refreshLayerManager(opction) {
			var lis = require("layerManage").instances.slice(),
				layersData = [];
			lis.sort(function(a, b) {
				return b.layerAttribute.zIndex - a.layerAttribute.zIndex;
			});
			lis.forEach(function(layerInstance) {
				// var active = layerInstance.layerAttribute.active;
				layersData.push(layerInstance.layerAttribute)
				// active?layerInstance.focus():ayerInstance.blur();
			});
			$layer.viewInstance.set("layers", layersData);
			setTimeout(function() {
				var $layerNode = $("#layer"),
					$activeNode = $layerNode.find("li[class*='active']");

				$activeNode.length && $layerNode.scrollTop($activeNode.offset().top - $layerNode.offset().top + $layerNode.scrollTop());
			}, 0)
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