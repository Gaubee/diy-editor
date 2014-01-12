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
	window._confirm = window.confirm;
	window.confirm = function(text,callback){
		confirmText.html(text);
		_callback = callback;
		confirmLayer.modal();
	}
	window._prompt = window.prompt;
	var prompt_window_pro = $("<input class='span4' id='prompt_window_pro'>");
	window.prompt = function (text,placeholder,callback) {
		var promptText = $("<div>"+text+"</div>");
		var id = "prompt_window_pro";
		promptText.append("<br>");
		promptText.append(prompt_window_pro);
		prompt_window_pro.val(placeholder);
		confirm(promptText,function(e){
			callback&&callback(prompt_window_pro.val());
			prompt_window_pro.val("");
		})
	}
})();
