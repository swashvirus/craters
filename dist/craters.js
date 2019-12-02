/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {// for nodejs environment
// the script creates an equivalent of 
// requestAnimationFrame function

var cg = new Object();
if (typeof window === 'undefined' && global) {
    global.window = {
        performance: {
            now: function(start) {
                if (!start) return Date.now()
                var end = Date.now(start)
                return Math.round((end[0] * 1000) + (end[1] / 1000000))
            }
        },
        requestAnimationFrame: function(f) {
            setImmediate(() => f(this.performance.now()))
        }
    }
}

// assingn cg to window object
window['cg'] = cg;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0), __webpack_require__(2).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(3);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./craters/Polyfill.js
var Polyfill = __webpack_require__(1);

// CONCATENATED MODULE: ./craters/Geometry/Common.js
const degToRad = function(angle) {
    return angle * Math.PI / 180;
};

const radToDeg = function(angle) {
    return angle * 180 / Math.PI;
};

const distance = function(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

const map = function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

const boundary = function(value, min, max) {
    return Math.min(Math.max(value, min), max)
};

const Common_abs = function abs(x) {
	return (x < 0 ? -x : x)
};

/* harmony default export */ var Common = ({abs: Common_abs, boundary, degToRad, radToDeg, distance, map});
// CONCATENATED MODULE: ./craters/Geometry/QuadTree.js
/*jslint vars: true, nomen: true, plusplus: true, continue:true, forin:true */
/*global Node, BoundsNode */

/*
	The MIT License

	Copyright (c) 2011 Mike Chambers

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/


/**
* A QuadTree implementation in JavaScript, a 2d spatial subdivision algorithm.
* @module QuadTree
**/

    /****************** QuadTree ****************/

    /**
    * QuadTree data structure.
    * @class QuadTree
    * @constructor
    * @param {Object} An object representing the bounds of the top level of the QuadTree. The object 
    * should contain the following properties : x, y, width, height
    * @param {Boolean} pointQuad Whether the QuadTree will contain points (true), or items with bounds 
    * (width / height)(false). Default value is false.
    * @param {Number} maxDepth The maximum number of levels that the quadtree will create. Default is 4.
    * @param {Number} maxChildren The maximum number of children that a node can contain before it is split into sub-nodes.
    **/
    function QuadTree(bounds, pointQuad, maxDepth, maxChildren) {
        var node;
        if (pointQuad) {

            node = new Node(bounds, 0, maxDepth, maxChildren);
        } else {
            node = new BoundsNode(bounds, 0, maxDepth, maxChildren);
        }

        this.root = node;
    }

    /**
    * The root node of the QuadTree which covers the entire area being segmented.
    * @property root
    * @type Node
    **/
    QuadTree.prototype.root = null;


    /**
    * Inserts an item into the QuadTree.
    * @method insert
    * @param {Object|Array} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y 
    * properties that represents its position in 2D space.
    **/
    QuadTree.prototype.insert = function (item) {
        if (item instanceof Array) {
            var len = item.length;

            var i;
            for (i = 0; i < len; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.insert(item);
        }
    };

    /**
    * Clears all nodes and children from the QuadTree
    * @method clear
    **/
    QuadTree.prototype.clear = function () {
        this.root.clear();
    };

    /**
    * Retrieves all items / points in the same node as the specified item / point. If the specified item
    * overlaps the bounds of a node, then all children in both nodes will be returned.
    * @method retrieve
    * @param {Object} item An object representing a 2D coordinate point (with x, y properties), or a shape
    * with dimensions (x, y, width, height) properties.
    **/
    QuadTree.prototype.retrieve = function (item) {
        //get a copy of the array of items
        var out = this.root.retrieve(item).slice(0);
        return out;
    };

    /************** Node ********************/


    function Node(bounds, depth, maxDepth, maxChildren) {
        this._bounds = bounds;
        this.children = [];
        this.nodes = [];

        if (maxChildren) {
            this._maxChildren = maxChildren;
        }

        if (maxDepth) {
            this._maxDepth = maxDepth;
        }

        if (depth) {
            this._depth = depth;
        }
    }

    //subnodes
    Node.prototype.nodes = null;
    Node.prototype._classConstructor = Node;

    //children contained directly in the node
    Node.prototype.children = null;
    Node.prototype._bounds = null;

    //read only
    Node.prototype._depth = 0;

    Node.prototype._maxChildren = 4;
    Node.prototype._maxDepth = 4;

    Node.TOP_LEFT = 0;
    Node.TOP_RIGHT = 1;
    Node.BOTTOM_LEFT = 2;
    Node.BOTTOM_RIGHT = 3;


    Node.prototype.insert = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

            this.nodes[index].insert(item);

            return;
        }

        this.children.push(item);

        var len = this.children.length;
        if (!(this._depth >= this._maxDepth) &&
                len > this._maxChildren) {
            
            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    };

    Node.prototype.retrieve = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);

            return this.nodes[index].retrieve(item);
        }

        return this.children;
    };

    Node.prototype._findIndex = function (item) {
        var b = this._bounds;
        var left = (item.x > b.x + b.width / 2) ? false : true;
        var top = (item.y > b.y + b.height / 2) ? false : true;

        //top left
        var index = Node.TOP_LEFT;
        if (left) {
            //left side
            if (!top) {
                //bottom left
                index = Node.BOTTOM_LEFT;
            }
        } else {
            //right side
            if (top) {
                //top right
                index = Node.TOP_RIGHT;
            } else {
                //bottom right
                index = Node.BOTTOM_RIGHT;
            }
        }

        return index;
    };


    Node.prototype.subdivide = function () {
        var depth = this._depth + 1;

        var bx = this._bounds.x;
        var by = this._bounds.y;

        //floor the values
        var b_w_h = (this._bounds.width / 2); //todo: Math.floor?
        var b_h_h = (this._bounds.height / 2);
        var bx_b_w_h = bx + b_w_h;
        var by_b_h_h = by + b_h_h;

        //top left
        this.nodes[Node.TOP_LEFT] = new this._classConstructor({
            x: bx,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);

        //top right
        this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);

        //bottom left
        this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
            x: bx,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);


        //bottom right
        this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
            depth, this._maxDepth, this._maxChildren);
    };

    Node.prototype.clear = function () {
        this.children.length = 0;

        var len = this.nodes.length;
        
        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    };
    

    /******************** BoundsQuadTree ****************/

    function BoundsNode(bounds, depth, maxChildren, maxDepth) {
        Node.call(this, bounds, depth, maxChildren, maxDepth);
        this._stuckChildren = [];
    }

    BoundsNode.prototype = new Node();
    BoundsNode.prototype._classConstructor = BoundsNode;
    BoundsNode.prototype._stuckChildren = null;

    //we use this to collect and conctenate items being retrieved. This way
    //we dont have to continuously create new Array instances.
    //Note, when returned from QuadTree.retrieve, we then copy the array
    BoundsNode.prototype._out = [];

    BoundsNode.prototype.insert = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            //todo: make _bounds bounds
            if (item.x >= node._bounds.x &&
                    item.x + item.width <= node._bounds.x + node._bounds.width &&
                    item.y >= node._bounds.y &&
                    item.y + item.height <= node._bounds.y + node._bounds.height) {
                
                this.nodes[index].insert(item);
                
            } else {
                this._stuckChildren.push(item);
            }

            return;
        }

        this.children.push(item);

        var len = this.children.length;

        if (!(this._depth >= this._maxDepth) &&
                len > this._maxChildren) {
            
            this.subdivide();

            var i;
            for (i = 0; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    };

    BoundsNode.prototype.getChildren = function () {
        return this.children.concat(this._stuckChildren);
    };

    BoundsNode.prototype.retrieve = function (item) {
        var out = this._out;
        out.length = 0;
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            if (item.x >= node._bounds.x &&
                    item.x + item.width <= node._bounds.x + node._bounds.width &&
                    item.y >= node._bounds.y &&
                    item.y + item.height <= node._bounds.y + node._bounds.height) {
                
                out.push.apply(out, this.nodes[index].retrieve(item));
            } else {
                //Part of the item are overlapping multiple child nodes. For each of the overlapping nodes, return all containing objects.

                if (item.x <= this.nodes[Node.TOP_RIGHT]._bounds.x) {
                    if (item.y <= this.nodes[Node.BOTTOM_LEFT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.TOP_LEFT].getAllContent());
                    }
                    
                    if (item.y + item.height > this.nodes[Node.BOTTOM_LEFT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.BOTTOM_LEFT].getAllContent());
                    }
                }
                
                if (item.x + item.width > this.nodes[Node.TOP_RIGHT]._bounds.x) {//position+width bigger than middle x
                    if (item.y <= this.nodes[Node.BOTTOM_RIGHT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.TOP_RIGHT].getAllContent());
                    }
                    
                    if (item.y + item.height > this.nodes[Node.BOTTOM_RIGHT]._bounds.y) {
                        out.push.apply(out, this.nodes[Node.BOTTOM_RIGHT].getAllContent());
                    }
                }
            }
        }

        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);

        return out;
    };

    //Returns all contents of node.
    BoundsNode.prototype.getAllContent = function () {
        var out = this._out;
        if (this.nodes.length) {
            
            var i;
            for (i = 0; i < this.nodes.length; i++) {
                this.nodes[i].getAllContent();
            }
        }
        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);
        return out;
    };

    BoundsNode.prototype.clear = function () {

        this._stuckChildren.length = 0;

        //array
        this.children.length = 0;

        var len = this.nodes.length;

        if (!len) {
            return;
        }

        var i;
        for (i = 0; i < len; i++) {
            this.nodes[i].clear();
        }

        //array
        this.nodes.length = 0;

        //we could call the super clear function but for now, im just going to inline it
        //call the hidden super.clear, and make sure its called with this = this instance
        //Object.getPrototypeOf(BoundsNode.prototype).clear.call(this);
    };
// CONCATENATED MODULE: ./craters/Geometry/Vector.js

// Vector
// ----------
// Represents a vector in two dimensions with `x` and `y` properties.


// Create a new Vector, optionally passing in the `x` and `y` coordinates. If
// a coordinate is not specified, it will be set to `0`
/**
* @param {?number=} x The x position.
* @param {?number=} y The y position.
* @constructor
*/
function Vector(x, y) {
	this['x'] = x || 0;
	this['y'] = y || 0;
}

// Copy the values of another Vector into this one.
/**
* @param {Vector} other The other Vector.
* @return {Vector} This for chaining.
*/
Vector.prototype['copy'] = Vector.prototype.copy = function(other) {
	this['x'] = other['x'];
	this['y'] = other['y'];
	return this;
};

// Create a new vector with the same coordinates as this on.
/**
* @return {Vector} The new cloned vector
*/
Vector.prototype['clone'] = Vector.prototype.clone = function() {
	return new Vector(this['x'], this['y']);
};

// Change this vector to be perpendicular to what it was before. (Effectively
// roatates it 90 degrees in a clockwise direction)
/**
* @return {Vector} This for chaining.
*/
Vector.prototype['perp'] = Vector.prototype.perp = function() {
	var x = this['x'];
	this['x'] = this['y'];
	this['y'] = -x;
	return this;
};

// Rotate this vector (counter-clockwise) by the specified angle (in radians).
/**
* @param {number} angle The angle to rotate (in radians)
* @return {Vector} This for chaining.
*/
Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
	var x = this['x'];
	var y = this['y'];
	this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
	this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
	return this;
};

// Reverse this vector.
/**
* @return {Vector} This for chaining.
*/
Vector.prototype['reverse'] = Vector.prototype.reverse = function() {
	this['x'] = -this['x'];
	this['y'] = -this['y'];
	return this;
};


// Normalize this vector.  (make it have length of `1`)
/**
* @return {Vector} This for chaining.
*/
Vector.prototype['normalize'] = Vector.prototype.normalize = function() {
	var d = this.len();
	if(d > 0) {
		this['x'] = this['x'] / d;
		this['y'] = this['y'] / d;
	}
	return this;
};

// Add another vector to this one.
/**
* @param {Vector} other The other Vector.
* @return {Vector} This for chaining.
*/
Vector.prototype['add'] = Vector.prototype.add = function(other) {
	this['x'] += other['x'];
	this['y'] += other['y'];
	return this;
};

// Subtract another vector from this one.
/**
* @param {Vector} other The other Vector.
* @return {Vector} This for chaiing.
*/
Vector.prototype['sub'] = Vector.prototype.sub = function(other) {
	this['x'] -= other['x'];
	this['y'] -= other['y'];
	return this;
};

// Scale this vector. An independent scaling factor can be provided
// for each axis, or a single scaling factor that will scale both `x` and `y`.
/**
* @param {number} x The scaling factor in the x direction.
* @param {?number=} y The scaling factor in the y direction.  If this
*   is not specified, the x scaling factor will be used.
* @return {Vector} This for chaining.
*/
Vector.prototype['scale'] = Vector.prototype.scale = function(x,y) {
	this['x'] *= x;
	this['y'] *= typeof y != 'undefined' ? y : x;
	return this;
};

// Project this vector on to another vector.
/**
* @param {Vector} other The vector to project onto.
* @return {Vector} This for chaining.
*/
Vector.prototype['project'] = Vector.prototype.project = function(other) {
	var amt = this.dot(other) / other.len2();
	this['x'] = amt * other['x'];
	this['y'] = amt * other['y'];
	return this;
};

// Project this vector onto a vector of unit length. This is slightly more efficient
// than `project` when dealing with unit vectors.
/**
* @param {Vector} other The unit vector to project onto.
* @return {Vector} This for chaining.
*/
Vector.prototype['projectN'] = Vector.prototype.projectN = function(other) {
	var amt = this.dot(other);
	this['x'] = amt * other['x'];
	this['y'] = amt * other['y'];
	return this;
};

// Reflect this vector on an arbitrary axis.
/**
* @param {Vector} axis The vector representing the axis.
* @return {Vector} This for chaining.
*/
Vector.prototype['reflect'] = Vector.prototype.reflect = function(axis) {
	var x = this['x'];
	var y = this['y'];
	this.project(axis).scale(2);
	this['x'] -= x;
	this['y'] -= y;
	return this;
};

// Reflect this vector on an arbitrary axis (represented by a unit vector). This is
// slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
/**
* @param {Vector} axis The unit vector representing the axis.
* @return {Vector} This for chaining.
*/
Vector.prototype['reflectN'] = Vector.prototype.reflectN = function(axis) {
	var x = this['x'];
	var y = this['y'];
	this.projectN(axis).scale(2);
	this['x'] -= x;
	this['y'] -= y;
	return this;
};

// Get the dot product of this vector and another.
/**
* @param {Vector}  other The vector to dot this one against.
* @return {number} The dot product.
*/
Vector.prototype['dot'] = Vector.prototype.dot = function(other) {
	return this['x'] * other['x'] + this['y'] * other['y'];
};

// Get the squared length of this vector.
/**
* @return {number} The length^2 of this vector.
*/
Vector.prototype['len2'] = Vector.prototype.len2 = function() {
	return this.dot(this);
};

// Get the length of this vector.
/**
* @return {number} The length of this vector.
*/
Vector.prototype['len'] = Vector.prototype.len = function() {
	return Math.sqrt(this.len2());
};
// CONCATENATED MODULE: ./craters/Geometry/Geometry.js
// load the methods and sub divided them
// to make bite sized methods
// vectors, fixtures, common





// CONCATENATED MODULE: ./craters/Texture/Solid.js
class Solid {
	constructor(body, params) {
		this.body = body;
		this.style = params.style;
		this.fixture = body.fixture;
		this.position = body.state.position;
	}
	
	update(){
	
	}
	
	render() {
	let body = this.body;
	let context = body.context;
	context.fillStyle = this.style.fillStyle;
	context.lineWidth = this.style.lineWidth;
	context.strokeStyle = this.style.strokeStyle;
	context.lineJoin = 'miter';
	
	switch (body.fixture.type) {
		    case 'circle': {
				context.beginPath();
				context.ellipse(
			        body.state.position.x,
			        body.state.position.y,
			        body.fixture.r,
			        body.fixture.r,
			        0, 0,
			        Math.PI * 2
		        );
		        context.closePath();
		        context.stroke();
		        context.fill();
		        break;
		    }
		    case 'polygon': {
		        context.beginPath();
		        // console.log(JSON.stringify(body.fixture.points))
		        context.moveTo(body.state.position.x + body.fixture.points[0].x, body.state.position.y + body.fixture.points[0].y);
		        for (let i = 1; i < body.fixture.points.length; i++) {
			        let v = body.fixture.points[i];
			        context.lineTo(body.state.position.x + v.x, body.state.position.y + v.y);
		        };
		        context.lineTo(body.state.position.x + body.fixture.points[0].x, body.state.position.y + body.fixture.points[0].y);
		        context.fill();
		        context.stroke();
		        break;
		    }
		}
	}
}
// CONCATENATED MODULE: ./craters/Texture/Sprite.js
class Sprite {
	constructor(object, params) {
		this.size = {
			x: params.tilewidth,
			y: params.tileheight
		}
		
		this.frame;
		this.grid = [];
		this.image = params.image;
		this.object = object;
		this.style = params.style;
		this.fixture = object.fixture;
		this.position = object.state.position;
		params.frames = params.frames || [0];
		
		if(this.image instanceof Image) {
			
			for(let h = 0; h < this.image.height; h += this.size.y){
			for(let w = 0; w < this.image.width; w += this.size.x){
				this.grid.push({x: w, y: h})
				}
			}
		}
		this.animation = {frames: params.frames}
	}
	
	update() {
		this.frame = this.animation.frames.shift()
		this.animation.frames.push(this.frame)
	}
	
	render() {
	let object = this.object;
	let image = this.image;
	let context = object.context;
	context.fillStyle = this.style.fillStyle;
	context.lineWidth = this.style.lineWidth;
	context.strokeStyle = this.style.strokeStyle;
	context.lineJoin = 'miter';
	
	switch (object.fixture.type) {
		    case 'circle': {
				context.save();
				context.beginPath();
				context.ellipse(
			        object.state.position.x,
			        object.state.position.y,
			        object.fixture.r,
			        object.fixture.r,
			        0, 0,
			        Math.PI * 2
		        );
		        context.clip();
		        let frame = this.frame;
		        if(image instanceof Image) {
		        context.drawImage(this.image,
			        this.grid[frame].x, this.grid[frame].y, this.size.x, this.size.y,
			        object.state.position.x - object.fixture.r, object.state.position.y - object.fixture.r, this.size.x, this.size.y
		        )}
		        else {
			        context.fill();
			        context.stroke();
		        }
		        context.closePath();
		        context.restore();
		        break;
		    }
		    case 'polygon': {
			    context.save();
		        context.beginPath();
		        context.moveTo(object.state.position.x + object.fixture.points[0].x, object.state.position.y + object.fixture.points[0].y);
		        for (let i = 1; i < object.fixture.points.length; i++) {
			        let v = object.fixture.points[i];
			        context.lineTo(object.state.position.x + v.x, object.state.position.y + v.y);
		        };
		        context.lineTo(object.state.position.x + object.fixture.points[0].x, object.state.position.y + object.fixture.points[0].y);
		        context.clip();
		        let frame = this.frame;
		        if(image instanceof Image) {
			        context.drawImage(this.image,
			        this.grid[frame].x, this.grid[frame].y, this.size.x, this.size.y,
			        object.state.position.x, object.state.position.y, this.size.x, this.size.y
		        )}
		        else {
			        context.fill();
			        context.stroke();
		        }
		        context.closePath();
		        context.restore();
		        break;
		    }
		}
	}
}
// CONCATENATED MODULE: ./craters/Texture/Textures.js


/* harmony default export */ var Textures = ({Solid: Solid, Sprite: Sprite});
// CONCATENATED MODULE: ./craters/Entity.js



class Entity_Entity {
    constructor(params) {
		// define shortcuts 
		let vec = Vector;
		let num = Number;
		let obj = Object;
		let str = String;
		let arr = Array;
		
		params.debug = params.debug || false;
		params.position = params.position || new vec()
		params.angle = params.angle || new num();
		params.maxVelocity = params.maxVelocity || new vec(200, 200)
		params.velocity = params.velocity || new vec()
		params.acceleration = params.acceleration || new vec()
		params.mass = params.mass || new num(1);
		params.force = params.force || new vec()
		params.texture = params.texture || new obj({
			// texture properties
		})
		params.texture.style = params.texture.style || new obj({
			// texture style properties
		})
		params.texture.style.fillStyle = params.texture.style.fillStyle || new str("#ddd")
		params.texture.style.lineWidth = params.texture.style.lineWidth || new num(2)
		params.texture.style.strokeStyle = params.texture.style.strokeStyle || new str("#333")
		
		this.debug = params.debug;
		this.state = {
			// an object storing
			// entity properties
		}
		this.state.position = params.position
		this.state.angle = params.angle
		
		params.collision = params.collision || new obj({
			// collision properties
		})
		// default collision properties
		params.collision.collides = params.collision.collides || true;
		params.collision.group = params.collision.group || new arr(['everyone']);
		params.collision.checkAgenist = params.collision.checkAgenist || new arr(['everyone']);
		params.gravityFactor = params.gravityFactor || new vec(1, 1)
		
		// collision properties
		this.collision = {
			collides: params.collision.collides,
			group: params.collision.group,
			checkAgenist: params.collision.checkAgenist
		}
		
		// body dynamics
		this.state.force = params.force
		this.gravityFactor = params.gravityFactor
		// mass
		this.state.mass = params.mass
        // body kinematics
        this.state.maxVelocity = params.maxVelocity
        this.state.velocity = params.velocity
        this.state.acceleration = params.acceleration
        
        // body type
        this.types = {
	        kinematic: 'kinematic',
	        dynamic: 'dynamic'
        }
        
        // set default body type
        this.type = params.type;
        
        // fixture
        this.fixture = {
	        // friction
	        // size
	        // density
	        // material
        }
        
        // body texture
        this.texture = new Textures.Sprite(this, params.texture);
    }
    
    // update own state
    update () {
    
    }
    
    // render own state
    render() {
	    let style = this.texture.style;
	    let context = this.context;
	    
	    if(this.debug) {
	    // Todo more tools , centroid.
	    context.save()
	    context.beginPath();
	    context.strokeStyle = "red";
	    context.lineWidth = "1";
	    
	    let bounds = this.fixture.getAABB();
	    let edges = bounds.edges;
	    let width = (edges[0].x - edges[2].x) / 2,
		    height = (edges[1].y - edges[3].y) / 2;
	    let position = this.state.position;
	    let x = position.x,
		    y = position.y;
	    if(this.fixture.type == "circle")
	    x = position.x - (width / 2),
		y = position.y - (height / 2);
	    
	    context.rect(x , y , width, height)
	    context.stroke()
	    context.restore()
	    }
	    context.fillStyle = style.fillStyle;
	    context.lineWidth =  style.lineWidth;
	    context.strokeStyle = style.strokeStyle;
	    context.lineJoin = 'miter';
    }
}
// CONCATENATED MODULE: ./craters/System.js
// Game Loop Module
// This module contains the game loop, which handles
// updating the game state and re-rendering the canvas
// (using the updated state) at the configured tframe.
class Loop {
    constructor(scope, tframe) {
        var loop = {
            delta: (1000 / tframe),
            elapsed: 0,
            tframe: (1000 / tframe),
            nframe: tframe,
            before: window.performance.now()
        }
        // Initialize timer variables so we can calculate tframe
        // Main game rendering loop
        loop.main = function() {
            loop.startLoop = window.requestAnimationFrame(loop.main)
            loop.delta = Math.round(((1000 / (window.performance.now() - loop.before) * 100) / 100))

            if (window.performance.now() < loop.before + loop.tframe) return
            loop.before = window.performance.now()
            // Request a new Animation Frame
            // setting to `stopLoop` so animation can be stopped via
            loop.stopLoop = () => {
                window.cancelAnimationFrame(loop.startLoop)
            }
            // update scope
            if(scope.state)
            scope.state.loop = loop;

            // Update the game state
            scope.update(loop.elapsed, loop.delta)
            // Render the next frame
            scope.render(loop.elapsed, loop.delta)
            loop.elapsed++
        }

        // Start off main loop
        loop.main()
        return loop
    }
}

class Canvas {
    constructor(width, height, container) {
        container = document.querySelector(container || 'body')
        // Generate a canvas and store it as our viewport
        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        // Pass our canvas' context to our getPixelRatio method
        var backingStores = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio']
        var deviceRatio = window.devicePixelRatio
        // Iterate through our backing store props and determine the proper backing ratio.
        var backingRatio = backingStores.reduce(function(prev, curr) {
            return (Object.prototype.hasOwnProperty.call(context, curr) ? context[curr] : 1)
        })
        // Return the proper pixel ratio by dividing the device ratio by the backing ratio
        var ratio = deviceRatio / backingRatio

        // Set the canvas' width then downscale via CSS
        canvas.width = Math.round(width * ratio)
        canvas.height = Math.round(height * ratio)
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        // Scale the context so we get accurate pixel density
        context.setTransform(ratio, 0, 0, ratio, 0, 0)
        // Append viewport into our game within the dom
        container.insertBefore(canvas, container.firstChild)
        canvas.context = canvas.getContext('2d')

        canvas.resize = (scope, size) => {
            canvas.style.width = size.x + 'px'
            canvas.style.height = size.y + 'px'
            canvas.width = Math.round(size.x * ratio)
            canvas.height = Math.round(size.y * ratio)
            context.setTransform(ratio, 0, 0, ratio, 0, 0)

            scope.state.size.x = size.x
            scope.state.size.y = size.y
        }

        canvas.clear = (v, w, x, y, z) => {
            v = v || null
            w = w || 0
            x = x || 0
            y = y || canvas.width
            z = z || canvas.height

            if (v) { // clear with color if true
                canvas.context.save();
                canvas.context.fillStyle = v;
                canvas.context.fillRect(w, x, y, z)
                canvas.context.fill();
                canvas.context.restore();
            } else {
                canvas.context.clearRect(w, x, y, z)
            };
        }

        canvas.camera = (x, y) => {
            canvas.context.setTransform(1, 0, 0, 1, 0, 0) // reset the transform matrix
            canvas.context.translate(-x, -y)
        }

        return canvas // return the canvas
    }
}
// CONCATENATED MODULE: ./craters/Fixture/Polygon.js
// ## Polygon
// Represents a *convex* polygon with any number of points (specified in counter-clockwise order)



class Polygon_Polygon {
	constructor(pos, points) {
		this['type'] = 'polygon'
		this['pos'] = pos || new Vector();
		this['angle'] = 0;
		this['offset'] = new Vector();
		this.setPoints(points || []);
	}
	setPoints(points) {
		// Only re-allocate if this is a new polygon or the number of points has changed.
		var lengthChanged = !this['points'] || this['points'].length !== points.length;
		if (lengthChanged) {
			var i;
			var calcPoints = this['calcPoints'] = [];
			var edges = this['edges'] = [];
			var normals = this['normals'] = [];
			// Allocate the vector arrays for the calculated properties
			for (i = 0; i < points.length; i++) {
			// Remove consecutive duplicate points
			var p1 = points[i];
			var p2 = i < points.length - 1 ? points[i + 1] : points[0];
			if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
			points.splice(i, 1);
			i -= 1;
			continue;
			}
			calcPoints.push(new Vector());
			edges.push(new Vector());
			normals.push(new Vector());
			}
		}
		this['points'] = points;
		this._recalc();
		return this;
	};
	setAngle(angle) {
		this['angle'] = angle;
		this._recalc();
		return this;
	};
	setOffset(offset) {
		this['offset'] = offset;
		this._recalc();
		return this;
	};
	
	rotate(angle) {
		var points = this['points'];
		var len = points.length;
		for (var i = 0; i < len; i++) {
			points[i].rotate(angle);
		}
		this._recalc();
		return this;
	};
	translate(x, y) {
		var points = this['points'];
		var len = points.length;
		for (var i = 0; i < len; i++) {
			points[i]["x"] += x;
			points[i]["y"] += y;
		}
		this._recalc();
		return this;
	};
	
	_recalc() {
		var calcPoints = this['calcPoints'];
		var edges = this['edges'];
		var normals = this['normals'];
		// Copy the original points array and apply the offset/angle
		var points = this['points'];
		var offset = this['offset'];
		var angle = this['angle'];
		var len = points.length;
		var i;
		for (i = 0; i < len; i++) {
			var calcPoint = calcPoints[i].copy(points[i]);
			calcPoint["x"] += offset["x"];
			calcPoint["y"] += offset["y"];
			if (angle !== 0) {
				calcPoint.rotate(angle);
			}
		}
		// Calculate the edges/normals
		for (i = 0; i < len; i++) {
			var p1 = calcPoints[i];
			var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
			var e = edges[i].copy(p2).sub(p1);
			normals[i].copy(e).perp().normalize();
		}
		return this;
	};
	
	getAABB() {
		var points = this["calcPoints"];
		var len = points.length;
		var xMin = points[0]["x"];
		var yMin = points[0]["y"];
		var xMax = points[0]["x"];
		var yMax = points[0]["y"];
		for (var i = 1; i < len; i++) {
			var point = points[i];
			if (point["x"] < xMin) {
				xMin = point["x"];
			}
			else if (point["x"] > xMax) {
				xMax = point["x"];
			}
			if (point["y"] < yMin) {
				yMin = point["y"];
			}
			else if (point["y"] > yMax) {
				yMax = point["y"];
			}
		}
		return new AABB_AABB(this['pos'].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
	};
	
	getCentroid() {
		var points = this["calcPoints"];
		var len = points.length;
		var cx = 0;
		var cy = 0;
		var ar = 0;
		for (var i = 0; i < len; i++) {
			var p1 = points[i];
			var p2 = i === len - 1 ? points[0] : points[i+1]; // Loop around if last point
			var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
			cx += (p1["x"] + p2["x"]) * a;
			cy += (p1["y"] + p2["y"]) * a;
			ar += a;
		}
		ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area
		cx = cx / ar;
		cy = cy / ar;
		return new Vector(cx, cy);
	}
}
// CONCATENATED MODULE: ./craters/Geometry/AABB.js
// ## AABB
// Represents an axis-aligned AABB, with a width and height.



class AABB_AABB {
	constructor(pos, w, h) {
		this['pos'] = pos || new Vector();
		this['w'] = w || 0;
		this['h'] = h || 0;
	}
	
	// Returns a polygon whose edges are the same as this AABB.
	toPolygon() {
		var pos = this['pos'];
		var w = this['w'];
		var h = this['h'];
		return new Polygon_Polygon(new Vector(pos['x'], pos['y']), [
			new Vector(), new Vector(w, 0),
			new Vector(w,h), new Vector(0,h)
		]);
	}
}
// CONCATENATED MODULE: ./craters/Fixture/Circle.js
// ## Circle
// Represents a circular fixture



class Circle_Circle {
	constructor(pos, r) {
		this['type'] = 'circle'
		this['pos'] = pos || new Vector();
		this['r'] = r || 0;
		this['offset'] = new Vector();
	}
	
	// Compute the axis-aligned bounding AABB (AABB) of this Circle.
	//
	// Note: Returns a _new_ `Polygon` each time you call this.
	/**
	* @return {Polygon} The AABB
	*/
	getAABB() {
		var r = this['r'];
		var corner = this['pos'].clone().add(this['offset']).sub(new Vector(r, r));
		return new AABB_AABB(corner, r*2, r*2).toPolygon();
	};
	getCentroid() {
		let aabb = this.getAABB();
		let x = aabb.edges[3].x;
		let y = aabb.edges[2].y;
		let cx = (aabb.edges[0].x - x) / 2;
		let cy = (aabb.edges[1].y - y) / 2;
		return new Vector(cx, cy);
	}
	// Set the current offset to apply to the radius.
	/**
	* @param {Vector} offset The new offset vector.
	* @return {Circle} This for chaining.
	*/
	setOffset(offset) {
		this['offset'] = offset;
		return this;
	}
}
// CONCATENATED MODULE: ./craters/Fixture/Fixtures.js



/* harmony default export */ var Fixtures = ({Circle: Circle_Circle, Polygon: Polygon_Polygon});
// CONCATENATED MODULE: ./craters/Modules/Tilemap/Tile.js




class Tile_Tile {
	constructor(context, params, args) {
		let vec = Vector;
		let num = Number;
		let obj = Object;
		let str = String;
		let arr = Array;
		
		this.state = {
		// properties
		}
		this.collision = {
		collides: true
		}
		this.type = 'kinematic';
		this.context = context;
		params = params || new obj({
		// texture properties
		})
		params.style = params.style || new obj({
		// texture style properties
		})
		params.style.fillStyle = params.style.fillStyle || new str("#ddd")
		params.style.lineWidth = params.style.lineWidth || new num(2)
		params.style.strokeStyle = params.style.strokeStyle || new str("#333")
		params.frames = [Math.floor(args[0])]
		// params.image = null;
		// [tileId, row, col, tileset]
		this.state.position = new Vector(params.tilewidth * args[1], params.tileheight * args[2])
		// console.log(this.state)
		// Todo circles too
		this.fixture = new Fixtures.Polygon(this.state.position, [{x:0, y:0}, {x:0, y:params.tileheight}, {x:params.tilewidth, y:params.tileheight}, {x:params.tilewidth, y:0}]);
		this.texture = new Textures.Sprite(this, params);
	}
};
// CONCATENATED MODULE: ./craters/Modules/Tilemap/Tilemap.js


// tilemap add (tilesheet)
class Tilemap_Tilemap {
	constructor(params, context, quad) {
		this.tilemaps = [];
		this.level = null;
		this.quad = quad;
		this.pool = [];
		this.context = context;
	}
	
	__load(tilemap) {
		let tilesets = [];
		this.pool = [];
		// parser
		tilemap.tilesets.forEach((params) => {
			// make a tile
			tilesets.push(params)
		});
		// populate
		tilemap.layers.forEach((layer) => {
			layer.data.forEach((tile) => {
			// make an instance of a tile
			// array [tileId, row, col, tileset]
			let params = tilesets[tile[3]];
			let img	= new Image()
			img.src = params.image;
			img.onload = () => {
				params.image = img;
					let tiles = new Tile_Tile(this.context, params, tile);
					this.quad.insert(tiles)
					this.pool.push(tiles)
				}
			});
		});
	}
	
	load(tilemap, name) {
		this.tilemaps[name] = tilemap;
	}
	
	set(name) {
		if(!this.tilemaps[name]) return;
		this.__load(this.tilemaps[name]);
	}
	
	update(params) {
		this.pool.forEach((tile) => {
			let item = tile;
			let bounds = item.fixture.getAABB();
			let edges = bounds.edges;
			let width = (edges[0].x - edges[2].x) / 2,
			    height = (edges[1].y - edges[3].y) / 2;
			let position = item.state.position;
			let x = position.x,
			    y = position.y;
			if(item.fixture.type == "circle")
			x = position.x - (width / 2),
			y = position.y - (height / 2);

			this.quad.insert({x , y , width, height, item})
			item.texture.update();
		})
	}
	
	render(params) {
		this.pool.forEach((tile) => {
			tile.texture.render();
		})
	}
};
// CONCATENATED MODULE: ./craters/Collision/Broadphase.js
class Broadphase {
    // 
    static collides(collider, collidee) {
        if (collider.collision.collides && collidee.collision.collides) {
            // TODO: 
            // additionally check group 
            return true;
        }
        return false;
    }
    
    static query(collidee, quad) {
	    let collideds = [];
	    let collided = quad.retrieve(collidee);
	    collided.forEach((item) => {collideds.push(item.item)})
	    return collideds;
    }
}
// CONCATENATED MODULE: ./craters/Geometry/SAT.js
// Version 0.8.0 - Copyright 2012 - 2018 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.





  var SAT = {AABB: AABB_AABB, Circle: Circle_Circle, Polygon: Polygon_Polygon};
  // ## Response
  //
  // An object representing the result of an intersection. Contains:
  //  - The two objects participating in the intersection
  //  - The vector representing the minimum change necessary to extract the first object
  //    from the second one (as well as a unit vector in that direction and the magnitude
  //    of the overlap)
  //  - Whether the first object is entirely inside the second, and vice versa.
  /**
   * @constructor
   */
  function Response() {
    this['a'] = null;
    this['b'] = null;
    this['overlapN'] = new Vector();
    this['overlapV'] = new Vector();
    this.clear();
  }
  SAT['Response'] = Response;

  // Set some values of the response back to their defaults.  Call this between tests if
  // you are going to reuse a single Response object for multiple intersection tests (recommented
  // as it will avoid allcating extra memory)
  /**
   * @return {Response} This for chaining
   */
  Response.prototype['clear'] = Response.prototype.clear = function() {
    this['aInB'] = true;
    this['bInA'] = true;
    this['overlap'] = Number.MAX_VALUE;
    return this;
  };

  // ## Object Pools

  // A pool of `Vector` objects that are used in calculations to avoid
  // allocating memory.
  /**
   * @type {Array<Vector>}
   */
  var T_VECTORS = [];
  for (var SAT_i = 0; SAT_i < 10; SAT_i++) { T_VECTORS.push(new Vector()); }

  // A pool of arrays of numbers used in calculations to avoid allocating
  // memory.
  /**
   * @type {Array<Array<number>>}
   */
  var T_ARRAYS = [];
  for (var SAT_i = 0; SAT_i < 5; SAT_i++) { T_ARRAYS.push([]); }

  // Temporary response used for polygon hit detection.
  /**
   * @type {Response}
   */
  var T_RESPONSE = new Response();

  // Tiny "point" polygon used for polygon hit detection.
  /**
   * @type {Polygon}
   */
  var TEST_POINT = new AABB_AABB(new Vector(), 0.000001, 0.000001).toPolygon();

  // ## Helper Functions

  // Flattens the specified array of points onto a unit vector axis,
  // resulting in a one dimensional range of the minimum and
  // maximum value on that axis.
  /**
   * @param {Array<Vector>} points The points to flatten.
   * @param {Vector} normal The unit vector axis to flatten on.
   * @param {Array<number>} result An array.  After calling this function,
   *   result[0] will be the minimum value,
   *   result[1] will be the maximum value.
   */
  function flattenPointsOn(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++ ) {
      // The magnitude of the projection of the point onto the normal
      var dot = points[i].dot(normal);
      if (dot < min) { min = dot; }
      if (dot > max) { max = dot; }
    }
    result[0] = min; result[1] = max;
  }

  // Check whether two convex polygons are separated by the specified
  // axis (must be a unit vector).
  /**
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array<Vector>} aPoints The points in the first polygon.
   * @param {Array<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
   *   will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated
   *   if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false,
   *   and a response is passed in, information about how much overlap and
   *   the direction of the overlap will be populated.
   */
  function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    var rangeA = T_ARRAYS.pop();
    var rangeB = T_ARRAYS.pop();
    // The magnitude of the offset between the two polygons
    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    var projectedOffset = offsetV.dot(axis);
    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV);
      T_ARRAYS.push(rangeA);
      T_ARRAYS.push(rangeB);
      return true;
    }
    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if (response) {
      var overlap = 0;
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response['aInB'] = false;
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
          response['bInA'] = false;
        // B is fully inside A.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      // B starts further left than A
      } else {
        response['bInA'] = false;
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
          response['aInB'] = false;
        // A is fully inside B.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      var absOverlap = Math.abs(overlap);
      if (absOverlap < response['overlap']) {
        response['overlap'] = absOverlap;
        response['overlapN'].copy(axis);
        if (overlap < 0) {
          response['overlapN'].reverse();
        }
      }
    }
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
  }
  SAT['isSeparatingAxis'] = isSeparatingAxis;

  // Calculates which Voronoi region a point is on a line segment.
  // It is assumed that both the line and the point are relative to `(0,0)`
  //
  //            |       (0)      |
  //     (-1)  [S]--------------[E]  (1)
  //            |       (0)      |
  /**
   * @param {Vector} line The line segment.
   * @param {Vector} point The point.
   * @return  {number} LEFT_VORONOI_REGION (-1) if it is the left region,
   *          MIDDLE_VORONOI_REGION (0) if it is the middle region,
   *          RIGHT_VORONOI_REGION (1) if it is the right region.
   */
  function voronoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left voronoi region.
    if (dp < 0) { return LEFT_VORONOI_REGION; }
    // If the point is beyond the end of the line, it is in the
    // right voronoi region.
    else if (dp > len2) { return RIGHT_VORONOI_REGION; }
    // Otherwise, it's in the middle one.
    else { return MIDDLE_VORONOI_REGION; }
  }
  // Constants for Voronoi regions
  /**
   * @const
   */
  var LEFT_VORONOI_REGION = -1;
  /**
   * @const
   */
  var MIDDLE_VORONOI_REGION = 0;
  /**
   * @const
   */
  var RIGHT_VORONOI_REGION = 1;

  // ## Collision Tests

  // Check if a point is inside a circle.
  /**
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * @return {boolean} true if the point is inside the circle, false if it is not.
   */
  function pointInCircle(p, c) {
    var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']).sub(c['offset']);
    var radiusSq = c['r'] * c['r'];
    var distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    // If the distance between is smaller than the radius then the point is inside the circle.
    return distanceSq <= radiusSq;
  }
  SAT['pointInCircle'] = pointInCircle;

  // Check if a point is inside a convex polygon.
  /**
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * @return {boolean} true if the point is inside the polygon, false if it is not.
   */
  function pointInPolygon(p, poly) {
    TEST_POINT['pos'].copy(p);
    T_RESPONSE.clear();
    var result = testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
    if (result) {
      result = T_RESPONSE['aInB'];
    }
    return result;
  }
  SAT['pointInPolygon'] = pointInPolygon;

  // Check if two circles collide.
  /**
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   the circles intersect.
   * @return {boolean} true if the circles intersect, false if they don't.
   */
  function testCircleCircle(a, b, response) {
    // Check if the distance between the centers of the two
    // circles is greater than their combined radius.
    var differenceV = T_VECTORS.pop().copy(b['pos']).add(b['offset']).sub(a['pos']).sub(a['offset']);
    var totalRadius = a['r'] + b['r'];
    var totalRadiusSq = totalRadius * totalRadius;
    var distanceSq = differenceV.len2();
    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) {
      var dist = Math.sqrt(distanceSq);
      response['a'] = a;
      response['b'] = b;
      response['overlap'] = totalRadius - dist;
      response['overlapN'].copy(differenceV.normalize());
      response['overlapV'].copy(differenceV).scale(response['overlap']);
      response['aInB']= a['r'] <= b['r'] && dist <= b['r'] - a['r'];
      response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
    }
    T_VECTORS.push(differenceV);
    return true;
  }
  SAT['testCircleCircle'] = testCircleCircle;

  // Check if a polygon and a circle collide.
  /**
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonCircle(polygon, circle, response) {
    // Get the position of the circle relative to the polygon.
    var circlePos = T_VECTORS.pop().copy(circle['pos']).add(circle['offset']).sub(polygon['pos']);
    var radius = circle['r'];
    var radius2 = radius * radius;
    var points = polygon['calcPoints'];
    var len = points.length;
    var edge = T_VECTORS.pop();
    var point = T_VECTORS.pop();

    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      var next = i === len - 1 ? 0 : i + 1;
      var prev = i === 0 ? len - 1 : i - 1;
      var overlap = 0;
      var overlapN = null;

      // Get the edge.
      edge.copy(polygon['edges'][i]);
      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);

      // If the distance between the center of the circle and the point
      // is bigger than the radius, the polygon is definitely not fully in
      // the circle.
      if (response && point.len2() > radius2) {
        response['aInB'] = false;
      }

      // Calculate which Voronoi region the center of the circle is in.
      var region = voronoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORONOI_REGION) {
        // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge.copy(polygon['edges'][prev]);
        // Calculate the center of the circle relative the starting point of the previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = voronoiRegion(edge, point2);
        if (region === RIGHT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      // If it's the right region:
      } else if (region === RIGHT_VORONOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon['edges'][next]);
        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);
        region = voronoiRegion(edge, point);
        if (region === LEFT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        var normal = edge.perp().normalize();
        // Find the perpendicular distance between the center of the
        // circle and the edge.
        var dist = point.dot(normal);
        var distAbs = Math.abs(dist);
        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;
          // If the center of the circle is on the outside of the edge, or part of the
          // circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) {
            response['bInA'] = false;
          }
        }
      }

      // If this is the smallest overlap we've seen, keep it.
      // (overlapN may be null if the circle was in the wrong Voronoi region).
      if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
        response['overlap'] = overlap;
        response['overlapN'].copy(overlapN);
      }
    }

    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response['a'] = polygon;
      response['b'] = circle;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    T_VECTORS.push(circlePos);
    T_VECTORS.push(edge);
    T_VECTORS.push(point);
    return true;
  }
  SAT['testPolygonCircle'] = testPolygonCircle;

  // Check if a circle and a polygon collide.
  //
  // **NOTE:** This is slightly less efficient than polygonCircle as it just
  // runs polygonCircle and reverses everything at the end.
  /**
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testCirclePolygon(circle, polygon, response) {
    // Test the polygon against the circle.
    var result = testPolygonCircle(polygon, circle, response);
    if (result && response) {
      // Swap A and B in the response.
      var a = response['a'];
      var aInB = response['aInB'];
      response['overlapN'].reverse();
      response['overlapV'].reverse();
      response['a'] = response['b'];
      response['b'] = a;
      response['aInB'] = response['bInA'];
      response['bInA'] = aInB;
    }
    return result;
  }
  SAT['testCirclePolygon'] = testCirclePolygon;

  // Checks whether polygons collide.
  /**
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonPolygon(a, b, response) {
    var aPoints = a['calcPoints'];
    var aLen = aPoints.length;
    var bPoints = b['calcPoints'];
    var bLen = bPoints.length;
    // If any of the edge normals of A is a separating axis, no intersection.
    for (var i = 0; i < aLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
        return false;
      }
    }
    // If any of the edge normals of B is a separating axis, no intersection.
    for (var i = 0;i < bLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
        return false;
      }
    }
    // Since none of the edge normals of A or B are a separating axis, there is an intersection
    // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
    // final overlap vector.
    if (response) {
      response['a'] = a;
      response['b'] = b;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    return true;
  }
  SAT['testPolygonPolygon'] = testPolygonPolygon;

  /* harmony default export */ var Geometry_SAT = (SAT);
// CONCATENATED MODULE: ./craters/Collision/Narrowphase.js


class Narrowphase {
    static overlap(collider, collidee) {
        return true;
    }
    
    static query(collidee, colliders) {
	    let collided = [];
	    
	    colliders.forEach((collider) => {
		    if(this.overlap(collider, collidee))
		    collided.push(collider)
	    })
	    
	    return collided;
    }
}
// CONCATENATED MODULE: ./craters/Collision/Solver.js





class Solver_Solver {
	constructor() {
		this.response = new Geometry_SAT.Response(); // Response reused for collisions
	}
	resolve(collidee, colliders) {
		colliders.forEach((collider) => {
			let collided;
			if (collider.fixture instanceof Circle_Circle) {
				if (collidee.fixture instanceof Circle_Circle) {
					collided = Geometry_SAT.testCircleCircle(collider.fixture, collidee.fixture, this.response);
				} else {
					collided = Geometry_SAT.testCirclePolygon(collider.fixture, collidee.fixture, this.response);
				}
			} else {
				if (collidee.fixture instanceof Circle_Circle) {
					collided = Geometry_SAT.testPolygonCircle(collider.fixture, collidee.fixture, this.response);
				} else {
					collided = Geometry_SAT.testPolygonPolygon(collider.fixture, collidee.fixture, this.response);
				}
			}
			if (collided) {
				// TODO look into this
				if (collider.type == 'kinematic') {
				  // Move the collidee object out of us
				  collidee.state.position.add(this.response.overlapV);
				  collidee.state.velocity.add(this.response.overlapV);
				} else if (collidee.type == 'kinematic') {
				  // Move us out of the collidee object
				  collider.state.position.sub(this.response.overlapV);
				  collider.state.velocity.sub(this.response.overlapV);
				} else {
				  // Move equally out of each collidee
				  this.response.overlapV.scale(0.5);
				  collider.state.position.sub(this.response.overlapV);
				  collidee.state.position.add(this.response.overlapV);
				  
				  collider.state.velocity.sub(this.response.overlapV);
				  collidee.state.velocity.add(this.response.overlapV);
				}
			}
			this.response.clear();
		})
	}
};
// CONCATENATED MODULE: ./craters/Game.js











class Game_Game {
	constructor(params) {
		params.entities = params.entities || [];
		params.size = params.size || new Vector(1000, 500);
		params.gravity = params.gravity || new Vector();
		params.quad = params.quad || new Vector();
		params.resources = params.resources || {
			// resources object
		};
		params.resources.image = params.resources.image || [];
		params.resources.audio = params.resources.audio || [];
		params.resources.data = params.resources.data  || [];
		
		params.fps = params.fps || 60;
		params.debug = params.debug || false;
		
		this.entities = params.entities;
		this.debug = params.debug;
		this.state = {
			size: params.size,
			gravity: params.gravity
		}
	
		// create viewport
		this.viewport = new Canvas(this.state.size.x, this.state.size.y, params.container);
		this.context = this.viewport.context;
		// Create new grid
		this.quad = new QuadTree({x: params.quad.x, y: params.quad.y, width: params.size.x, height: params.size.y});
		this.solver = new Solver_Solver();
		this.tilemap = new Tilemap_Tilemap(params.tilemap, this.context, this.quad)
		
		// Loop main game
		this.loop = new Loop(this, params.fps)
		window['cg'] = this;
	}
	
	addObject(object) {
		// used for adding entities
		object.context = this.context;
		return this.entities.push(object)
	}
	
	removeObject(index) {
		// used to remove entities
		// this.quad.remove(this.entities[index])
		return this.entities.splice(index, 1)
	}
	
	update() {
		this.quad.clear()
		this.tilemap.update()
		// Loop through all bodies and update one at a time
		this.entities.forEach((body) => {
			// update grid quad
			let item = body;
			let bounds = item.fixture.getAABB();
			let edges = bounds.edges;
			let width = (edges[0].x - edges[2].x) / 2,
				height = (edges[1].y - edges[3].y) / 2;
			let position = item.state.position;
			let x = position.x,
				y = position.y;
			if(item.fixture.type == "circle")
			x = position.x - (width / 2),
			y = position.y - (height / 2);
			this.quad.insert({x , y , width, height, item})
			
			let broad = Broadphase.query(body, this.quad)
			let narrow = Narrowphase.query(body, broad)
			this.solver.resolve(body, narrow);
			// kinematics
			let gravity = this.state.gravity.clone().scale(body.gravityFactor.x, body.gravityFactor.y);
			let mass = body.state.mass;
			
			body.state.acceleration.add(gravity);
			body.state.velocity.add(body.state.acceleration);
			
			body.state.velocity.x = Math.min(body.state.velocity.x, body.state.maxVelocity.x);
			body.state.velocity.y = Math.min(body.state.velocity.y, body.state.maxVelocity.y);
			
			body.state.position.add(body.state.velocity.clone().scale(1 / this.state.loop.nframe))
			body.update();
		})
	}
	
	render() {
		// background clear
		this.viewport.clear()
		this.tilemap.render()
		
		if(this.debug) {
			let node = this.quad.root;
			let drawBound = (node) => {
				let bounds = node._bounds;
				let abs = Common.abs;
				let context = this.context;
				
				context.save()
				context.strokeStyle = "green";
				context.lineWidth = "2";
				context.beginPath();
				context.rect(bounds.x, bounds.y, bounds.width, bounds.height);
				
				let children = node.getChildren();
				let childlength = children.length;
				let childNode;
				if(childlength) {
					for(let j = 0; j < childlength; j++) {
					childNode = children[j];
					context.beginPath();
					context.rect(childNode.x, childNode.y, childNode.width, childNode.height);
					}
				}
				
				let len = node.nodes.length;
				for(let i = 0; i < len; i++) {
					drawBound(node.nodes[i]);
				}
				context.stroke()
				context.restore();
			}
			// draw the QuadTree grid
			drawBound(node);
		}
		
		this.entities.forEach((body) => {
			// render body
			body.render();
			body.texture.update();
			body.texture.render();
		})
	}
}
// CONCATENATED MODULE: ./craters/craters.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Craters", function() { return Craters; });
/* concated harmony reexport Game */__webpack_require__.d(__webpack_exports__, "Game", function() { return Game_Game; });
/* concated harmony reexport Entity */__webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity_Entity; });
/* concated harmony reexport Fixtures */__webpack_require__.d(__webpack_exports__, "Fixtures", function() { return Fixtures; });
/* concated harmony reexport Vector */__webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
/* concated harmony reexport Maths */__webpack_require__.d(__webpack_exports__, "Maths", function() { return Common; });
// Craters.js micro game framework
// This module contains the core craters.js framework fundamentals
// it loads modules and exports them








class Craters {
    static version() {
        return '1.2.2'
    }
}



/***/ })
/******/ ]);