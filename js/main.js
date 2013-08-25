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
					imgSrc: "../img/earth.png",
					layerAttr:{
						type:"layer",
						width:0,
						height:0,
						src:"../img/earth.png"	
					}
				}, {
					imgSrc: "../img/flower.jpg",
					layerAttr:{
						type:"layer",
						width:0,
						height:0,
						src:"../img/flower.jpg"	
					}
				}, {
					imgSrc: "../img/earth.png",
					layerAttr:{
						type:"layer",
						width:0,
						height:0,
						src:"../img/earth.png"	
					}
				}, {
					imgSrc: "../img/flower.jpg",
					layerAttr:{
						type:"layer",
						width:0,
						height:0,
						src:"../img/flower.jpg"	
					}
				}]
			}, {
				title: "背景",
				mterials: [{
					imgSrc: "../img/flower.jpg",
					layerAttr:{
						type:"background",
						src:"../img/flower.jpg"	
					}
				}, {
					imgSrc: "../img/earth.png",
					layerAttr:{
						type:"background",
						src:"../img/earth.png"	
					}
				}]
			},{
				title:"艺术字",
				mterials:[{
					imgSrc:"../img/宋体.jpg",
					layerAttr:{
						type:"font",
						width:200,
						height:20,
						src:"宋体"
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