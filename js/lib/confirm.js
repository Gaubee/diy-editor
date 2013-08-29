!(function(require, exports, module) {
	var confirmLayer = $("#confirmLayer"),
		confirmText = confirmLayer.find(".confirmText"),
		yesButton = confirmLayer.find(".modal-footer .yes"),
		noButton = confirmLayer.find(".modal-footer .no"),
		_callback;
	yesButton.on("click",function(e){
		_callback&&_callback(true);
		confirmLayer.modal('toggle');
	});
	noButton.on("click",function(e){
		_callback&&_callback(false);
		confirmLayer.modal('toggle');
	});
	window.confirm = window._confirm;
	window.confirm = function(text,callback){
		confirmText.html(text);
		_callback = callback;
		confirmLayer.modal();
	}
})();
