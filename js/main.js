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
			title: ["BG"],
			content: {
				"BG": ["../img/earth.png", "../img/flower.jpg"]
			}
		},
		container: $mterial
	});
	var sketchpad = sketchpadManage.create({
		container: $plane
	});
});
require = seajs.require;