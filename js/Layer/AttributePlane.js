define("AttributePlane", [], function(require, exports, module) {

	var $aside = $("#aside");
	var _canEditAble = function(el, callback) {
		var _editArea = el._editArea,
			textContent = el.textContent,
			title = textContent.substring(0, textContent.indexOf(":") + 1),
			content = textContent.replace(title, "");
		if (!_editArea) {
			var _editArea = $(['<div class="input-prepend input-append">',
				'<span class="add-on">' + title + '</span>',
				'<input class="span2" type="text">',
				'</div>'
			].join("\n"));
			_editArea.on("change", "input", function(e) {
				callback(this)
			}).on("blur", "input",function(e){
				callback(this)
			}).on("keyup","input",function(e){
				if (e.which === 13) {
					callback(this)
				}
			});
			el._$editArea = _editArea;
			el._textAreas = Array.prototype.slice.call(el.childNodes);
		}
		_editArea.find("input").val(content);
		console.log(el._textAreas)
		el._textAreas.forEach(function(textElment){
			el.removeChild(textElment)
		});
		el.appendChild(_editArea[0]);
	}
	var initAttributePlane = function() {
		var _self = this,
			attrViewInstance = _self.attrVI = ViewParser.modules["aside"](_self.layerAttribute).append($aside[0]),
			$nodeTree = $("#attribute_plane_" + _self.id);
		$nodeTree.on("click", ".control-label", function() {
			var labelElement = this,
				attrName = labelElement.getAttribute("attr-name");
			if (!labelElement._status) {
				_canEditAble(labelElement,function(inputElement){

					var value = parseInt(inputElement.value);
					if (isNaN(value)) {
						liElement.innerHTML = _sText;
					} else {
						_self.layerAttribute[attrName] = value;
						_self.reInit();
					}

					var el = labelElement;
					el.removeChild(el._$editArea[0]);
					el._textAreas.forEach(function(textElment){
						el.appendChild(textElment)
					});

					labelElement._status = false;
				});
				labelElement._status = true;
			}
		});
	};
	return function(LayerConstructor) {
		LayerConstructor.prototype.initAttributePlane = initAttributePlane;
		var _LayerReInit = LayerConstructor.prototype.reInit;
		LayerConstructor.prototype.reInit = function() {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				attrViewInstance = _self.attrVI;
			_LayerReInit.call(_self);
			attrViewInstance.set(layerAttribute)
		}
		LayerConstructor.initQueue.push({
			name: "initAttributePlane",
			handle: function(layerInstance) {
				layerInstance.initAttributePlane()
			}
		});
	};
})