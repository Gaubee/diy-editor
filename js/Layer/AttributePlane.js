define("AttributePlane", ["filter"], function(require, exports, module) {
	var filter = require("filter");
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
			}).on("blur", "input", function(e) {
				callback(this)
			}).on("keyup", "input", function(e) {
				if (e.which === 13) {
					callback(this)
				}
			});
			el._$editArea = _editArea;
			el._textAreas = Array.prototype.slice.call(el.childNodes);
		}
		_editArea.find("input").val(content);
		el._textAreas.forEach(function(textElment) {
			el.removeChild(textElment)
		});
		el.appendChild(_editArea[0]);
	}
	var initAttributePlane = function() {
		var _self = this,
			layerAttribute = _self.layerAttribute,
			attrViewInstance = _self.attrVI = (layerAttribute.type === "font" ? ViewParser.modules["aside_font"] : ViewParser.modules["aside"])(_self.layerAttribute).append($aside[0]),
			$nodeTree = $("#attribute_plane_" + _self.id),
			$buttons = $nodeTree.find("button");
		$nodeTree.on("click", ".control-label", function(e) {
			var labelElement = this,
				attrName = labelElement.getAttribute("attr-name");
			if (!labelElement._status && !layerAttribute.lock) {
				_canEditAble(labelElement, function(inputElement) {
					if (labelElement._status) {
						labelElement._status = false;
						var value = inputElement.value
						if (typeof layerAttribute[attrName] === "number") {
							var value = parseInt(value);
							if (!isNaN(value)) {
								layerAttribute[attrName] = value;
								_self.reInit();
							}
						} else {
							layerAttribute[attrName] = value;
							_self.reInit();
						}

						labelElement.removeChild(labelElement._$editArea[0]);
						labelElement._textAreas.forEach(function(textElment) {
							labelElement.appendChild(textElment)
						});
					};
				});
				labelElement._status = true;
			}
		}).on("click", ".color", function(e) {
			$(this).find("input").colorpicker().on('changeColor', function(ev) {
				_self.layerAttribute.color = ev.color.toHex();
				_self.reInit();
			});
		});
		$nodeTree.on("mouseenter", function(e) {
			_self.focus();
			require("sketchpadManage").refreshLayerManager();
		}).on("mouseleave", function(e) {
			_self.blur();
			require("sketchpadManage").refreshLayerManager();
		});
		var buttonEvents = {
			"left": function(e) {
				_self.layerAttribute.x -= 5;
				_self.reInit()
			},
			"up": function(e) {
				_self.layerAttribute.y -= 5;
				_self.reInit()
			},
			"down": function(e) {
				_self.layerAttribute.y += 5;
				_self.reInit()
			},
			"right": function(e) {
				_self.layerAttribute.x += 5;
				_self.reInit()
			},
			"rotate": function(e) {
				_self.layerAttribute.rotate += 15;
				_self.reInit()
			},
			"float": function(e) {
				_self.up();
			},
			"sink": function(e) {
				_self.down();
			},
			"out": function(e) {
				var sW = _self.layerAttribute.width,
					nW = ~~ (sW *= 0.1),
					sH = _self.layerAttribute.height,
					nH = ~~ (sH *= 0.1);
				_self.layerAttribute.width -= nW
				_self.layerAttribute.height -= nH
				_self.layerAttribute.x += (nW) / 2;
				_self.layerAttribute.y += (nH) / 2;
				_self.reInit()
			},
			"in": function(e) {
				var sW = _self.layerAttribute.width,
					nW = ~~ (sW *= 0.1),
					sH = _self.layerAttribute.height,
					nH = ~~ (sH *= 0.1);
				_self.layerAttribute.width += nW
				_self.layerAttribute.height += nH
				_self.layerAttribute.x -= (nW) / 2;
				_self.layerAttribute.y -= (nH) / 2;
				_self.reInit()
			},
			"fullscreen": function(e) {
				_self.toMax();
				_self.lock();
				_self.reInit()
			},
			"cut": function(e) {
				var cutLayer = $('#cutLayer');
				cutLayer.modal();
			},
			"filter": function(e) {
				filter.show(_self.img.node.href.baseVal,function(newSrc){
					_self.img.node.href.baseVal = newSrc;
				})
			},
			"lock": function(e) {
				_self.lock();
				_self.reInit()
			},
			"unlock": function(e) {
				console.log("unlock")
				_self.unlock();
				_self.reInit()
			},
			"remove":function(e){
				require("confirm")("确定要删除 "+_self.layerAttribute.name+" 吗？",function(arg){
					if (arg) {
						console.log("remove!!!!")
					}
				})
			}
		}
		$buttons.tooltip();
		$nodeTree.on("click", "button", function(e) {
			var buttonElement = this,
				type = buttonElement.getAttribute("attr-event"),
				buttonEvent = buttonEvents[type];
			if (buttonEvent) {
				buttonEvent.call(buttonElement, e)
			}
		})
	};
	return function(LayerConstructor) {
		LayerConstructor.prototype.initAttributePlane = initAttributePlane;
		var _LayerReInit = LayerConstructor.prototype.reInit;
		LayerConstructor.prototype.reInit = function() {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				attrViewInstance = _self.attrVI;
			_LayerReInit.call(_self);
			attrViewInstance.set(layerAttribute);
			return _self;
		}
		LayerConstructor.initQueue.push({
			name: "initAttributePlane",
			handle: function(layerInstance) {
				layerInstance.initAttributePlane()
			}
		});
	};
})