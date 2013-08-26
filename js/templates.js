define("templates", [], function(require, exports, module) {
	var templates = [];
	templates._ = Object.create(null);
	module.exports = {
		get:function(key){
			return templates._[key];
		},
		set:function(key,tem){
			if (!(key in templates._)) {
				templates.push(key);
			}
			templates._[key] = tem;
			return this;	
		}
	};
});