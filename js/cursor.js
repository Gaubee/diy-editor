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
		var x = 16,
			y = 16,
			bak = canvas;
		cursor[canvas.id] = function getRotatedCursor(angle) {
			// console.log(context.canvas)
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.save();

			context.translate(x, y);
			context.rotate(angle * TO_RADIANS);
			context.drawImage(img, -(img.width / 2), -(img.height / 2));
			var result = canvas.toDataURL();
			context.restore();
			return result;
		}
		cursor[canvas.id](0);
	};
	(function() {
		defaultCursor.forEach(function(canvasType) {
			canvas = document.createElement("canvas");
			canvas.id = canvasType;
			cursorTransform(canvas,baseUrl+canvasType+".png");
		});
	}());
	cursor["n-resize"] = cursor["s-resize"] = cursor["lr"];
	cursor["w-resize"] = cursor["e-resize"] = cursor["tb"];
	cursor["ne-resize"] = cursor["sw-resize"] = cursor["lt_rb"];
	cursor["nw-resize"] = cursor["se-resize"] = cursor["lb_rt"];
	cursor["move"] = cursor["move"];

	module.exports = cursor;
});
