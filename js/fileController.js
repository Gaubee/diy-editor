define("fileController", ["sketchpadManage"], function(require, exports, module) {
	//-------<a id="file_save" href="#">提交图像（导出）</a>----
	var sketchpads = require("sketchpadManage").instances,
		$file_save = $("#file_save"),
		canvas = document.createElement("canvas"),
		extendImg = new Image;
	window.extendImg = extendImg;
	canvas.id = "xx"
	// document.body.appendChild(canvas);
	// document.body.appendChild(extendImg);
	canvas.renderCallback = function() {};

	console.log($file_save)
	$file_save.on("click", function() {
		sketchpads.forEach(function(sketchpad) {
			console.log("save")
			var data = sketchpad.canvas.parentNode.innerHTML.replace("<svg", '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
			var $dataNode = $("<div>" + data + "</div>");
			$dataNode.find("path").remove();
			$dataNode.find("circle").remove();
			canvg(canvas, $dataNode.html(), {
				ignoreMouse: true,
				renderCallback: function() {
					canvas.renderCallback();
					var confirmContent = $("<div>");
					confirmContent.append("<p>时候保存并上传您DIY的最后结果？</p><hr/>");
					confirmContent.append(extendImg);
					confirm(confirmContent,function(arg){
						if (arg) {
							console.log("POST img data",extendImg.src)
						}
					});
				},
				ignoreAnimation: true
			});
		});
	});
	//-------<a id="extend3D" href="#">展示效果</a>----
/*	var $extend3D = $("#extend3D");

	(function threejs_show() {

		var camera, scene, renderer;
		var texture, geometry, material, mesh;

		// init();
		// animate();

		function init() {

			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.z = 1000;

			scene = new THREE.Scene();

			// load a texture, set wrap mode to repeat
			texture = THREE.ImageUtils.loadTexture("img/_blank.jpg");
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(1, 1);

			geometry = new THREE.CubeGeometry(400, 800, 40);
			material = new THREE.MeshBasicMaterial({
				color: 0x932626,
				wireframe: true,
				map: texture
			});


			mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			mesh.position.x = 00;
			mesh.position.y = 200;

			renderer = new THREE.CanvasRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);

			document.body.appendChild(renderer.domElement);

		}

		function animate() {

			// note: three.js includes requestAnimationFrame shim
			requestAnimationFrame(animate);

			mesh.rotation.x = 0.5;
			mesh.rotation.y += 0.02;
			// console.log(mesh.rotation.x ,mesh.rotation.y )
			renderer.render(scene, camera);

		}


		function updateTexture() {
			texture = new THREE.Texture(extendImg);
			material.map = texture;
		}
		//run three js
		init();
		animate();

		//config callback
		extendImg.onload = function() {
			texture.needsUpdate = true;
		}

		canvas.renderCallback = function() {
			extendImg.src = canvas.toDataURL();
			updateTexture();
		};

		//bind click event
		$extend3D.on("click", function() {
			$file_save.click();
		})
	})();*/

		canvas.renderCallback = function() {
			extendImg.src = canvas.toDataURL();
		};
});