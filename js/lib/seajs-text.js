!function(e,n){function r(e){c[e.name]=e}function t(e){return e&&c.hasOwnProperty(e)}function o(e){for(var n in c)if(t(n)){var r=","+c[n].ext.join(",")+",";if(r.indexOf(","+e+",")>-1)return n}}function a(e,r){var t=n.ActiveXObject?new n.ActiveXObject("Microsoft.XMLHTTP"):new n.XMLHttpRequest;return t.open("GET",e,!0),t.onreadystatechange=function(){if(4===t.readyState){if(t.status>399&&t.status<600)throw new Error("Could not load: "+e+", status = "+t.status);r(t.responseText)}},t.send(null)}function i(e){e&&/\S/.test(e)&&(n.execScript||function(e){(n.eval||eval).call(n,e)})(e)}function s(e){return e.replace(/(["\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")}function u(e){return e.replace(/\?.*$/,"")}var c={},f={};r({name:"text",ext:[".tpl",".html"],exec:function(e,n){i('define("'+e+'#", [], "'+s(n)+'")')}}),!function(e,n){function r(e){c[e.name]=e}function t(e){return e&&c.hasOwnProperty(e)}function o(e){for(var n in c)if(t(n)){var r=","+c[n].ext.join(",")+",";if(r.indexOf(","+e+",")>-1)return n}}function a(e,r){var t=n.ActiveXObject?new n.ActiveXObject("Microsoft.XMLHTTP"):new n.XMLHttpRequest;return t.open("GET",e,!0),t.onreadystatechange=function(){if(4===t.readyState){if(t.status>399&&t.status<600)throw new Error("Could not load: "+e+", status = "+t.status);r(t.responseText)}},t.send(null)}function i(e){e&&/\S/.test(e)&&(n.execScript||function(e){(n.eval||eval).call(n,e)})(e)}function s(e){return e.replace(/(["\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")}function u(e){return e.replace(/\?.*$/,"")}var c={},f={};r({name:"text",ext:[".tpl",".html"],exec:function(e,n){i('define("'+e+'#", [], "'+s(n)+'")')}}),r({name:"json",ext:[".json"],exec:function(e,n){i('define("'+e+'#", [], '+n+")")}}),r({name:"handlebars",ext:[".handlebars"],exec:function(e,n){var r=['define("'+e+'#", ["handlebars"], function(require, exports, module) {','  var source = "'+s(n)+'"','  var Handlebars = require("handlebars")',"  module.exports = function(data, options) {","    options || (options = {})","    options.helpers || (options.helpers = {})","    for (var key in Handlebars.helpers) {","      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]","    }","    return Handlebars.compile(source)(data, options)","  }","})"].join("\n");i(r)}}),e.on("resolve",function(n){var r=n.id;if(!r)return"";var a,i;(i=r.match(/^(\w+)!(.+)$/))&&t(i[1])?(a=i[1],r=i[2]):(i=r.match(/[^?]+(\.\w+)(?:\?|#|$)/))&&(a=o(i[1])),a&&-1===r.indexOf("#")&&(r+="#");var s=e.resolve(r,n.refUri);a&&(f[s]=a),n.uri=s}),e.on("request",function(e){var n=f[e.uri];n&&(a(e.requestUri,function(r){c[n].exec(e.uri,r),e.onRequest()}),e.requested=!0)}),"object"==typeof process&&(a=function(e,n){n(require("fs").readFileSync(u(e),"utf8"))}),define("seajs-text",[],{})}(seajs,this);r({name:"json",ext:[".json"],exec:function(e,n){i('define("'+e+'#", [], '+n+")")}}),r({name:"handlebars",ext:[".handlebars"],exec:function(e,n){var r=['define("'+e+'#", ["handlebars"], function(require, exports, module) {','  var source = "'+s(n)+'"','  var Handlebars = require("handlebars")',"  module.exports = function(data, options) {","    options || (options = {})","    options.helpers || (options.helpers = {})","    for (var key in Handlebars.helpers) {","      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]","    }","    return Handlebars.compile(source)(data, options)","  }","})"].join("\n");i(r)}}),e.on("resolve",function(n){var r=n.id;if(!r)return"";var a,i;(i=r.match(/^(\w+)!(.+)$/))&&t(i[1])?(a=i[1],r=i[2]):(i=r.match(/[^?]+(\.\w+)(?:\?|#|$)/))&&(a=o(i[1])),a&&-1===r.indexOf("#")&&(r+="#");var s=e.resolve(r,n.refUri);a&&(f[s]=a),n.uri=s}),e.on("request",function(e){var n=f[e.uri];n&&(a(e.requestUri,function(r){c[n].exec(e.uri,r),e.onRequest()}),e.requested=!0)}),"object"==typeof process&&(a=function(e,n){n(require("fs").readFileSync(u(e),"utf8"))}),define("seajs-text",[],{})}(seajs,this);