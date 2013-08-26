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
		text: "Hello world",
		color: "#333",
		"font-size": 16,
		cacheSize: 16,
		"font-family": "sans-serif",
		"font-weight": 200
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
		name:"initLock",
		handle:function(layerInstance){
			if (layerInstance.layerAttribute.lock) {
				layerInstance.layerAttribute.lock = false;
				setTimeout(function(){
					layerInstance.lock().reInit().blur();
				},24);
			}
		}
	},{
		name:"initBackground",
		handle:function(layerInstance){
			if (layerInstance.layerAttribute.type==="background") {
				layerInstance.layerAttribute.type="img";
				setTimeout(function(){
					layerInstance.toMax().lock().reInit();
				});
			}
		}
	},{
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
				console.log(layerAttribute.text)
				img = paper.text(layerAttribute.x, layerAttribute.y, layerAttribute.text);
				layerInstance._reInit = _reInitFont;
				layerInstance.initImgHandle(img);
				setTimeout(function() {
					layerInstance.reInit();
					layerInstance.reInit();
				}, 0)
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
			if (!layerAttribute.lock) {
				layerAttribute.x = dx - layerAttribute.cacheX + layerAttribute.x;
				layerAttribute.y = dy - layerAttribute.cacheY + layerAttribute.y;
				layerAttribute.cacheX = dx;
				layerAttribute.cacheY = dy;
				_self.reInit();
			}
		}, function onstart(x, y, e) {
			// console.log("onstart",x,y,e);
			_self._clickEvent && _self._clickEvent(e);
			// layerControllerSet.animate({
			// 	opacity: 0
			// }, 200);
		}, function onend(e) {
			// console.log("onend",e);
			layerAttribute.cacheX = 0;
			layerAttribute.cacheY = 0;
			// layerAttribute.x = img.attr("x");
			// layerAttribute.y = img.attr("y");
			// layerControllerSet.animate({
			// 	opacity: 1
			// }, 200);
			_self.reInit();
		});
		/*.mouseover(function mouseover(e) {
			// layerAttribute.active = true;
			_self.delayReInit();
		}).mouseout(function mouseout(e) {
			// layerAttribute.active = false;
			_self.delayReInit();
		});
		*/
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
		if (layerAttribute["font-size"] < 1) {
			layerAttribute["font-size"] = layerAttribute.cacheSize = 1
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
			return _self;
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
	};
	$("body").append($("<div class='__s__'><span id='__s__'></span></div>"));
	var __s = $("#__s__");

	function _reInitFont() {
		var _self = this,
			img = _self.img,
			layerAttribute = _self.layerAttribute;
		_self.checkAttribute();
		if (layerAttribute.lock) {
			return _self;
		}

		// transform_R = "r" + layerAttribute.rotate, (layerAttribute.x - layerAttribute.RC_x) + layerAttribute.width / 2, (layerAttribute.y - layerAttribute.RC_y) + layerAttribute.height / 2
		var transform_R = ["r" + layerAttribute.rotate, layerAttribute.x, layerAttribute.y,
			"T" + layerAttribute.width / 2, layerAttribute.height / 2
		]
		__s.css({
			"fontSize": layerAttribute["font-size"],
			"fontFamily": layerAttribute["font-family"],
			"fontWeight": layerAttribute["font-weight"]
		});
		__s.html(layerAttribute.text)
		var _swidth = __s.width(),
			_sheight = __s.height(),
			proportion = _swidth / _sheight,
			_size = layerAttribute["font-size"];
		// console.log(proportion)
		if (layerAttribute.cacheSize === _size) {
			if (layerAttribute.width / proportion > layerAttribute.height) {
				layerAttribute["font-size"] = layerAttribute.height * (_size / _sheight);
			} else {
				layerAttribute["font-size"] = layerAttribute.width * (_size / _swidth);
			}
			layerAttribute.cacheSize = layerAttribute["font-size"] = ~~layerAttribute["font-size"];;
		} else {
			layerAttribute.height = _sheight;
			layerAttribute.width = _swidth;
			layerAttribute.cacheSize = layerAttribute["font-size"]; // = ~~layerAttribute["font-size"];
			// _self.reInit();
			_self.reInit();
			return _self;
		}
		// layerAttribute.width = __s.width() + 20;
		// layerAttribute.height = __s.height() + 10;
		img.attr({
			width: layerAttribute.width,
			height: layerAttribute.height,
			x: layerAttribute.x, // + layerAttribute.width / 2,
			y: layerAttribute.y, // + layerAttribute.height/2,
			"font-family": layerAttribute["font-family"],
			"font-weight": layerAttribute["font-weight"],
			"font-size": layerAttribute["font-size"],
			text: layerAttribute.text,
			fill:layerAttribute.color,
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