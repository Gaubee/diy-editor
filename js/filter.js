define("filter", [], function(require, exports, module) {
	var filterLayer = $('#filterLayer'),
		filterSet = $("#filter-set"),
		img = filterLayer.find(".modal-body .img"),
		baseImg = new Image();
	var session = [];
	filterLayer.find("button").tooltip();
	var filterHandles = {
		temp: {
			Mosaic_blockSize: 5
		},
		"Blur": function(e, callback) {
			Pixastic.process(img[0], "blur", null, callback)
		},
		"Desaturate": function(e, callback) {
			Pixastic.process(img[0], "desaturate", null, callback)
		},
		"Sepia": function(e, callback) {
			Pixastic.process(img[0], "sepia", null, callback)
		},
		"Emboss": function(e, callback) {
			Pixastic.process(img[0], "emboss", null, callback)
		},
		"Mosaic": function(e, callback) {
			Pixastic.process(baseImg, "mosaic", {
				blockSize: filterHandles.temp.Mosaic_blockSize++
			}, callback)
		},
		"Glow": function(e, callback) {
			Pixastic.process(img[0], "glow", {
				amount: 0.1,
				radius: 0.5
			}, callback)
		},
		"Invert": function(e, callback) {
			Pixastic.process(img[0], "invert", null, callback)
		},
		"Remove Noise": function(e, callback) {
			Pixastic.process(img[0], "removenoise", null, callback)
		}
	};
	filterLayer.on("click", ".filter button", function(e) {
		console.log($(this).data("filter"))
		var filter_handle = filterHandles[$(this).data("filter")];
		if (filter_handle) {
			var $buttons = filterLayer.find(".filter button").prop("disabled", true);
			filter_handle.call(this, e, function(canvas) {
				var src = canvas.toDataURL();
				session.push(img[1].src);
				img[0].src = img[1].src = src;
				$buttons.prop("disabled", false);
			});
		}
	}).on("click", ".undo", function(e) {
		img[0].src = img[1].src = session.pop();
	}).on("click", ".reset", function(e) {
		if (session.length) {
			img[0].src = img[1].src = session[0];
			filterHandles.temp.Mosaic_blockSize = 3;
			session = []
		}
	});
	var _callback;
	filterSet.on("click",function(){
		_callback&&_callback(img[1].src);
		filterLayer.modal('toggle');
	});
	module.exports = {
		show: function(src,callback) {
			filterHandles.temp.Mosaic_blockSize = 3;
			session = [];
			filterLayer.modal();
			img.attr({
				src: src
			})
			baseImg.src = src;
			_callback = callback;
		}
	}
});