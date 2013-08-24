define("main", ["sketchpadManage"], function(require, exports, module) {
	var sketchpadManage = require("sketchpadManage");
	var $header = $("#header"),
		$nav = $("#nav"),
		$plane = $("#plane"),
		$mterial = $("#mterial"),
		$aside = $("#aside"),
		$footer = $("#footer");



	var mterialPanel = sketchpadManage.createMaterialPanel({
		tree: {
			title: ["小配件","背景"],
			content: {
				"小配件": ["../img/earth.png", "../img/flower.jpg", "../img/earth.png", "../img/flower.jpg"],
				"背景":["../img/flower.jpg", "../img/earth.png"]
			}
		},
		container: $mterial
	});
	var sketchpad = sketchpadManage.create({
		className:"span9",
		width:700,
		container: $plane
	});
});
require = seajs.require;
