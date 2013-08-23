define("AttributePlane", [], function(require, exports, module) {
	var imgLayer = [{
		title: "坐标-Coordinate",
		content: {
			name: "coordinate",
			items: [{
				title: "X:",
				name: "x",
				content: "x"
			}, {
				title: "Y:",
				name: "y",
				content: "y"
			}]
		}
	}, {
		title: "大小-Size",
		content: {
			name: "size",
			items: [{
				title: "Width:",
				name: "width",
				content: "width"
			}, {
				title: "Height:",
				name: "height",
				content: "width"
			}]
		}
	},{
		title: "角度-Angle",
		content: {
			name: "angle",
			items: [{
				title: "Rotate:",
				name: "rotate",
				content: "rotate"
			}]
		}
	},]
	var initAttributePlane = function(){
		var _self = this,
			elementBingDOM = _self._EBD = [];
			elementBingDOM._= {};
		var imgLayerElement = document.createElement("div");
		imgLayerElement.className = "layer-attribute-plane"
		imgLayer.forEach(function(attributeConsole){
			var titleElement = document.createElement("div"),
				titleTextElement=document.createElement("span"),
				contentElement=document.createElement("div"),
				contentListElement = document.createElement("ul")
				;
			titleElement.className = "title";
			titleTextElement.innerText =attributeConsole.title;
			contentElement.className = "content";
			contentListElement.className = attributeConsole.content.name;

			imgLayerElement.appendChild(titleElement);
			titleElement.appendChild(titleTextElement);
			titleElement.appendChild(contentElement);
			contentElement.appendChild(contentListElement);

			attributeConsole.content.items.forEach(function(item){
				var liElement = document.createElement("li");
				liElement.innerText = item.title;
				contentListElement.appendChild(liElement);
				elementBingDOM._[item.name] = {
					op:item,
					el:liElement
				};
				elementBingDOM.push(item.name)
			})
		});
		$("#aside").append(imgLayerElement)
	};
	return function(LayerConstructor) {
		LayerConstructor.prototype.initAttributePlane = initAttributePlane;
		var _LayerReInit = LayerConstructor.prototype.reInit;
		LayerConstructor.prototype.reInit = function() {
			var _self = this,
				layerAttribute = _self.layerAttribute,
				elementBingDOM= _self._EBD;
			_LayerReInit.call(_self);
			elementBingDOM.forEach(function(key){
				var item = elementBingDOM._[key];
				item.el.innerText = item.op.title+layerAttribute[key];
			});
		}
		LayerConstructor.initQueue.push({
			name: "initAttributePlane",
			handle: function(layerInstance) {
				layerInstance.initAttributePlane()
			}
		})
	};
})