define("Layer", ["Layer/AttributePlane","Layer/ControllerSet","Layer/cursor"], function(require, exports, module) {

	var layerInterface = { //will binding in each Layer
		move: function(x, y) {

		},
		resize: function(width, height) {

		},
		rotate: function(deg) {

		}
	};
	var layerDefaultAttribute = function layerDefaultAttribute(layerAttribute) {
		if (!(this instanceof layerDefaultAttribute)) {
			return new layerDefaultAttribute(layerAttribute)
		}
		for (var i in layerAttribute) {
			this[i] = layerAttribute[i];
		}
	};
	layerDefaultAttribute.prototype = {
		width: 144,
		height: 96,
		cacheW: 0,
		cacheH: 0,
		RC_x: 0,
		RC_y: 0,
		x: 20,
		y: 80,
		cacheX: 0,
		cacheY: 0,
		rotate: 0,
		active: false,
		cacheActive: false,
		handleActive: false,
		cacheHandleActive: false,
		activeStatus: 0,
		keepActive: false,
		src: ""
	};


	function Layer(paper, layerConfig) {
		var _self = this;
		if (!(_self instanceof Layer)) {
			return new Layer(paper, layerConfig);
		}
		//---------------

		_self.skechpad = paper;

		//format layerConfig to layerAttribute
		var layerAttribute = _self.layerAttribute = layerDefaultAttribute(layerConfig);

		Layer.initQueue.forEach(function(initHandler) {
			console.log("init " + initHandler.name);
			initHandler.handle(_self);
		})

	};
	Layer.initQueue = [{
		name: "initImg",
		handle: function(layerInstance) {
			var paper = layerInstance.skechpad,
				layerAttribute = layerInstance.layerAttribute,
			//a panel -- name as 'img'
				img = paper.image((layerAttribute.src || "../demo/img/flower.jpg"), layerAttribute.x, layerAttribute.y, layerAttribute.width, layerAttribute.height);
			layerInstance.initImg(img);
		}
	}]
	Layer.prototype.initImg = function initImg(img) {
		var _self = this,
			layerAttribute = _self.layerAttribute,
			layerControllerSet = _self.layerControllerSet;
		if (typeof img === "string") {
			img = _self.skechpad.image(img, layerAttribute.x, layerAttribute.y, layerAttribute.width, layerAttribute.height);
		}
		_self.img = img;

		img.drag(function onmove(dx, dy, x, y, e) { //init img
			// console.log("onmove",dx,dy,x,y,e);
			layerAttribute.x = dx - layerAttribute.cacheX + layerAttribute.x;
			layerAttribute.y = dy - layerAttribute.cacheY + layerAttribute.y;
			layerAttribute.cacheX = dx;
			layerAttribute.cacheY = dy;

			_self.reInit();
		}, function onstart(x, y, e) {
			// console.log("onstart",x,y,e);
			// layerControllerSet.animate({
			// 	opacity: 0
			// }, 200);
		}, function onend(e) {
			// console.log("onend",e);
			layerAttribute.cacheX = 0;
			layerAttribute.cacheY = 0;
			layerAttribute.x = img.attr("x");
			layerAttribute.y = img.attr("y");
			// layerControllerSet.animate({
			// 	opacity: 1
			// }, 200);
			_self.reInit();
		}).mouseover(function mouseover(e) {
			layerAttribute.active = true;
			_self.delayReInit();
		}).mouseout(function mouseout(e) {
			layerAttribute.active = false;
			_self.delayReInit();
		});
	};
	
	Layer.prototype.checkAttribute = function checkAttribute() {
		var layerAttribute = this.layerAttribute;
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
	Layer.prototype.reInit = function reInit() {
		var _self = this,
			img = _self.img,
			layerAttribute = _self.layerAttribute;
		_self.checkAttribute();

		// transform_R = "r" + layerAttribute.rotate, (layerAttribute.x - layerAttribute.RC_x) + layerAttribute.width / 2, (layerAttribute.y - layerAttribute.RC_y) + layerAttribute.height / 2
		var transform_R = ["r" + layerAttribute.rotate, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y + layerAttribute.height / 2]

		img.attr({
			width: layerAttribute.width,
			height: layerAttribute.height,
			x: layerAttribute.x,
			y: layerAttribute.y,
			// transform: ["r" + layerAttribute.rotate, layerAttribute.x + layerAttribute.width / 2, layerAttribute.y + layerAttribute.height / 2]
			transform: transform_R
		});
		if (!layerAttribute.keepActive) {
			if (!(layerAttribute.cacheActive === layerAttribute.active) || !(layerAttribute.cacheHandleActive === layerAttribute.handleActive)) {
				layerAttribute.activeStatus = (layerAttribute.active || layerAttribute.handleActive ? 1 : 0);
				// layerControllerSet.animate({
				// 	opacity: layerAttribute.activeStatus
				// }, 200);
				layerAttribute.cacheActive = layerAttribute.active;
				layerAttribute.cacheHandleActive = layerAttribute.handleActive;
			}
		}
	}
	Layer.prototype.delayReInit = function delayReInit(delayTime) {
		var _self = this;
		clearTimeout(_self.delayReInit['activeTime']);
		_self.delayReInit['activeTime'] = setTimeout(function() {
			_self.reInit.call(_self)
		}, delayTime || 60);
	};

	require("ControllerSet")(Layer);
	require("AttributePlane")(Layer);
	return Layer;
});