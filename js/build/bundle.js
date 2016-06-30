/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _joystick = __webpack_require__(1);

	var _joystick2 = _interopRequireDefault(_joystick);

	var _calibrationButton = __webpack_require__(3);

	var _calibrationButton2 = _interopRequireDefault(_calibrationButton);

	var _hpBoard = __webpack_require__(4);

	var _hpBoard2 = _interopRequireDefault(_hpBoard);

	var _spheroStates = __webpack_require__(5);

	var _spheroStates2 = _interopRequireDefault(_spheroStates);

	var _spheroClient = __webpack_require__(6);

	var _spheroClient2 = _interopRequireDefault(_spheroClient);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var spheroStates;

	// webpack

	var spheroClient;
	var joystick;
	var calibrationButton;
	var hpBoard;

	document.addEventListener("DOMContentLoaded", function () {
	  spheroStates = new _spheroStates2.default();
	  spheroClient = new _spheroClient2.default();
	  joystick = new _joystick2.default();
	  hpBoard = new _hpBoard2.default(document.getElementById("hp-box"));
	  calibrationButton = new _calibrationButton2.default(document.getElementById("calibration-button"));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _publisher = __webpack_require__(2);

	var _publisher2 = _interopRequireDefault(_publisher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Joystick() {
	  var _this = this;

	  this.movementPerPixel = 1;
	  window.addEventListener("resize", function () {
	    _this.updateMovementPerPixel();
	  });
	  this.updateMovementPerPixel();
	  this.maxDistance = 25;
	  this.element = document.querySelector("#stick #draggable");
	  this.element.addEventListener("mousedown", function () {
	    _this.isClick = true;
	    _this.changeStickColor();
	  });
	  document.addEventListener("mouseup", function () {
	    if (_this.isClick) {
	      _this.isClick = false;
	      _this.setNeutralPosition();
	      _this.changeStickColor();
	    }
	  });
	  document.addEventListener("mousemove", function (event) {
	    if (_this.isClick) {
	      _this.move(event.movementX * _this.movementPerPixel, event.movementY * _this.movementPerPixel);
	    }
	  });

	  this.isClick = false;
	  this.setNeutralPosition();
	}

	Joystick.prototype.updateMovementPerPixel = function () {
	  this.movementPerPixel = 100 / document.getElementById("stick-box").clientWidth;
	};

	Joystick.prototype.changeStickColor = function () {
	  if (this.isClick) {
	    this.element.setAttribute("fill", "#ddd");
	  } else {
	    this.element.setAttribute("fill", "white");
	  }
	};

	Joystick.prototype.setNeutralPosition = function () {
	  this._setPosition(0, 0);
	};

	Joystick.prototype.move = function (movementX, movementY) {
	  var fixedPosition = getFixedPosition(this.x + movementX, this.y + movementY, this.maxDistance);
	  this._setPosition(fixedPosition.x, fixedPosition.y);
	};

	Joystick.prototype._setPosition = function (x, y) {
	  this.x = x;
	  this.y = y;
	  this.updateJoystick();

	  var degreeAndSpeed = toDegreeAndSpeed(this.x, this.y, this.maxDistance);
	  _publisher2.default.publish("rollingSpeed", degreeAndSpeed.speed);
	  _publisher2.default.publish("rollingDegree", degreeAndSpeed.degree);
	};

	Joystick.prototype.updateJoystick = function () {
	  this.element.setAttribute("cx", this.x + 50);
	  this.element.setAttribute("cy", this.y + 50);
	};

	function getFixedPosition(x, y, maxDistance) {
	  var distance = getDistance(0, x, 0, y);
	  if (getDistance(0, x, 0, y) > maxDistance) {
	    var radian = Math.atan2(y, x);
	    return {
	      x: Math.cos(radian) * maxDistance,
	      y: Math.sin(radian) * maxDistance
	    };
	  }
	  return { x: x, y: y };
	}

	function toDegreeAndSpeed(x, y, maxDistance) {
	  var degree = Math.atan2(y, x);
	  degree = Math.floor((degree / Math.PI * 180 + 450) % 360);

	  // getDistanceで取れる値の範囲は、
	  // 0～this.maxDistanceである。
	  // しかし、degreeは0～255でとりたいので、
	  // 修正する
	  var magnification = 255 / maxDistance;
	  var speed = Math.floor(getDistance(0, x, 0, y) * magnification);
	  return { degree: degree, speed: speed };
	}

	function getDistance(x1, x2, y1, y2) {
	  var dx = Math.abs(x1 - x2);
	  var dy = Math.abs(y1 - y2);
	  // Todo: 平方根を求めるのは重いので変えておく
	  return Math.sqrt(dx * dx + dy * dy);
	}

	exports.default = Joystick;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Publisherは、データを保存せず、外部へ変更を知らせる機能に絞る。
	function Publisher() {
	  this.observers = {};
	}

	Publisher.prototype.subscribe = function (type, observer) {
	  if (typeof this.observers[type] === "undefined") {
	    this.observers[type] = [];
	  }
	  this.observers[type].push(observer);
	};

	Publisher.prototype.publish = function (type, nextData) {
	  if (type.indexOf(":") !== -1) {
	    throw new Error("publishのtypeに「:」を含むことはできません。");
	  }
	  if (typeof this.observers[type] === "undefined") {
	    this.observers[type] = [];
	  }
	  this.observers[type].forEach(function (observer) {
	    observer(nextData);
	  });
	  if (typeof this.observers[type + ":after"] !== "undefined") {
	    this.observers[type + ":after"].forEach(function (observer) {
	      observer(nextData);
	    });
	  }
	};

	exports.default = new Publisher();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _publisher = __webpack_require__(2);

	var _publisher2 = _interopRequireDefault(_publisher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function CalibrationButton(element) {
	  var _this = this;

	  this.isCalibrating = false;
	  this.element = element;

	  this.element.addEventListener("click", function () {
	    _this.isCalibrating = !_this.isCalibrating;
	    _this.updateButtonStyle();
	    _publisher2.default.publish("spheroState", _this.isCalibrating ? "calibrating" : "idling");
	  });
	}

	// this.isCalibrating の状態に合わせて、UIを更新する
	CalibrationButton.prototype.updateButtonStyle = function () {
	  if (this.isCalibrating) {
	    this.element.classList.add("active-calibration");
	  } else {
	    this.element.classList.remove("active-calibration");
	  }
	};

	exports.default = CalibrationButton;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _publisher = __webpack_require__(2);

	var _publisher2 = _interopRequireDefault(_publisher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function HPBoard(element) {
	  var _this = this;

	  this.element = element;
	  this.hp = 0;
	  _publisher2.default.subscribe("hp", function (hp) {
	    _this.hp = hp;
	    _this.updateHP();
	  });
	  _publisher2.default.publish("hp", 100);
	}

	HPBoard.prototype.updateHP = function () {
	  this.element.textContent = "HP:" + this.hp.toString();
	};

	exports.default = HPBoard;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _publisher = __webpack_require__(2);

	var _publisher2 = _interopRequireDefault(_publisher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SpheroStates() {
	  var _this = this;

	  this.state = "idling";
	  _publisher2.default.subscribe("spheroState", function (spheroState) {
	    _this.state = spheroState;
	  });

	  this.rollingSpeed = 0;
	  _publisher2.default.subscribe("rollingSpeed", function (rollingSpeed) {
	    _this.rollingSpeed = rollingSpeed;
	  });

	  this.rollingDegree = 0;
	  _publisher2.default.subscribe("rollingDegree", function (rollingDegree) {
	    _this.rollingDegree = rollingDegree;
	  });
	}

	exports.default = SpheroStates;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _publisher = __webpack_require__(2);

	var _publisher2 = _interopRequireDefault(_publisher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SpheroClient() {
	  var _this = this;

	  this.speedOfAccuracy = 5;
	  this.degreeOfAccuracy = 5;
	  this.sendInterval = 100;
	  this._isBreaking = false;

	  this._beforeDegree = 0;
	  this.degree = 0;

	  this._beforeSpeed = 0;
	  this.speed = 0;

	  this.orb = new sphero();
	  this.orb.connect("ws://localhost:8080", function () {
	    _this.orb.color("red");
	    _publisher2.default.subscribe("rollingDegree", function (degree) {
	      _this._beforeDegree = _this.degree;
	      _this.degree = degree;
	      _this._roll();
	    });
	    _publisher2.default.subscribe("rollingSpeed", function (speed) {
	      _this._beforeSpeed = _this.speed;
	      _this.speed = speed;
	      _this._roll();
	    });

	    _publisher2.default.subscribe("spheroState", function (spheroState) {
	      if (spheroState === "idling") {
	        _this.orb.finishCalibration();
	      } else {
	        _this.orb.startCalibration();
	      }
	    });
	  });
	  this.orb.listenCustomMessage("hp", function (data) {
	    console.log(data);
	    _publisher2.default.publish("hp", data.hp);
	  });
	}

	SpheroClient.prototype._roll = function () {
	  var _this2 = this;

	  if (this._isBreaking) {
	    return;
	  }
	  if (Math.abs(this.speed - this._beforeSpeed) > this.speedOfAccuracy || Math.abs(this.degree - this._beforeDegree) > this.degreeOfAccuracy) {
	    this._isBreaking = true;
	    setTimeout(function () {
	      _this2.orb.roll(_this2.speed, _this2.degree);
	      _this2._isBreaking = false;
	    }, this.sendInterval);
	  }
	};

	exports.default = SpheroClient;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "html {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  margin: 0px;\r\n  height: 100%;\r\n}\r\n\r\n#boxes {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n#boxes > * {\r\n  position: fixed;\r\n}\r\n\r\n#hp-box {\r\n  top: 0px;\r\n  left: 0px;\r\n  width: 60%;\r\n  height: 50%;\r\n  margin: 10px;\r\n  border: 10px solid blueviolet;\r\n  background-color: #111;\r\n  color: yellow;\r\n  border-radius: 10px;\r\n  font-size: 30vh;\r\n  line-height: 100%;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n#demon-box {\r\n  top: 0px;\r\n  right: 0px;\r\n  width: 30%;\r\n  height: 50%;\r\n  margin: 10px;\r\n  border: 10px solid blueviolet;\r\n  background-color: #111;\r\n  color: yellow;\r\n  border-radius: 10px;\r\n  box-sizing: border-box;\r\n  background-size: contain;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n#demon-box.active-demon {\r\n  background-image: url(\"/images/demon.png\");\r\n}\r\n\r\n#stick-box {\r\n  bottom: 0px;\r\n  left: 0px;\r\n  width: 50vh;\r\n  height: 50%;\r\n}\r\n\r\n#calibration-button {\r\n  bottom: 0px;\r\n  right: 0px;\r\n  width: 30vh;\r\n  height: 30%;\r\n  margin: 10px;\r\n  background-image: url(\"/images/calibration.png\");\r\n  background-size: 90%;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  border-radius: 10px;\r\n  background-color: blueviolet;\r\n  border: none;\r\n}\r\n\r\n#calibration-button.active-calibration {\r\n  background-color: yellow;\r\n}\r\n\r\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);