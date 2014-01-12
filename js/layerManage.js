define("layerManage", ["Layer"], function(require, exports, module) {
    var Layer = require("Layer");
    var container = [];
    container.img = [];
    container.sketchpad = [];
    container.layerAttribute = [];
    container.layerControllerSet = [];
    // var $layer = $(".layer");
    module.exports = {
        instances: container,
        create: function createLayer(sketchpad, layerConfig) {
            var i = container.length;
            layerConfig.zIndex = i;
            console.log(layerConfig)
            var newLayer = Layer(sketchpad, layerConfig);
            container.push(newLayer);
            container.img[i] = newLayer.img;
            container.sketchpad[i] = newLayer.sketchpad;
            container.layerAttribute[i] = newLayer.layerAttribute;
            container.layerControllerSet[i] = newLayer.layerControllerSet;
            var imgClick = function(e) {
                var _self = newLayer;
                container.forEach(function(layerInstances) {
                    layerInstances.blur(e);
                });
                _self.focus(e);
                require("sketchpadManage").createLayerManager(e);
            };
            console.log(newLayer.img)
            // newLayer.img.click(imgClick);
            newLayer._clickEvent = imgClick;
            imgClick();
            require("sketchpadManage").createLayerManager()
            $("#aside").scrollspy('refresh')

            return newLayer;
        }
        // ,
        // $layer:$layer
    }
    // Layer.prototype.jointFocus = function(){
    // 	var _self = this;
    // 	container.forEach(function(layerInstances){
    // 		instances.blur();
    // 	});
    // 	_self.focus();
    // }
});
