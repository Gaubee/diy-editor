define("eventStackManage",["eventStack"/*"jQuery"*/],function(require,exports,module){
	var eventStacks = [];
	// var $ = jQuery;
	var Stack = require("eventStack");
	module.exports = {
		instances : eventStacks,
		create : function createEventStack(id){
			var newEventStack = Stack(id);
			eventStacks[id] = newEventStack;
			return newEventStack;
		},
		find:function findStack(id){
			if ((typeof id_or_num === "string") && isNaN(parseInt(id_or_num))) { //String
				return eventStacks[id_or_num];
			}
		},
		destroy:function destroyStack(abandonedEventStack){
			abandonedEventStack.clear();
			return delete eventStacks[abandonedEventStack.id];
		}
	}
});