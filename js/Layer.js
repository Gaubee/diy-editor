define("Layer", ["Layer/AttributePlane", "Layer/ControllerSet", "Layer/cursor"], function(require, exports, module) {

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
		type: "img",
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
		active: true,
		cacheActive: false,
		handleActive: false,
		cacheHandleActive: false,
		activeStatus: 0,
		keepActive: false,
		src: "",
		zIndex: 0,
		lock: false,
		//font
		text:"Hello world",
		color:"#EEEEEE",
		"font-size":16
	};

	var __id = 0;

	function Layer(paper, layerConfig) {
		var _self = this;
		if (!(_self instanceof Layer)) {
			return new Layer(paper, layerConfig);
		}
		//---------------

		_self.skechpad = paper;
		_self.id = __id++;
		//format layerConfig to layerAttribute
		var layerAttribute = _self.layerAttribute = layerDefaultAttribute(layerConfig);
		layerAttribute.id = _self.id;
		layerAttribute.name = layerAttribute.name || ("图层" + _self.id);
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
				img; //
			if (layerAttribute.type === "img") {
				img = paper.image((layerAttribute.src || "../demo/img/flower.jpg"), layerAttribute.x, layerAttribute.y, layerAttribute.width, layerAttribute.height);
				layerInstance.initImgHandle(img);
			}
		}
	}, {
		name: "initFont",
		handle: function(layerInstance) {
			var paper = layerInstance.skechpad,
				layerAttribute = layerInstance.layerAttribute,
				//a panel -- name as 'img'
				img; //
			if (layerAttribute.type === "font") {
				img =paper.text(layerAttribute.x, layerAttribute.y, layerAttribute.src);
				layerInstance.initImgHandle(img);
			}
		}
	}]
	Layer.prototype.initImgHandle = function initImgHandle(img) {
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
			// layerAttribute.active = true;
			_self.delayReInit();
		}).mouseout(function mouseout(e) {
			// layerAttribute.active = false;
			_self.delayReInit();
		});
		// img.click(function(e){
		// 	_self.focus();
		// });
		return _self;
	};

	Layer.prototype.checkAttribute = function checkAttribute() {
		var _self = this,
			layerAttribute = _self.layerAttribute;
		if (layerAttribute.width < 0) {
			layerAttribute.width = 0
		}
		if (layerAttribute.height < 0) {
			layerAttribute.height = 0
		}
		// if (layerAttribute.x < 0) {
		// 	layerAttribute.x = 0
		// }
		// if (layerAttribute.y < 0) {
		// 	layerAttribute.y = 0
		// }
		return _self;
	};
	Layer.prototype.reInit = function reInit() {
		var _self = this,
			img = _self.img,
			layerAttribute = _self.layerAttribute;
		_self.checkAttribute();
		if (layerAttribute.lock) {
			return;
		}

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
		return _self;
	}
	Layer.prototype.delayReInit = function delayReInit(delayTime) {
		var _self = this;
		clearTimeout(_self.delayReInit['activeTime']);
		_self.delayReInit['activeTime'] = setTimeout(function() {
			_self.reInit.call(_self)
		}, delayTime || 60);
		return _self;
	};
	Layer.prototype.layIndex = function toIndex(index) {
		index > 0 ? index += 0.1 : index -= 0.1;
		var _self = this;
		_self.layerAttribute.zIndex += index;
		var lis = require("layerManage").instances.slice();
		lis.sort(function(a, b) {
			return a.layerAttribute.zIndex - b.layerAttribute.zIndex;
		});
		lis.forEach(function(layerInstance, index) {
			layerInstance.layerAttribute.zIndex = index
			layerInstance.img.toFront();
			layerInstance.layerControllerSet.toFront();
		});
		require("sketchpadManage").refreshLayerManager();
		return _self;
	};
	Layer.prototype.up = function toFront() {
		var _self = this;
		_self.layIndex(1);
		return _self;
	};
	Layer.prototype.down = function toBack() {
		var _self = this;
		_self.layIndex(-1);
		return _self;
	};
	Layer.prototype.focus = function activeLayer() {
		var _self = this;
		_self.layerAttribute.active = true;
		return _self;
	};
	Layer.prototype.blur = function leaveLayer() {
		var _self = this;
		_self.layerAttribute.active = false;
		return _self;
	};
	Layer.prototype.lock = function lockLayer() {
		var _self = this;
		if (!_self.layerAttribute.lock) {
			_self.layerAttribute.lock = true;
		}
		return _self;
	};
	Layer.prototype.unlock = function unlockLayer() {
		var _self = this;
		if (_self.layerAttribute.lock) {
			_self.layerAttribute.lock = false;
		}
		return _self;
	};
	Layer.prototype.toMax = function toBackground() {
		var _self = this;
		_self.layerAttribute.width = _self.skechpad.width;
		_self.layerAttribute.height = _self.skechpad.height;
		_self.layerAttribute.x = 0;
		_self.layerAttribute.y = 0;
		_self.layerAttribute.rotate = 0;
		_self.reInit()
		_self.layIndex(-1000);
		return _self;
	};
	require("ControllerSet")(Layer);
	require("AttributePlane")(Layer);
	return Layer;
});