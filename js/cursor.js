define("cursor", [], function(require, exports, module) {
	var TO_RADIANS = Math.PI / 180;
	var cursor = {};
	var defaultCursor = [
		"lb_rt", "lr", "lt_rb", "move", "tb"
	];
	var baseUrl = "../img/cursor/";

	function cursorTransform(canvas,cursorUrl) {
		var context = canvas.getContext("2d");
		var img = new Image();
		img.src = cursorUrl;
		var loaded = false;
		img.onload = function(){loaded = true}
		var x = 16,
			y = 16,
			bak = canvas;
		var cache;
		cursor[canvas.id] = function getRotatedCursor(angle) {
			// console.log(context.canvas)
			angle = parseInt(angle);
			if (cache[angle]) {
				// console.log("get cache")
				return cache[angle];
			}
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.save();

			context.translate(x, y);
			context.rotate(angle * TO_RADIANS);
			context.drawImage(img, -(img.width / 2), -(img.height / 2));
			console.log("save cache")
			var result = canvas.toDataURL();
			if (loaded) {cache[angle] = result}
			context.restore();
			return result;
		}
		cache = cursor[canvas.id].cache = {};
		// cursor[canvas.id](0);
	};
	(function() {
		defaultCursor.forEach(function(canvasType) {
			canvas = document.createElement("canvas");
			canvas.id = canvasType;
			canvas.width = canvas.height = 32;
			cursorTransform(canvas,baseUrl+canvasType+".png");
		});
	}());
	cursor["n-resize"] = cursor["s-resize"] = cursor["tb"];
	cursor["w-resize"] = cursor["e-resize"] = cursor["lr"];
	cursor["ne-resize"] = cursor["sw-resize"] = cursor["lb_rt"];
	cursor["nw-resize"] = cursor["se-resize"] = cursor["lt_rb"];
	cursor["move"] = cursor["move"];

	module.exports = cursor;
});
