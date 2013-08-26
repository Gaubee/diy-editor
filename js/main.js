define("main", ["sketchpadManage", "templates"], function(require, exports, module) {
	var sketchpadManage = require("sketchpadManage"),
		templates = require("templates");
	var $header = $("#header"),
		$nav = $("#nav"),
		$plane = $("#plane"),
		$mterial = $("#mterial"),
		$aside = $("#aside"),
		$footer = $("#footer");

	templates.set("tem1", [{
		attr: {
			type: "background",
			src: "../img/earth.png"
		}
	}, {
		attr: {
			type: "font",
			text: "Hello world!!",
			x: 10,
			y: 12,
			"font-size": 24,
			"font-family": "华文行楷",
			lock: true
		}
	}]).set("tem2", [{
		attr: {
			type: "font",
			text: "I'm In China",
			x: 180,
			y: 40,
			"font-size": 42,
			"font-family": "华文行楷",
			lock: false
		}
	}, {
		attr: {
			src:"../img/flower.jpg",
			x: 230,
			y: 80,
			lock: true
		}
	}]);

	var mterialPanel = sketchpadManage.createMaterialPanel({
		data: {
			lists: [{
				title: "艺术字",
				mterials: [{
					imgSrc: "../img/宋体.jpg",
					layerAttr: {
						type: "font",
						width: 200,
						height: 20,
						src: "宋体"
					}
				}]
			}, {
				title: "小配件",
				mterials: [{
					imgSrc: "../img/earth.png",
					layerAttr: {
						type: "layer",
						width: 0,
						height: 0,
						src: "../img/earth.png"
					}
				}, {
					imgSrc: "../img/flower.jpg",
					layerAttr: {
						type: "layer",
						width: 0,
						height: 0,
						src: "../img/flower.jpg"
					}
				}, {
					imgSrc: "../img/earth.png",
					layerAttr: {
						type: "layer",
						width: 0,
						height: 0,
						src: "../img/earth.png"
					}
				}, {
					imgSrc: "../img/flower.jpg",
					layerAttr: {
						type: "layer",
						width: 0,
						height: 0,
						src: "../img/flower.jpg"
					}
				}]
			}, {
				title: "背景",
				mterials: [{
					imgSrc: "../img/flower.jpg",
					layerAttr: {
						type: "background",
						src: "../img/flower.jpg"
					}
				}, {
					imgSrc: "../img/earth.png",
					layerAttr: {
						type: "background",
						src: "../img/earth.png"
					}
				}]
			}, {
				title: "模板",
				mterials: [{
					imgSrc: "../img/earth.png",
					layerAttr: {
						type: "template",
						src: "tem1"
					}
				},{
					imgSrc: "../img/flower.jpg",
					layerAttr: {
						type: "template",
						src: "tem2"
					}
				}]
			}]
		},
		container: $mterial
	});
	var sketchpad = sketchpadManage.create({
		className: "span9",
		width: 700,
		container: $plane
	});
});
require = seajs.require;