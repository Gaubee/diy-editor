define("main", ["sketchpadManage"], function(require, exports, module) {
	var sketchpadManage = require("sketchpadManage");
	var $header = $("#header"),
		$nav = $("#nav"),
		$plane = $("#plane"),
		$mterial = $("#mterial"),
		$aside = $("#aside"),
		$footer = $("#footer");



	var mterialPanel = sketchpadManage.createMaterialPanel({
		data: {
			lists: [{
				title: "小配件",
				mterials: [{
					imgSrc: "../img/earth.png"
				}, {
					imgSrc: "../img/flower.jpg"
				}, {
					imgSrc: "../img/earth.png"
				}, {
					imgSrc: "../img/flower.jpg"
				}]
			}, {
				title: "背景",
				mterials: [{
					imgSrc: "../img/flower.jpg"
				}, {
					imgSrc: "../img/earth.png"
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