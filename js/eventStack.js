define("eventStack",[/*"jQuery"*/],function(require,exports,module){
	var MAX_STACK_LENGTH = 128;
	var Stack = function Stack(id){
		if (!(this instanceof Stack)) {
			return new Stack(id);
		}
		this.id = id;
		this.eventsHead = [];
		this.eventsTail = [];
	}
	var fn = Stack.fn = Stack.prototype;// = [];
	var arrayProto = Array.prototype;
	// var arrayFun = ["concat", "pop", "push", "reverse", "shift", "slice", "splice", "unshift"];
	// arrayFun.forEach(function registerFun(funName){
	// 	fn[funName] = Function("return function "+funName+"(){ []."+funName+".apply(this.events,[].slice.call(arguments)); }")();
	// });
	fn.clear = function clear(){
		// this.events.length = 0;
		this.eventsHead = [];
		this.eventsTail = [];
	};
	fn.push = function push(affairData,affairTrigger){
		var affair = {
			data:affairData,
			trigger:affairTrigger
		}
		this.eventsHead.push(affair)
		this.eventsTail = [];
		if (this.eventsHead.length>MAX_STACK_LENGTH) {
			this.eventsHead.splice(0,MAX_STACK_LENGTH-this.eventsHead.length);
		}
	};
	fn.undo = function undo(){
		var affair = this.eventsHead.pop();
		if (affair) {
			this.eventsTail.push(affair);
		}
		try{
			affair.trigger(affair.data)
		}catch(e){

		}
		return affair;
	};
	fn.redo = function redo(){
		var affair = this.eventsTail.pop();
		if (affair) {
			this.eventsHead.push(affair);
		}
		try{
			affair.trigger(affair.data)
		}catch(e){

		}
		return affair;
	}

	return Stack;
});