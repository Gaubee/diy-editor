define("materialPanel", [], function(require, exports, module) {

	var session = {
		TEMP:{},
		endpointEvent:function(){},
		dragPropagation: function(num) {
			if (num) {
				session.propagation += Number(num);
				if (session.propagation === 0) {
					session.toSvg = false;
				} else {
					session.toSvg = true;
				}
			} else {
				session.propagation = 0;
				session.toSvg = false;
			}
		},
		propagation: 0,
		toSvg: false,
		files: [],
		point: {
			start: {
				x: 0,
				y: 0
			},
			end: {
				x: 0,
				y: 0
			}
		}
	};

	function handleDragEnter(e) {
		// console.log("dragenter!");
		session.dragPropagation(1);
	}

	function handleDragLeave(e) {
		// console.log("dragleave!");
		session.dragPropagation(-1);
	}

	function handleDragOver(e) {
		// console.log("dragover!");
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
		return false;
	}

	function registeredEndpoints(element, events) {
		events = events || {};
		element.addEventListener("dragenter", function(e) {
			events.enter && events.enter(session, e);
			var result = handleDragEnter.call(element, e);
			return result;
		}, false);
		element.addEventListener("dragleave", function(e) {
			events.leave && events.leave(session, e);
			var result = handleDragLeave.call(element, e);
			return result;
		}, false);
		element.addEventListener("dragover", function(e) {
			events.over && events.over(session, e);
			var result = handleDragOver.call(element, e);
			return result;
		}, false);
	}


	function handleDragStart(e) {
		// this.classList.add('over'); // this / e.target is the source node.
		// console.log(e.x,e.y)
		session.point.start = {
			x: e.x,
			y: e.y
		};
	};

	function handleDragEnd(e) {
		// [].forEach.call(toolbarItems, function(item) {
		// 	item.classList.remove('over');
		// });
		// console.log(e.x,e.y)
		if (session.toSvg) {
			// console.log("create img!!");
			session.point.end = {
				x: e.x,
				y: e.y
			};
		}
		setTimeout(session.dragPropagation,0)
	};

	function handleDrop(e) {
		// console.log("draging!");
		// this / e.target is current target element.
		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}
		// See the section on the DataTransfer object.
		return false;
	};

	function registeredStartingpoints(element, events) {
		events = events || {};
		element.addEventListener('dragstart', function(e) {
			session.files.push(this);
			var result = handleDragStart.call(element, e);
			events.start && events.start(session,e);
			return result;
		}, false);
		element.addEventListener('dragend', function(e) {
			var result = handleDragEnd.call(element, e);
			events.end && events.end(session,e);
			session.files.pop();
			return result;
		}, false);
		element.addEventListener('drag', function(e) {
			events.ing && events.ing(session,e);
			var result = handleDrop.call(element, e);
			return result;
		}, false);
	}

	function toDragAble(elements, container) {

	}
	module.exports = {
		registeredEndpoints: registeredEndpoints,
		registeredStartingpoints: registeredStartingpoints/*,
		toDragAble: toDragAble*/
	};
});