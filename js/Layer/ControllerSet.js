define("ControllerSet", [], function(require, exports, module) {
	var cursor = require("cursor");
	var handleOpction = {
		length: 12,
		circleR: 4,
		concerR: 3
	};
	var layerController = {
		"edge-top": {
			type: "path",
			arguments: function(layerAttribute) { //top
				return [["M", layerAttribute.x, layerAttribute.y, "L", layerAttribute.x + layerAttribute.width, layerAttribute.y]];
			}
		},
		"edge-left": {
			type: "path",
			arguments: function(layerAttribute) { //left
				return [["M", layerAttribute.x, layerAttribute.y, "L", layerAttribute.x, layerAttribute.y + layerAttribute.height]];
			}
		},
		"edge-bottom": {
			type: "path",
			arguments: function(layerAttribute) { //bottom
				return [["M", layerAttribute.x, layerAttribute.y + layerAttribute.height, "L", layerAttribute.x + layerAttribute.width, layerAttribute.y + layerAttribute.height]];
			}
		},
		"edge-right": {
			type: "path",
			arguments: function(layerAttribute) { //right
				return [["M", layerAttribute.x + layerAttribute.width, layerAttribute.y, "L", layerAttribute.x + layerAttribute.width, layerAttribute.y + layerAttribute.height]];
			}
		},

		"handle-stick": {
			type: "path",
			arguments: function(layerAttribute) {
				return [["M", layerAttribute.x + layerAttribute.width / 2, layerAttribute.y, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y - handleOpction.length]];
			}
		},
		"handle-ball": {
			type: "circle",
			arguments: function(layerAttribute) {
				return [layerAttribute.x + layerAttribute.width / 2, layerAttribute.y - handleOpction.length - handleOpction.circleR, handleOpction.circleR];
			}
		},
		"handle-left-top": {
			type: "circle",
			arguments: function(layerAttribute) { //left-top
				return [layerAttribute.x, layerAttribute.y, handleOpction.concerR];
			}
		},
		"handle-left-bottom": {
			type: "circle",
			arguments: function(layerAttribute) { //left-bottom
				return [layerAttribute.x, layerAttribute.y + layerAttribute.height, handleOpction.concerR];
			}
		},
		"handle-right-bottom": {
			type: "circle",
			arguments: function(layerAttribute) { //right-bottom
				return [layerAttribute.x + layerAttribute.width, layerAttribute.y + layerAttribute.height, handleOpction.concerR];
			}
		},
		"handle-right-top": {
			type: "circle",
			arguments: function(layerAttribute) { //right-top
				return [layerAttribute.x + layerAttribute.width, layerAttribute.y, handleOpction.concerR];

			}
		}
	};
	var layerHandler = {
		"edge-top": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "n-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.height -= (dy - layerAttribute.cacheH);
				layerAttribute.y += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheH = 0;
				_self.reInit();
			});
		},

		"edge-left": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "w-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width -= (dx - layerAttribute.cacheW);
				layerAttribute.x += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				_self.reInit();
			});
		},

		"edge-bottom": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "s-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.height += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheH = 0;
				_self.reInit();
			});
		},

		"edge-right": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "e-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				_self.reInit();
			});
		},

		"handle-left-top": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "nw-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width -= (dx - layerAttribute.cacheW);
				layerAttribute.x += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height -= (dy - layerAttribute.cacheH);
				layerAttribute.y += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				_self.reInit();
			});
		},

		"handle-left-bottom": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "sw-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width -= (dx - layerAttribute.cacheW);
				layerAttribute.x += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				_self.reInit();
			});
		},

		"handle-right-bottom": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "se-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				_self.reInit();
			});
		},

		"handle-right-top": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "ne-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height -= (dy - layerAttribute.cacheH);
				layerAttribute.y += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				_self.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				_self.reInit();
			});
		},

		"handle-ball": function(handle) {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			handle.data("cursor", "move");
			handle.drag(function onmove(dx, dy, x, y, e) {
				// console.log("onmove")
				x -= layerAttribute.RC_x;
				y -= layerAttribute.RC_y;
				var centerX = layerAttribute.x + layerAttribute.width / 2;
				var centerY = layerAttribute.y + layerAttribute.height / 2;
				var asinxValue = (centerY - y) / Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
				layerAttribute.rotate = 90 - Math.asin(asinxValue) / Math.PI * 180;
				// console.log(asinxValue,layerAttribute.rotate);
				if ((x - centerX) < 0) {
					layerAttribute.rotate = 360 - layerAttribute.rotate;
				}
				_self.reInit();
			}, function onstart(x, y, e) {
				// console.log("onstart")
			}, function onend(e) {
				// console.log("onend")
				_self.reInit();
			});
		}
	};

	function initHanlder() {
		var _self = this,
			paper = _self.skechpad,
			layerAttribute = _self.layerAttribute,
			layerControllerSet;
		_self.layerControllerSet && _self.layerControllerSet.clear();
		layerControllerSet = _self.layerControllerSet = _self.skechpad.set();

		for (var i in layerController) {
			var item = layerController[i];
			// console.log(item.name,typeof paper[item.name],item())
			item = paper[item.type].apply(paper, item.arguments(layerAttribute));
			layerControllerSet.push(item);
			if (i in layerHandler) {
				layerHandler[i].call(_self, item);
			}
		}
		// (999999 * Math.random() / 1000000).toString().substring(2, 8)
		// (932906715 * Math.random() / 932906715).toString(16).substring(3, 9)
		layerControllerSet.attr({
			// "stroke": "#276419",
			"stroke": "#" + (999999 * Math.random() / 1000000).toString().substring(3, 9),
			"stroke-opacity": 0.8,
			"stroke-width": 3
		});
		// layerControllerSet.animate({
		// 	opacity: 0
		// }, 200);

		layerControllerSet.forEach(function(item) {
			if (item.data("cursor")) {
				item.hover(function f_in() {
					// console.log(this.data("cursorData"),item.data("cursor"))
					if (!this.data("cursorData")) {
						var cursorData = cursor[item.data("cursor")](layerAttribute.rotate);
						this.data("cursorData", cursorData);
						this.attr({
							cursor: "url(" + cursorData + ") 16 16"
						})
					}
					// layerAttribute.handleActive = true;
					// _self.delayReInit();
				}, function f_out() {
					// layerAttribute.handleActive = false;
					// _self.delayReInit();
				});
			}
		});
	}

	return function(LayerConstructor) {
		LayerConstructor.prototype.initHanlder = initHanlder;
		var _focus = LayerConstructor.prototype.focus;
		LayerConstructor.prototype.focus = function() {
			var _self = this,
				layerControllerSet = _self.layerControllerSet;
			_focus.call(this);
			layerControllerSet.animate({
				opacity: 1
			}, 200);
		};
		var _blur = LayerConstructor.prototype.blur;
		LayerConstructor.prototype.blur = function() {
			var _self = this,
				layerControllerSet = _self.layerControllerSet;
			_blur.call(this);
			layerControllerSet.animate({
				opacity: 0
			}, 200);
		};
		var _LayerReInit = LayerConstructor.prototype._reInit = LayerConstructor.prototype.reInit;
		LayerConstructor.prototype.reInit = function() {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				layerControllerSet = _self.layerControllerSet;
			_self._reInit();

			if (layerAttribute.lock) {
				return;
			}

			var j = 0;
			for (var i in layerController) {
				var initFn = layerController[i];
				var item = layerControllerSet[j]
				switch (initFn.type) {
					case "path":
						var path = initFn.arguments(layerAttribute);
						item.attr({
							path: path + ""
						})
						break;
					case "circle":
						var circle = initFn.arguments(layerAttribute);
						item.attr({
							cx: circle[0],
							cy: circle[1],
							r: circle[2]
						})
						break;
				}
				item.data("cursorData", null);
				j += 1;
			}
			var transform_R = ["r" + layerAttribute.rotate, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y + layerAttribute.height / 2]

			layerControllerSet.attr({
				// transform: ["r" + layerAttribute.rotate, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y + layerAttribute.height / 2]
				transform: transform_R
			});
		}
		LayerConstructor.initQueue.push({
			name: "initHanlder",
			handle: function(layerInstance) {
				layerInstance.initHanlder()
			}
		})
	};;
})