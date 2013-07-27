define("main",["sketchpadManage"],function (require, exports, module) {
	var sketchpadManage = require("sketchpadManage");
	var sketchpad = sketchpadManage.create();
	var button = document.createElement("button");
	button.innerHTML="add img";
	button.onclick = function(){sketchpad.createLayer()};
	document.body.appendChild(button);
});
require = seajs.require;