define("Layer", ["cursor"], function(require, exports, module) {
	var cursor = require("cursor");
	// var layerManage = require("layerManage");
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
		"edge-top": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "n-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.height -= (dy - layerAttribute.cacheH);
				layerAttribute.y += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheH = 0;
				layerControllerSet.reInit();
			});
		},

		"edge-left": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "w-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width -= (dx - layerAttribute.cacheW);
				layerAttribute.x += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerControllerSet.reInit();
			});
		},

		"edge-bottom": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "s-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.height += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheH = 0;
				layerControllerSet.reInit();
			});
		},

		"edge-right": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "e-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerControllerSet.reInit();
			});
		},

		"handle-left-top": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "nw-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width -= (dx - layerAttribute.cacheW);
				layerAttribute.x += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height -= (dy - layerAttribute.cacheH);
				layerAttribute.y += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				layerControllerSet.reInit();
			});
		},

		"handle-left-bottom": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "sw-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width -= (dx - layerAttribute.cacheW);
				layerAttribute.x += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				layerControllerSet.reInit();
			});
		},

		"handle-right-bottom": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "se-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				layerControllerSet.reInit();
			});
		},

		"handle-right-top": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "ne-resize");
			handle.drag(function onmove(dx, dy, x, y, e) {
				layerAttribute.width += (dx - layerAttribute.cacheW);
				layerAttribute.cacheW = dx;
				layerAttribute.height -= (dy - layerAttribute.cacheH);
				layerAttribute.y += (dy - layerAttribute.cacheH);
				layerAttribute.cacheH = dy;
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {

			}, function onend(e) {
				layerAttribute.cacheW = 0;
				layerAttribute.cacheH = 0;
				layerControllerSet.reInit();
			});
		},

		"handle-ball": function(handle, layerAttribute,layerControllerSet) {
			handle.data("cursor", "move");
			handle.drag(function onmove(dx, dy, x, y, e) {
				// console.log("onmove")
				var centerX = layerAttribute.x + layerAttribute.width / 2;
				var centerY = layerAttribute.y + layerAttribute.height / 2;
				var asinxValue = (centerY - y) / Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
				layerAttribute.rotate = 90 - Math.asin(asinxValue) / Math.PI * 180;
				// console.log(asinxValue,layerAttribute.rotate);
				if ((x - centerX) < 0) {
					layerAttribute.rotate = 360 - layerAttribute.rotate;
				}
				layerControllerSet.reInit();
			}, function onstart(x, y, e) {
				// console.log("onstart")
			}, function onend(e) {
				// console.log("onend")
				layerControllerSet.reInit();
			});
		}
	};
	var layerInterface = {//will binding in each Layer
		move:function(x,y){

		},
		resize:function(width,height){

		},
		rotate:function(deg){

		}
	}
	function checkAttribute(layerAttribute) {
		if (layerAttribute.width < 0) {
			layerAttribute.width = 0
		}
		if (layerAttribute.height < 0) {
			layerAttribute.height = 0
		}
		if (layerAttribute.x < 0) {
			layerAttribute.x = 0
		}
		if (layerAttribute.y < 0) {
			layerAttribute.y = 0
		}
	};

	function Layer(paper, layerConfig) {
		if (!(this instanceof Layer)) {
			return new Layer(paper,layerConfig);
		}
		var layerAttribute = this.layerAttribute = {
			width: 144,
			height: 96,
			cacheW: 0,
			cacheH: 0,
			x: 20,
			y: 80,
			cacheX: 0,
			cacheY: 0,
			rotate: 0,
			active: false,
			cacheActive: false,
			handleActive: false,
			cacheHandleActive: false,
			activeStatus:0,
			keepActive:false
		}
		var img = this.img = paper.image("../demo/img/flower.jpg", layerAttribute.x, layerAttribute.y, layerAttribute.width, layerAttribute.height);

		var layerControllerSet = this.layerControllerSet = paper.set();
		(function() {//init hanlder

			for (var i in layerController) {
				var item = layerController[i];
				// console.log(item.name,typeof paper[item.name],item())
				item = paper[item.type].apply(paper, item.arguments(layerAttribute));
				// console.log(item)
				layerControllerSet.push(item);

				if (i in layerHandler) {
					layerHandler[i](item, layerAttribute, layerControllerSet);
				}
				// item.hover(function f_in() {
				// 	// console.log("hover_in",this)
				// 	this.attr({
				// 		fill: "#276419",
				// 		"fill-opacity": 0.8
				// 	})
				// }, function f_out() {
				// 	this.attr({
				// 		"fill-opacity": 0
				// 	})
				// });
			}
			layerControllerSet.attr({
				"stroke": "#276419",
				"stroke-opacity": 0.8,
				"stroke-width": 3
			});
			layerControllerSet.animate({
				opacity: 0
			}, 200);

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
						layerAttribute.handleActive = true;
						layerControllerSet.delayReInit();
					}, function f_out() {
						layerAttribute.handleActive = false;
						layerControllerSet.delayReInit();
					});
				}
			});
		}());
		layerControllerSet.reInit = function reInit() {
			checkAttribute(layerAttribute);
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
			layerControllerSet.attr({
				transform: ["r" + layerAttribute.rotate, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y + layerAttribute.height / 2]
			})
			img.attr({
				width: layerAttribute.width,
				height: layerAttribute.height,
				x: layerAttribute.x,
				y: layerAttribute.y,
				transform: ["r" + layerAttribute.rotate, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y + layerAttribute.height / 2]
			});
			if (!layerAttribute.keepActive) {
				if (!(layerAttribute.cacheActive === layerAttribute.active)||!(layerAttribute.cacheHandleActive === layerAttribute.handleActive)) {
					layerAttribute.activeStatus = (layerAttribute.active||layerAttribute.handleActive?1:0);
					layerControllerSet.animate({
						opacity: layerAttribute.activeStatus
					},200);
					layerAttribute.cacheActive = layerAttribute.active;
					layerAttribute.cacheHandleActive = layerAttribute.handleActive;
				}
			}
		}

		layerControllerSet.delayReInit = function delayReInit(delayTime){
			clearTimeout(layerControllerSet.delayReInit.activeTime);
			layerControllerSet.delayReInit.activeTime = setTimeout(layerControllerSet.reInit,delayTime||60);
		}
		layerControllerSet.delayReInit.activeTime;


		img.drag(function onmove(dx, dy, x, y, e) {
			// console.log("onmove",dx,dy,x,y,e);
			layerAttribute.x = dx - layerAttribute.cacheX + layerAttribute.x;
			layerAttribute.y = dy - layerAttribute.cacheY + layerAttribute.y;
			layerAttribute.cacheX = dx;
			layerAttribute.cacheY = dy;

			layerControllerSet.reInit();
		}, function onstart(x, y, e) {
			// console.log("onstart",x,y,e);
			layerControllerSet.animate({
				opacity: 0
			}, 200)
		}, function onend(e) {
			// console.log("onend",e);
			layerAttribute.cacheX = 0;
			layerAttribute.cacheY = 0;
			layerAttribute.x = img.attr("x");
			layerAttribute.y = img.attr("y");
			layerControllerSet.animate({
				opacity: 1
			}, 200);
			layerControllerSet.reInit();
		});

		img.mouseover(function mouseover(e){
			layerAttribute.active = true;
			layerControllerSet.delayReInit();
			// layerControllerSet.reInit();
		}).mouseout(function mouseout(e){
			layerAttribute.active = false;
			layerControllerSet.delayReInit();
			// layerControllerSet.reInit();
		});
		// img.mousedown(function mousedown(e) {
		// 	// var con = layerManage.instances;
		// 	con.layerControllerSet.forEach(function(layerControllerSet) {
		// 		layerControllerSet.animate({
		// 			opacity: 0
		// 		}, 200);
		// 	})
		// 	layerControllerSet.animate({
		// 		opacity: 1
		// 	}, 200);
		// });

	};
	// module.exports = {
	// 	Layer: Layer
	// };
	// exports.Layer = Layer;
	return Layer;
});