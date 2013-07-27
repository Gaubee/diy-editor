seajs.config({
	base:"../js/",
	alias:{
		'jQuery':"lib/jquery-2.0.3.min.js",
		'Raphael':"lib/raphael-min.js",//svg tool
		// 'Raphael':"../sea-modules/gallery/raphael/2.1.0/raphael",
		'THREE':"lib/three.min.js",//3D show
		'canvg':"lib/canvg.js",//export svg to canvas
		'rgbcolor':"lib/rgbcolor.js"//about color,depend on canvg
	}
});
/*
seajs.config({
	base: "../js/",
	plugins: ['shim','text'],
	alias: {
		jQuery: {
			src: "lib/jquery-2.0.3.min.js",
			exports: "jQuery"
		},
		Raphael: {
			src: "lib/raphael-min.js", //svg tool
			exports: "Raphael"
		},
		THREE: {
			src: "lib/three.min.js", //3D show
			exports: "THREE"
		},
		canvg: {
			src: "lib/canvg.js", //export svg to canvas
			exports: "canvg"
		},
		rgbcolor: {
			src: "lib/rgbcolor.js", //about color,depend on canvg
			deps: ['jQuery'],
			exports: "rgbcolor"
		}
	}
});
*/