define("AttributePlane", [], function(require, exports, module) {
	var imgLayer = [{
		title: "坐标-Coordinate",
		content: {
			name: "coordinate",
			items: [{
				title: "X:",
				name: "x",
				unit: "px"
			}, {
				title: "Y:",
				name: "y",
				unit: "px"
			}]
		}
	}, {
		title: "大小-Size",
		content: {
			name: "size",
			items: [{
				title: "Width:",
				name: "width",
				unit: "px"
			}, {
				title: "Height:",
				name: "height",
				unit: "px"
			}]
		}
	}, {
		title: "角度-Angle",
		content: {
			name: "angle",
			items: [{
				title: "Rotate:",
				name: "rotate",
				unit: "deg"
			}]
		}
	}, ];
	var _canEditAble = function(el, config, callback) {
		if (el.childNodes[0].nodeType === 3) {
			console.log("el.textContent:", el.innerText, "config.title:", config.title)
			var inputText = el.textContent.replace(config.title, ""),
				inputElement;

			el.innerHTML = ['<div class="input-prepend input-append">',
				'<span class="add-on">' + config.title + '</span>',
				'<input class="span2"  type="text">',
				'<span class="add-on">' + config.unit + '</span>',
				'</div>'
			].join("\n");
			inputElement = $(el).find("input")[0];
			inputElement.value = inputText;

			inputElement.addEventListener("change", function(e) {
				callback(this)
			});
			inputElement.addEventListener("keyup", function(e) {
				if (e.which === 13) {
					callback(this)
				}
			})
		}
	}
	var initAttributePlane = function() {
		var _self = this,
			elementBingDOM = _self._EBD = [];
		elementBingDOM._ = {};
		var imgLayerElement = document.createElement("fieldset");
		imgLayerElement.id = "attribute_plane_"+_self.id;
		imgLayerElement.className = "layer-attribute-plane row";
		imgLayer.forEach(function(attributeConsole) {
			var attributeContainerElement = document.createElement("div")
			titleElement = document.createElement("legend"),
				titleTextElement = document.createElement("h3"),
				// contentElement = document.createElement("div"),
				contentListElement = document.createElement("article");
			attributeContainerElement.className = "span3";
			titleElement.className = "title span3";
			titleTextElement.innerText = attributeConsole.title;
			// contentElement.className = "content";
			contentListElement.className = attributeConsole.content.name + " control-group span3";
			contentListElement.style.height = 3 * attributeConsole.content.items.length + "em";

			attributeContainerElement.appendChild(titleElement);
			titleElement.appendChild(titleTextElement);
			// attributeContainerElement.appendChild(contentElement);
			// contentElement.appendChild(contentListElement);
			attributeContainerElement.appendChild(contentListElement);
			imgLayerElement.appendChild(attributeContainerElement)

			attributeConsole.content.items.forEach(function(item) {
				var liElement = document.createElement("label");
				liElement.className = "control-label";
				liElement.innerText = item.title;
				contentListElement.appendChild(liElement);
				elementBingDOM._[item.name] = {
					op: item,
					el: liElement
				};
				liElement.addEventListener("click", function(e) {
					if (e.target === liElement) {
						var _sText = liElement.textContent;
						_canEditAble(this, item, function(inputElement) {
							var value = parseInt(inputElement.value);
							if (isNaN(value)) {
								liElement.innerHTML = _sText;
							} else {
								_self.layerAttribute[item.name] = value;
								_self.reInit();
							}
						})
					}
					// e.stopPropagation();event.stopPropagation();
				});
				elementBingDOM.push(item.name)
			});
		});
		var toolButtonGroupHTML = ['<div class="btn-group span8">',
				  '<button class="btn"><i class="icon-arrow-left"></i><!--Coordinate left--></button>',
				  '<button class="btn"><i class="icon-arrow-up"></i><!--Coordinate up--></button>',
				  '<button class="btn"><i class="icon-arrow-down"></i><!--Coordinate down--></button>',
				  '<button class="btn"><i class="icon-arrow-right"></i><!--Coordinate right--></button>',
				  '<button class="btn"><i class="icon-repeat"></i><!--Rotate--></button>',
				  '<button class="btn"><i class="icon-chevron-up"></i><!--Layer Index up--></button>',
				  '<button class="btn"><i class="icon-chevron-down"></i><!--Layer Index down--></button>',
				  '<button class="btn"><i class="icon-zoom-out"></i><!--Zoom Out--></button>',
				  '<button class="btn"><i class="icon-zoom-in"></i><!--Zoom In--></button>',
				  '<button class="btn"><i class="icon-fullscreen"></i><!--To Background--></button>',
				  '<button class="btn"><i class="icon-cut"></i><!--Cut out--></button>',
				  '<button class="btn"><i class="icon-picture"></i><!--Filter--></button>',
				'</div>']
		$(imgLayerElement).append(toolButtonGroupHTML.join("\n"))
		$("#aside").append(imgLayerElement);
		_self.delayReInit();
	};
	return function(LayerConstructor) {
		LayerConstructor.prototype.initAttributePlane = initAttributePlane;
		var _LayerReInit = LayerConstructor.prototype.reInit;
		LayerConstructor.prototype.reInit = function() {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				elementBingDOM = _self._EBD;
			_LayerReInit.call(_self);
			elementBingDOM.forEach(function(key) {
				var item = elementBingDOM._[key],
					element = item.el;
				element.innerText = item.op.title + layerAttribute[key];
			});
		}
		LayerConstructor.initQueue.push({
			name: "initAttributePlane",
			handle: function(layerInstance) {
				layerInstance.initAttributePlane()
			}
		});
	};
})