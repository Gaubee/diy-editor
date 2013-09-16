define("fileController", ["sketchpadManage"], function(require, exports, module) {
	var sketchpads = require("sketchpadManage").instances,
		$file_save = $("#file_save"),
		canvas = document.createElement("canvas");

		document.body.appendChild(canvas)

		console.log($file_save)
		$file_save.on("click", function() {
			sketchpads.forEach(function(sketchpad) {
				console.log("save")
				var data = sketchpad.canvas.parentNode.innerHTML.replace("<svg",'<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
				var $dataNode = $("<div>" + data + "</div>");
				$dataNode.find("path").remove();
				$dataNode.find("circle").remove();
				canvg(canvas, $dataNode.html(), {
					ignoreMouse: true,
					ignoreAnimation: true
				});
				window.CC = canvas;

			});
		})
});