/*!
NICE Design System 0.2.20 | 2017-07-25
© Copyright NICE 2015-2017
Licensed under MIT (https://github.com/nhsevidence/nice-design-system/blob/master/LICENSE)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("nice", [], factory);
	else if(typeof exports === 'object')
		exports["nice"] = factory();
	else
		root["nice"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/javascripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.utils = exports.breakpoints = exports.eventr = exports.pluginizr = exports.pluginAutoLoader = exports.Tracker = exports.Tabs = exports.InPageNav = exports['default'] = undefined;
	
	var _pluginAutoloader = __webpack_require__(2);
	
	var _pluginAutoloader2 = _interopRequireDefault(_pluginAutoloader);
	
	var _tabs = __webpack_require__(4);
	
	var _tabs2 = _interopRequireDefault(_tabs);
	
	var _inPageNav = __webpack_require__(7);
	
	var _inPageNav2 = _interopRequireDefault(_inPageNav);
	
	var _tracker = __webpack_require__(16);
	
	var _tracker2 = _interopRequireDefault(_tracker);
	
	var _pluginizr = __webpack_require__(3);
	
	var _pluginizr2 = _interopRequireDefault(_pluginizr);
	
	var _eventr = __webpack_require__(6);
	
	var _eventr2 = _interopRequireDefault(_eventr);
	
	var _breakpoints = __webpack_require__(9);
	
	var _breakpoints2 = _interopRequireDefault(_breakpoints);
	
	var _utils = __webpack_require__(8);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var nice = {
		init: function init(el) {
	
			// Load all component modules from this directory automatically, see http://stackoverflow.com/a/31770875/486434
			// But exclude test files http://stackoverflow.com/a/30372240
			_pluginAutoloader2['default'].load(__webpack_require__(17));
			_pluginAutoloader2['default'].load(__webpack_require__(18));
	
			_pluginAutoloader2['default'].findPlugins(el);
		},
		// Components
		InPageNav: _inPageNav2['default'],
		Tabs: _tabs2['default'],
		Tracker: _tracker2['default'],
		// Utils
		pluginAutoLoader: _pluginAutoloader2['default'],
		pluginizr: _pluginizr2['default'],
		eventr: _eventr2['default'],
		breakpoints: _breakpoints2['default'],
		utils: _utils2['default']
	};
	
	$.fn.nice = function () {
		nice.init(this);
	};
	
	// Export to global namespace for precompiled usage
	window.NICE = window.NICE || {};
	window.NICE.nice = nice;
	
	exports['default'] = nice;
	exports.InPageNav = _inPageNav2['default'];
	exports.Tabs = _tabs2['default'];
	exports.Tracker = _tracker2['default'];
	exports.pluginAutoLoader = _pluginAutoloader2['default'];
	exports.pluginizr = _pluginizr2['default'];
	exports.eventr = _eventr2['default'];
	exports.breakpoints = _breakpoints2['default'];
	exports.utils = _utils2['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.load = load;
	exports.findPlugins = findPlugins;
	
	var _pluginizr = __webpack_require__(3);
	
	// Regex to find the name of a module from its path.
	// E.g, "./experience.js" find "experience" from the matched group
	// E.g, "/tabs/tabs.js" find "tabs" from the matched group
	var ModuleNameRegex = /([^\/.]*)\.js$/i;
	
	// Constructs a module object - parses a key (path) into a module name
	var getModuleObj = function getModuleObj(key) {
		return { key: key, name: key.match(ModuleNameRegex, "")[1] };
	};
	
	// Require and return a module
	var requireModule = function requireModule(module, localRequire) {
		localRequire(module.key);
		return module;
	};
	
	/// Load all plugins from the given require context.
	/// @example
	/// 	import { pluginAutoLoader } from "nice-experience";
	/// 	pluginAutoLoader.load(require.context("./", true, /\.js$/));
	function load(localRequire) {
		// Build a list from which to auto-load
		localRequire.keys().filter(function (k) {
			return k !== "./experience.js";
		}) // Ignore experience as it's our entry point so treated differently
		.map(getModuleObj).map(function (module) {
			return requireModule(module, localRequire);
		}).filter(function (m) {
			return m.name in $.fn;
		}); // Now the module is loaded, only care about ones that are a plugin
	}
	
	function findPlugins($context) {
		(0, _pluginizr.getPlugins)().forEach(function (plugin) {
			// Load any plugins automatically
			$("[data-" + plugin.name + "]", $context || $(document)).each(function (i, el) {
	
				var $el = $(el),
				    options;
	
				// Convert plugin data-attributes into options object
				// e.g. data-plugin-test="true" data-plugin-something-else="1" becomes:
				// { test: true, somethingElse: 1 }
				[].forEach.call(el.attributes, function (attr) {
	
					var match = attr.name.match(new RegExp("^data-(" + plugin.name + "-.+)"));
					if (match && match.length === 2) {
						var attrName = $.camelCase(match[1]),
						    propName = $.camelCase(match[1].replace(plugin.name + "-", ""));
						options = options || {};
						options[propName] = $el.data(attrName); // Use jquery's data because it parses types
					}
				});
	
				$(el)[plugin.name](options);
			});
		});
	}
	
	/// Auto plugin loader.
	/// Useful for JIT loading of plugins
	exports['default'] = {
		load: load,
		findPlugins: findPlugins
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.getPlugins = getPlugins;
	// List of registered plugins, as { name, pluginClass }
	var plugins = [];
	
	/**
	 * Gets a list of registered plugins.
	 *
	 * @return {Array} The list of registered plugins. The array item consists of a name (string) property pluginClass property.
	 */
	function getPlugins() {
		return plugins;
	}
	
	/**
	 * Turns a given class into a jQuery plugin.
	 * Proxies methods on the class via jQuery plugin style invocation (see example).
	 * @param  {string} pluginName	The name of the plugin
	 * @param  {Class} plugin 		The class of the plugin itself
	 * @link http://www.acuriousanimal.com/2013/01/15/things-i-learned-creating-a-jquery-plugin-part-i.html
	 * @example
	 * 	import { pluginizr } from "nice-experience";
	 * 	public class Test {
	 * 		constructor(element, options) {
	 * 		}
	 * 		aMethod(arg1) {
	 *
	 * 		}
	 * 		getValue() {
	 * 			return true;
	 * 		}
	 * 	}
	 * 	pluginizr("test", Test);
	 *
	 * 	// Class Test is now available as a plugin:
	 * 	$(".selector").test();
	 * 	$(".selector").test("aMethod", 99);
	 * 	var value = $(".selector").test("getValue");
	 */
	
	exports['default'] = function (pluginName, Plugin) {
	
		plugins.push({ name: pluginName, pluginClass: Plugin }); // Store this registered plugin
	
		var dataName = "__" + pluginName,
		    old = $.fn[pluginName];
	
		$.fn[pluginName] = function (options) {
	
			var args = arguments;
	
			// TODO: Destory plugin by removing the data
	
			if (options === undefined || (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
				return this.each(function (i, el) {
					// Create an instance of the plugin and cache it
					if (!$.data(el, dataName)) {
						$.data(el, dataName, new Plugin(el, options));
					}
				});
			} else if (typeof options === "string" && options[0] !== "_" && options !== "init") {
				// _* methods as these are private by convention
	
				// Assume $(".selector").plugin("methodName", anArg, anotherArg)
				// Call a public plugin method (not starting with an underscore) for each selected element.
				var methodName = options,
				    methodArgs = Array.prototype.slice.call(args, 1);
	
				// Ideally we would use Object.getOwnPropertyNames(Plugin.prototype); to get
				// true 'getters' but to support IE8 we can't do this. So we relay on a naming
				// convention of getters start "get" e.g. getCurrentIndex();
	
				// No arguments and starting with 'get' means a getter which breaks chainability
				if (methodArgs.length == 0 && /^get.+$/.test(methodName)) {
					if (this.length > 1) {
						$.error("Cannot call a getter '" + methodName + "' on a collection of elements");
						return;
					}
					var instance = $.data(this[0], dataName);
					return instance[methodName].apply(instance);
				} else {
					// Invoke the speficied method on each selected element
					return this.each(function () {
						var instance = $.data(this, dataName);
						if (instance instanceof Plugin && typeof instance[methodName] === "function") {
							instance[methodName].apply(instance, methodArgs);
						} else {
							$.error("Method '" + methodName + "' could not be found");
						}
					});
				}
			}
		};
	
		// Expose the plugins"s defaults so plugin users can see them
		if (Plugin.defaults && typeof Plugin.defaults === "function") $.fn[pluginName].defaults = Plugin.defaults();
	
		// No conflict
		$.fn[pluginName].noConflict = function () {
			return $.fn[pluginName] = old;
		};
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*eslint-env browser */
	
	/**
	 * @module A test module
	 * Tabs
	 */
	
	var _keycode = __webpack_require__(5);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _pluginizr = __webpack_require__(3);
	
	var _pluginizr2 = _interopRequireDefault(_pluginizr);
	
	var _eventr = __webpack_require__(6);
	
	var _eventr2 = _interopRequireDefault(_eventr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Defaults = {
		tabClass: "tabs__tab",
		tabActiveClass: "tabs__tab--active",
		tabButtonClass: "tabs__tab-btn",
		tabPaneClass: "tabs__pane",
		tabPaneActiveClass: "tabs__pane--active"
	};
	
	// Generate unique id amongst tabs
	// See http://stackoverflow.com/a/20302361
	var uid = function (i) {
		return function () {
			return "tabs-" + ++i;
		};
	}(0);
	
	/**
	 * @class Tabs
	 * Follows W3 design for tab panels with aria attributes.
	 * @link https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
	 */
	
	var Tabs = function () {
		_createClass(Tabs, null, [{
			key: "defaults",
			value: function defaults() {
				return Defaults;
			}
		}]);
	
		function Tabs(element, options) {
			var _this = this;
	
			_classCallCheck(this, Tabs);
	
			if (!element) throw new Error("Element must be non-null");
	
			this.el = element;
			this.$el = $(element);
	
			this.options = $.extend({}, Tabs.defaults(), options);
	
			// Generate random ids for tabs and panes, for use with aria attributes
			this._getTabs().each(function (i, el) {
				var tabId = uid(),
				    paneId = uid();
	
				$(el).find("." + _this.options.tabButtonClass).prop("id", tabId).attr("aria-controls", paneId);
	
				_this._getTabPanes().eq(i).prop("id", paneId).attr("aria-labelledby", tabId);
			});
	
			this.delegate();
	
			this.activate(0, false);
		}
	
		_createClass(Tabs, [{
			key: "events",
			value: function events() {
				var _ref;
	
				return _ref = {}, _defineProperty(_ref, "click ." + this.options.tabButtonClass, "_handleTabBtnClick"), _defineProperty(_ref, "keydown ." + this.options.tabButtonClass, "_handleTabBtnKeydown"), _defineProperty(_ref, "keydown ." + this.options.tabPaneClass, "_handlePaneKeydown"), _ref;
			}
	
			/// Gets the 0-based index of the currently selected tab
	
		}, {
			key: "getCurrentIndex",
			value: function getCurrentIndex() {
				return this._getTabs().filter("." + this.options.tabActiveClass).index();
			}
	
			/// Activates a tab with the given index
			/// @param {integer} index The index of the tab to activate
			/// @param {boolean} focus Whether to give focus to the active tab btn
	
		}, {
			key: "activate",
			value: function activate(index) {
				var focus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
				var $selectedTabBtn = this._getTabs().removeClass(this.options.tabActiveClass).find("." + this.options.tabButtonClass).attr("aria-expanded", false).attr("aria-selected", false).end().eq(index).addClass(this.options.tabActiveClass).find("." + this.options.tabButtonClass).attr("aria-expanded", true).attr("aria-selected", true);
	
				if (focus === true) {
					$selectedTabBtn.focus();
				}
	
				this._getTabPanes().removeClass(this.options.tabPaneActiveClass).attr("aria-hidden", true).eq(index).addClass(this.options.tabPaneActiveClass).attr("aria-hidden", false);
	
				return this.getCurrentIndex();
			}
	
			/**
	   * Activates the next tab, or the first we're at the end
	   * @return {Integer} The current index
	   */
	
		}, {
			key: "next",
			value: function next() {
				var currentIndex = this.getCurrentIndex();
				if (currentIndex === this._getTabs().length - 1) {
					return this.first();
				} else {
					return this.activate(currentIndex + 1);
				}
			}
	
			/**
	   * Activates the previous tab, or the last tab if we're at the start
	   * @return {Integer} The current index
	   */
	
		}, {
			key: "previous",
			value: function previous() {
				var currentIndex = this.getCurrentIndex();
				if (currentIndex === 0) {
					return this.last();
				} else {
					return this.activate(currentIndex - 1);
				}
			}
	
			/**
	   * Activates the first tab
	   * @return {Integer} The current index
	   */
	
		}, {
			key: "first",
			value: function first() {
				return this.activate(0);
			}
	
			/**
	   * Activates the last tab
	   * @return {Integer} The current index
	   */
	
		}, {
			key: "last",
			value: function last() {
				return this.activate(this._getTabs().length - 1);
			}
	
			// PRIVATE
	
			// Gets the tab elements
	
		}, {
			key: "_getTabs",
			value: function _getTabs() {
				return $("." + this.options.tabClass, this.$el);
			}
	
			// Gets the tab pane elements
	
		}, {
			key: "_getTabPanes",
			value: function _getTabPanes() {
				return $("." + this.options.tabPaneClass, this.$el);
			}
	
			// Handle clicking on a tab
	
		}, {
			key: "_handleTabBtnClick",
			value: function _handleTabBtnClick(e) {
				e.preventDefault();
	
				var index = $(e.currentTarget).closest("." + this.options.tabClass).index();
				this.activate(index);
			}
	
			// Enable keyboard control of the tabs
	
		}, {
			key: "_handleTabBtnKeydown",
			value: function _handleTabBtnKeydown(e) {
				switch ((0, _keycode2['default'])(e.which)) {
					// Go backwards one tab
					case "left":
					case "up":
						e.preventDefault();
						e.stopPropagation();
						this.previous();
						break;
	
					// Go forward one tab
					case "right":
					case "down":
						e.preventDefault();
						e.stopPropagation();
						this.next();
						break;
	
					// Go to the first tab
					case "home":
						e.preventDefault();
						e.stopPropagation();
						this.first();
						break;
	
					// Go to the last tab
					case "end":
						e.preventDefault();
						e.stopPropagation();
						this.last();
						break;
	
					// Go to the focussed tab
					case "enter":
					case "space":
						e.preventDefault();
						e.stopPropagation();
						this.activate($(e.currentTarget).closest("." + this.options.tabClass).index());
						break;
					default:
						break;
				}
			}
	
			// Focus the current tab btn on a ctrl+up or ctrl+left when in a tab pane
	
		}, {
			key: "_handlePaneKeydown",
			value: function _handlePaneKeydown(e) {
				if ($.inArray((0, _keycode2['default'])(e.which), ["up", "left"]) > -1 && e.ctrlKey) {
					e.preventDefault();
					e.stopPropagation();
	
					var tabId = $(e.currentTarget).attr("aria-labelledby");
					$("#" + tabId).focus();
				}
			}
		}]);
	
		return Tabs;
	}();
	
	exports['default'] = Tabs;
	
	
	(0, _eventr2['default'])(Tabs);
	(0, _pluginizr2['default'])("tabs", Tabs);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// Source: http://jsfiddle.net/vWx8V/
	// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes
	
	/**
	 * Conenience method returns corresponding value for given keyName or keyCode.
	 *
	 * @param {Mixed} keyCode {Number} or keyName {String}
	 * @return {Mixed}
	 * @api public
	 */
	
	exports = module.exports = function(searchInput) {
	  // Keyboard Events
	  if (searchInput && 'object' === typeof searchInput) {
	    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
	    if (hasKeyCode) searchInput = hasKeyCode
	  }
	
	  // Numbers
	  if ('number' === typeof searchInput) return names[searchInput]
	
	  // Everything else (cast to string)
	  var search = String(searchInput)
	
	  // check codes
	  var foundNamedKey = codes[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // check aliases
	  var foundNamedKey = aliases[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // weird character?
	  if (search.length === 1) return search.charCodeAt(0)
	
	  return undefined
	}
	
	/**
	 * Get by name
	 *
	 *   exports.code['enter'] // => 13
	 */
	
	var codes = exports.code = exports.codes = {
	  'backspace': 8,
	  'tab': 9,
	  'enter': 13,
	  'shift': 16,
	  'ctrl': 17,
	  'alt': 18,
	  'pause/break': 19,
	  'caps lock': 20,
	  'esc': 27,
	  'space': 32,
	  'page up': 33,
	  'page down': 34,
	  'end': 35,
	  'home': 36,
	  'left': 37,
	  'up': 38,
	  'right': 39,
	  'down': 40,
	  'insert': 45,
	  'delete': 46,
	  'command': 91,
	  'left command': 91,
	  'right command': 93,
	  'numpad *': 106,
	  'numpad +': 107,
	  'numpad -': 109,
	  'numpad .': 110,
	  'numpad /': 111,
	  'num lock': 144,
	  'scroll lock': 145,
	  'my computer': 182,
	  'my calculator': 183,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221,
	  "'": 222
	}
	
	// Helper aliases
	
	var aliases = exports.aliases = {
	  'windows': 91,
	  '⇧': 16,
	  '⌥': 18,
	  '⌃': 17,
	  '⌘': 91,
	  'ctl': 17,
	  'control': 17,
	  'option': 18,
	  'pause': 19,
	  'break': 19,
	  'caps': 20,
	  'return': 13,
	  'escape': 27,
	  'spc': 32,
	  'pgup': 33,
	  'pgdn': 34,
	  'ins': 45,
	  'del': 46,
	  'cmd': 91
	}
	
	
	/*!
	 * Programatically add the following
	 */
	
	// lower case chars
	for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32
	
	// numbers
	for (var i = 48; i < 58; i++) codes[i - 48] = i
	
	// function keys
	for (i = 1; i < 13; i++) codes['f'+i] = i + 111
	
	// numpad keys
	for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96
	
	/**
	 * Get by code
	 *
	 *   exports.name[13] // => 'Enter'
	 */
	
	var names = exports.names = exports.title = {} // title for backward compat
	
	// Create reverse mapping
	for (i in codes) names[codes[i]] = i
	
	// Add aliases
	for (var alias in aliases) {
	  codes[alias] = aliases[alias]
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.delegate = delegate;
	exports.undelegate = undelegate;
	/**
	 * @module Eventr
	 * Delegate and undelegate events
	 * @example
	 * 		import { delegate } from "./eventr";
	 *  	delegate(obj);
	 *
	 *  	import eventr from "./eventr";
	 *  	eventr.delegate(obj);
	 *  	eventr.undelegate(obj);
	 *  	class Test {
	 *  		constructor() {
	 *  			this.delegate();
	 *  		}
	 *  	}
	 *  	eventr(Test);
	 */
	
	// Regex to split event delegates, see http://backbonejs.org/docs/backbone.html#section-153
	// for more info
	var DelegateEventSplitter = /^(\S+)\s*(.*)$/;
	
	// jQuery Event Namespace. See http://api.jquery.com/on/ for more info
	var EventNamespace = "delegateEvents";
	
	/**
	 * Delegates events on an object instance. Allows a consistent, declarative approach to binding events.
	 * Expects the instance parameter to have 2 properties:
	 * 	- $el - The jQuery element(s) to use as a context
	 * 	- events() - Function that returns an events hash
	 * Bound events are namespaced with the 'EventNamespace' string.
	 * The events hash is like Backbone's events hash and consists of {“event selector”: “callback”}.
	 * The callback can either be a named method to call on the instance or a function itself.
	 * The callback function is called with 'instance' as the context for 'this'.
	 *
	 * @example
	 * 	import { delegate } from "./eventr";
	 * 	class Test {
	 * 		constructor(el) {
	 * 			this.$el = $(el);
	 * 			delegate(this);
	 * 		}
	 * 		events() {
	 * 			return {
	 * 				"click .something": "_clickHandler",
	 * 				[`keydown .${ something }`]: () => { }
	 * 			}
	 * 		}
	 * 		_clickHandler(e) { }
	 * 	}
	 *
	 * @param  {Object} instance An instance of an object
	 * @return {Object}          The instance
	 * @throws {Error} If instance isn't truthy
	 * @throws {Error} If instace.$el doesn't exist
	 * @throws {Error} If instanceevents isn't a function
	 */
	function delegate(instance) {
	  if (!instance) {
	    $.error("Instance must be non-null");
	  }
	  if (!instance.$el) {
	    $.error("Instance.$el must be non-null");
	  }
	  if (!instance.events || typeof instance.events !== "function") {
	    $.error("Instance.events must be a function");
	  }
	
	  var events = instance.events();
	
	  if (!events) return instance;
	
	  for (var key in events) {
	    var method = events[key];
	
	    if (typeof method !== "function") method = instance[method];
	
	    if (!method) {
	      $.error("Method could not be found");
	    }
	
	    var match = key.match(DelegateEventSplitter),
	        eventName = match[1],
	        selector = match[2];
	
	    instance.$el.on(eventName + "." + EventNamespace, selector, $.proxy(method, instance));
	  }
	
	  return instance;
	}
	
	/**
	 * Undelegate events on an object instance
	 * @param  {Object} instance An instance of an object
	 * @return {Object}          The instance
	 */
	function undelegate(instance) {
	  if (!instance) {
	    $.error("Instance must be non-null");
	  }
	  if (!instance.$el) {
	    $.error("Instance.$el must be non-null");
	  }
	  instance.$el.off("." + EventNamespace);
	  return instance;
	}
	
	/**
	 * Mixes in event delegate and undelegate functionality into a class's
	 * protoype so it can be called as "this.delegate()". A convenient abstraction
	 * over the individual 'delegate' and 'undelegate' functions.
	 * @param  {Class} pluginClass The class on which to add the prototype methods
	 * @example
	 * 	import eventr from "./eventr";
	 * 	class Test {
	 * 		constructor(el) {
	 * 			this.$el = $(el);
	 * 			this.delegate();
	 * 		}
	 * 		events() {
	 * 			return {
	 * 				"click .something": "_clickHandler",
	 * 				[`keydown .${ something }`]: () => { }
	 * 			}
	 * 		}
	 * 		_clickHandler(e) { }
	 * 	}
	 * 	eventr(Test;)
	 */
	function mixin(pluginClass) {
	  pluginClass.prototype.delegate = function () {
	    return mixin.delegate.call(this, this);
	  };
	  pluginClass.prototype.undelegate = function () {
	    return mixin.undelegate.call(this, this);
	  };
	}
	mixin.delegate = delegate;
	mixin.undelegate = undelegate;
	
	exports['default'] = mixin;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Defaults = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _pluginizr = __webpack_require__(3);
	
	var _pluginizr2 = _interopRequireDefault(_pluginizr);
	
	var _utils = __webpack_require__(8);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _breakpoints = __webpack_require__(9);
	
	var _inPageNavTemplate = __webpack_require__(10);
	
	var _inPageNavTemplate2 = _interopRequireDefault(_inPageNavTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * { The default settings for in page nav }
	 *
	 * @type       {Object}
	 */
	var Defaults = exports.Defaults = {
	
		// Selector for the container to look for headings from which the nav tree is built
		headingsContainer: "body",
	
		// Selector for headings to include
		headings: "h2,h3",
	
		// Selector for excluding headings
		headingsExclude: "[data-no-inpagenav] *, [data-no-inpagenav]",
	
		// Number of pixels from the top of the screen that a heading is considered to be 'active'
		scrollTolerance: 80,
	
		// The target element that the in page nav will be moved to on wider breakpoints
		wideTarget: null,
	
		// The breakpoint from which the nav will be moved into 'wideTarget'
		wideBreakpoint: "md"
	};
	
	/// Creates a nested, in page navigation, built from existing headings on the page.
	/// @see {@link http://stackoverflow.com/a/12279190/486434|Useful answer on StackOverflow}
	/// @example <caption>Simplest example</caption>
	/// 	<div data-inpagenav></div>
	/// @example <caption>Example with all options</caption>
	/// 	<aside role="complementary" data-inpagenav data-inpagenav-headings-container="#main" data-inpagenav-headings="h2,h3" data-inpagenav-headings-exclude="[data-no-inpagenav]" data-inpagenav-scroll-tolerance="100"></aside>
	/// @example <caption>Raw JS usage</caption>
	/// 	let inPageNav = new InPageNav($nav);
	/// @example <caption>jQuery plugin usage</caption>
	/// 	$(document).ready(function() {
	/// 		$nav.inpagenav();
	/// 	});
	
	var InPageNav = function () {
		_createClass(InPageNav, null, [{
			key: "defaults",
			value: function defaults() {
				return Defaults;
			}
		}]);
	
		function InPageNav(element, options) {
			var _this = this;
	
			_classCallCheck(this, InPageNav);
	
			if (!element) throw new Error("Element must be non-null");
	
			this.el = element;
			this.$el = $(element);
	
			// Generate uid for this component, used for namespacing events
			this.uid = _utils2['default'].nextUniqueId("inpagenav");
	
			this.options = $.extend({}, InPageNav.defaults(), options);
	
			// The containing element where the nav will be moved to on wider breakpoints
			this.$wideTarget = $("#" + this.options.wideTarget);
	
			// Find headings to use for building the nav
			this.headings = this.getHeadings();
	
			this.render();
			this.updateNavState();
	
			$(window).on("load.InPageNav." + this.uid, function () {
				_this.updateNavState();
			}).on("scroll.InPageNav." + this.uid, function () {
				_this.updateNavState(true);
			}).on("resize.InPageNav." + this.uid, function () {
				_this.calculatePosition();
			});
		}
	
		_createClass(InPageNav, [{
			key: "destroy",
			value: function destroy() {
				$(window).off("." + this.uid);
				this.$el.remove();
			}
	
			// Builds a navigation object tree and renderes it into the element
			// via the pre-compiled template
	
		}, {
			key: "render",
			value: function render() {
				var _this2 = this;
	
				// Recursively builds a nested tree of links
				var buildTree = function buildTree(headings) {
					var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
					var arr = [];
					for (var i = 0; i < headings.length; i++) {
						var hdng = headings[i];
	
						// Headings needs an id for the # href to work
						_this2.generateHeadingId(hdng);
	
						// TODO: Replace magic number '2' with min from list of headings
						var index = parseInt(hdng.tagName.substring(1)) - 2;
	
						if (index === level) {
							arr.push({
								title: $(hdng).text(),
								href: "#" + hdng.id,
								links: buildTree(headings.slice(i + 1), level + 1)
							});
						} else if (level > 0) {
							return arr;
						}
					}
					return arr;
				};
	
				// Render the nested tree with our pre-compiled template
				var tree = buildTree(this.headings);
				this.$el.html(_inPageNavTemplate2['default'].render({ links: tree }));
	
				this.$inpagenav = this.$el.find(".in-page-nav");
			}
	
			/**
	   * Resets classes and aria attributes
	   */
	
		}, {
			key: "resetNavState",
			value: function resetNavState() {
				$("a", this.$inpagenav).attr("aria-selected", false);
	
				this.$inpagenav.removeAttr("aria-activedescendant");
	
				// TODO: This should be a media query with em values
				// Nav is fully expanded on smaller breakpoints
				// and expands as you scroll on wider breakpoints
				if ((0, _breakpoints.matchesFrom)(this.options.wideBreakpoint)) {
					$(".in-page-nav__list .in-page-nav__list", this.$inpagenav).attr("aria-expanded", false).attr("aria-hidden", true);
				} else {
					$(".in-page-nav__list .in-page-nav__list", this.$inpagenav).attr("aria-expanded", true).attr("aria-hidden", false);
				}
			}
	
			// Determins which navigation elements are active
	
		}, {
			key: "updateNavState",
			value: function updateNavState() {
				var updateHash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	
				this.resetNavState();
	
				var activeHeading = this.getActiveHeading();
	
				if (!activeHeading) return;
	
				var activeHref = "#" + activeHeading.id,
				    $activeLink = $("a[href='" + activeHref + "']", this.$inpagenav);
	
				if (updateHash && history.replaceState) {
					history.replaceState(undefined, undefined, activeHref);
				}
	
				// Set aria-activedescendant on parent element
				this.$inpagenav.attr("aria-activedescendant", $activeLink.attr("id"));
	
				$activeLink.attr("aria-selected", true);
	
				// aria-expanded="true/false" for second-level <ul> containers
				// aria-hidden="true/false" for second-level <ul> containers
				$activeLink.closest(".in-page-nav__item").find(".in-page-nav__list").attr("aria-expanded", true).attr("aria-hidden", false).end().parents(".in-page-nav__list").attr("aria-expanded", true).attr("aria-hidden", false);
	
				this.calculatePosition();
			}
		}, {
			key: "calculatePosition",
			value: function calculatePosition() {
				// If the element isn't attached to the dom then don't care about calculating position
				if (!document.contains(this.$el[0])) return;
	
				this.calculateFixedPosition();
				this.attachToCorrectParent();
			}
	
			/**
	   * Works out whether the menu should be fixed or not and add/removes a class to reflect this.
	   */
	
		}, {
			key: "calculateFixedPosition",
			value: function calculateFixedPosition() {
				var isFixed = this.$inpagenav.outerHeight() <= $(window).height() && $(window).scrollTop() > this.$inpagenav.parent().offset().top;
	
				if (isFixed) this.$inpagenav.addClass("in-page-nav--fixed");else this.$inpagenav.removeClass("in-page-nav--fixed");
			}
	
			// Attached the in page nav to the correct parent depending on breakpoint.
			// ie on mobile devices the nav sits within the main body but on wider screens
			// it gets copied into a different container
	
		}, {
			key: "attachToCorrectParent",
			value: function attachToCorrectParent() {
	
				var isWide = (0, _breakpoints.matchesFrom)(this.options.wideBreakpoint) && this.$wideTarget.length === 1;
	
				// Move to the correct container based on width
				if (isWide) {
					if (!this.$inpagenav.parent().is(this.$wideTarget)) {
						// Move element to the target
						this.$inpagenav.appendTo(this.$wideTarget);
					}
					this.$inpagenav.width(this.$wideTarget.width());
				} else if (!this.$inpagenav.parent().is(this.$el)) {
					this.$inpagenav.appendTo(this.$el);
					this.$inpagenav.width("auto");
				}
			}
	
			/**
	   * Returns the 'active' heading element. That is, the heading at the top
	   * of the viewport, taking into the scrollTolerance option.
	   */
	
		}, {
			key: "getActiveHeading",
			value: function getActiveHeading() {
				var _this3 = this;
	
				var scrollTop = $(window).scrollTop(),
				    activeHeading = this.headings && this.headings[0] || null;
	
				$(this.headings).each(function (i, heading) {
					var y = $(heading).offset().top - scrollTop - _this3.options.scrollTolerance;
					if (y <= 0) activeHeading = heading;else return false;
				});
	
				return activeHeading;
			}
	
			// Find headings to use for building the nav
	
		}, {
			key: "getHeadings",
			value: function getHeadings() {
				return $(this.options.headingsContainer).find(this.options.headings).not(this.options.headingsExclude).not("#ipn-title").toArray();
			}
	
			/**
	   * Generates an id for a given heading element from its text content, but only if
	   * it doesn't already have an id.
	   * Checks to se if an element alrerady exists with the generated id - if it does
	   * then it adds an integer suffix incremented from the current maximum e.g. -1, -2.
	   * This is to cater for the scenario that the id already exists on the page or if
	   * there are 2 headings with the same text.
	   *
	   * @param {HTMLHeadingElement} heading { The heading for which to generate an id }
	   * @returns {HTMLHeadingElement} { The heading that was passed in }
	   */
	
		}, {
			key: "generateHeadingId",
			value: function generateHeadingId(heading) {
	
				if (heading.id) return heading;
	
				var slug = _utils2['default'].slugify(heading.textContent);
	
				if ($("#" + slug).length === 0) {
					heading.id = slug;
					return heading;
				}
	
				// Increment the integer suffix to make a unique id
				var slugPrefixRegex = new RegExp("^" + slug + "(-d+)?", "i");
	
				var isSlugPrefixMatch = function isSlugPrefixMatch(i, el) {
					return el.id.match(slugPrefixRegex);
				};
	
				var max = $("[id]").filter(isSlugPrefixMatch).length;
	
				heading.id = slug + "-" + (max + 1);
				return heading;
			}
		}]);
	
		return InPageNav;
	}();
	
	exports['default'] = InPageNav;
	
	(0, _pluginizr2['default'])("inpagenav", InPageNav);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module Utils
	 * Utility functions
	 */
	
	/**
	 * Turns a string into a slug.
	 * See {@link https://gist.github.com/mathewbyrne/1280286#gistcomment-1606270|this gist}.
	 *
	 * @param {string} str { The string to slugify }
	 * @returns {string} { The slugified string }
	 *
	 * @example <caption>Example slugifying</caption>
	 *          import { slugify } from "./utils";
	 *          // returns "a-string-to-transform-and-slugify"
	 *          slugify("A (string) to transform & slugify!");
	 */
	var slugify = exports.slugify = function slugify(str) {
	  return str.toLowerCase().trim().replace(/\s+/g, "-") // Replace spaces with -
	  .replace(/&/g, "-and-") // Replace & with 'and'
	  .replace(/[^\w\-]+/g, "") // Remove all non-word chars
	  .replace(/^\-+/g, "") // Trim dashes from the start
	  .replace(/\-+$/g, "") // Trim dashes from the end
	  .replace(/\-{2,}/g, "-"); // Replace multiple - with single -
	};
	
	/**
	 * Generates a unique id in the form prefix-n by incrementing a counter.
	 * The first time this is called it will return "uid-1" then "uid-2" and so on.
	 * See {@link http://stackoverflow.com/a/20302361|This StackOverflow answer}.
	 *
	 * @param {string} prefix { The prefix for the id to return. Defaults to "uid" }
	 * @return {string} { The unique id }
	 *
	 * @example <caption>Simple example</caption>
	 *          import { nextUniqueId } from "./utils";
	 *          // returns "uid-1"
	 *          nextUniqueId();
	 *
	 * @example <caption>Prefix example</caption>
	 *          import utils from "./utils";
	 *          // returns "prefix-1"
	 *          utils.nextUniqueId("prefix");
	 */
	var nextUniqueId = exports.nextUniqueId = function (i) {
	  return function () {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "uid";
	
	    return prefix + "-" + ++i;
	  };
	}(0);
	
	exports['default'] = {
	  slugify: slugify,
	  nextUniqueId: nextUniqueId
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @module Breakpoints
	 */
	
	/**
	 * The breakpoints, in pixel values.
	 * These correspond with the breakpoints defined in SASS.
	 * Often not used directly, but via matchesFrom.
	 */
	var breakpoints = {
	  xs: 400,
	  sm: 600,
	  md: 900,
	  lg: 1200,
	  xl: 1600
	};
	
	/**
	 * Determines if the device's width matches a min-width query from the given breakpoint.
	 *
	 * @param {string} breakpointName The breakpoint name
	 * @return {Boolean} True if it matches, false otherwise.
	 *
	 * @example
	 * 	import { matchesFrom } from "./breakpoints";
	 * 	// Checks if the media query (min-width: 25em) matches
	 * 	var matches = matchesFrom("xs");
	 */
	var matchesFrom = function matchesFrom(breakpointName) {
	  var breakpointPx = breakpoints[breakpointName];
	
	  if (!breakpointPx) {
	    throw new Error("Breakpoint " + breakpointName + " does not exist");
	  }
	
	  // Assume matchMedia is polyfilled elsewhere
	  // Convert to ems to match the media query if the browser's root font-size isn't 16
	  return window.matchMedia("(min-width: " + breakpointPx / 16 + "em)").matches;
	};
	
	exports['default'] = breakpoints;
	exports.matchesFrom = matchesFrom;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var nunjucks = __webpack_require__(11);
	var env;
	if (!nunjucks.currentEnv){
		env = nunjucks.currentEnv = new nunjucks.Environment([], { autoescape: true });
	} else {
		env = nunjucks.currentEnv;
	}
	var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});
	
	
	
	
	var shim = __webpack_require__(15);
	
	
	(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["src/components/in-page-nav/in-page-nav.template.njk"] = (function() {
	function root(env, context, frame, runtime, cb) {
	var lineno = null;
	var colno = null;
	var output = "";
	try {
	var parentTemplate = null;
	var macro_t_1 = runtime.makeMacro(
	["link", "level"], 
	[], 
	function (l_link, l_level, kwargs) {
	var callerFrame = frame;
	frame = new runtime.Frame();
	kwargs = kwargs || {};
	if (kwargs.hasOwnProperty("caller")) {
	frame.set("caller", kwargs.caller); }
	frame.set("link", l_link);
	frame.set("level", l_level);
	var t_2 = "";t_2 += "\r\n\t<li class=\"in-page-nav__item\" role=\"presentation\">\r\n\t\t<a id=\"ipn-";
	t_2 += runtime.suppressValue((lineno = 2, colno = 31, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((l_link),"href")),"replace"), "link[\"href\"][\"replace\"]", context, ["#",""])), env.opts.autoescape);
	t_2 += "\" href=\"";
	t_2 += runtime.suppressValue(runtime.memberLookup((l_link),"href"), env.opts.autoescape);
	t_2 += "\" role=\"menuitem\" aria-selected=\"false\">\r\n\t\t\t";
	t_2 += runtime.suppressValue(runtime.memberLookup((l_link),"title"), env.opts.autoescape);
	t_2 += "\r\n\t\t</a>\r\n\t\t";
	if(runtime.memberLookup((l_link),"links") && runtime.memberLookup((runtime.memberLookup((l_link),"links")),"length") > 0) {
	t_2 += "\r\n\t\t\t<ul class=\"in-page-nav__list\" role=\"menu\" aria-expanded=\"true\" aria-hidden=\"false\" aria-labelledby=\"ipn-";
	t_2 += runtime.suppressValue((lineno = 6, colno = 125, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((l_link),"href")),"replace"), "link[\"href\"][\"replace\"]", context, ["#",""])), env.opts.autoescape);
	t_2 += "\">\r\n\t\t\t\t";
	frame = frame.push();
	var t_5 = runtime.memberLookup((l_link),"links");
	if(t_5) {var t_4 = t_5.length;
	for(var t_3=0; t_3 < t_5.length; t_3++) {
	var t_6 = t_5[t_3];
	frame.set("subLink", t_6);
	frame.set("loop.index", t_3 + 1);
	frame.set("loop.index0", t_3);
	frame.set("loop.revindex", t_4 - t_3);
	frame.set("loop.revindex0", t_4 - t_3 - 1);
	frame.set("loop.first", t_3 === 0);
	frame.set("loop.last", t_3 === t_4 - 1);
	frame.set("loop.length", t_4);
	t_2 += "\r\n\t\t\t\t\t";
	t_2 += runtime.suppressValue((lineno = 8, colno = 16, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "renderLink"), "renderLink", context, [t_6,l_level + 1])), env.opts.autoescape);
	t_2 += "\r\n\t\t\t\t";
	;
	}
	}
	frame = frame.pop();
	t_2 += "\r\n\t\t\t</ul>\r\n\t\t";
	;
	}
	t_2 += "\r\n\t</li>\r\n";
	;
	frame = callerFrame;
	return new runtime.SafeString(t_2);
	});
	context.addExport("renderLink");
	context.setVariable("renderLink", macro_t_1);
	output += "\r\n\r\n<nav class=\"in-page-nav\" role=\"navigation\" aria-labelledby=\"ipn-title\">\r\n\t<h2 id=\"ipn-title\" class=\"in-page-nav__title\">On this page</h2>\r\n\r\n\t<ul class=\"in-page-nav__list\" role=\"menubar\">\r\n\t\t";
	frame = frame.push();
	var t_9 = runtime.contextOrFrameLookup(context, frame, "links");
	if(t_9) {var t_8 = t_9.length;
	for(var t_7=0; t_7 < t_9.length; t_7++) {
	var t_10 = t_9[t_7];
	frame.set("link", t_10);
	frame.set("loop.index", t_7 + 1);
	frame.set("loop.index0", t_7);
	frame.set("loop.revindex", t_8 - t_7);
	frame.set("loop.revindex0", t_8 - t_7 - 1);
	frame.set("loop.first", t_7 === 0);
	frame.set("loop.last", t_7 === t_8 - 1);
	frame.set("loop.length", t_8);
	output += "\r\n\t\t\t";
	output += runtime.suppressValue((lineno = 20, colno = 14, runtime.callWrap(macro_t_1, "renderLink", context, [t_10,1])), env.opts.autoescape);
	output += "\r\n\t\t";
	;
	}
	}
	frame = frame.pop();
	output += "\r\n\t</ul>\r\n</nav>\r\n";
	if(parentTemplate) {
	parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
	} else {
	cb(null, output);
	}
	;
	} catch (e) {
	  cb(runtime.handleError(e, lineno, colno));
	}
	}
	return {
	root: root
	};
	
	})();
	})();
	
	
	
	module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["src/components/in-page-nav/in-page-nav.template.njk"] , dependencies)

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {/*! Browser bundle of nunjucks 3.0.1 (slim, only works with precompiled templates) */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["nunjucks"] = factory();
		else
			root["nunjucks"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
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
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var lib = __webpack_require__(1);
		var env = __webpack_require__(2);
		var Loader = __webpack_require__(15);
		var loaders = __webpack_require__(3);
		var precompile = __webpack_require__(3);
	
		module.exports = {};
		module.exports.Environment = env.Environment;
		module.exports.Template = env.Template;
	
		module.exports.Loader = Loader;
		module.exports.FileSystemLoader = loaders.FileSystemLoader;
		module.exports.PrecompiledLoader = loaders.PrecompiledLoader;
		module.exports.WebLoader = loaders.WebLoader;
	
		module.exports.compiler = __webpack_require__(3);
		module.exports.parser = __webpack_require__(3);
		module.exports.lexer = __webpack_require__(3);
		module.exports.runtime = __webpack_require__(8);
		module.exports.lib = lib;
		module.exports.nodes = __webpack_require__(3);
	
		module.exports.installJinjaCompat = __webpack_require__(16);
	
		// A single instance of an environment, since this is so commonly used
	
		var e;
		module.exports.configure = function(templatesPath, opts) {
		    opts = opts || {};
		    if(lib.isObject(templatesPath)) {
		        opts = templatesPath;
		        templatesPath = null;
		    }
	
		    var TemplateLoader;
		    if(loaders.FileSystemLoader) {
		        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
		            watch: opts.watch,
		            noCache: opts.noCache
		        });
		    }
		    else if(loaders.WebLoader) {
		        TemplateLoader = new loaders.WebLoader(templatesPath, {
		            useCache: opts.web && opts.web.useCache,
		            async: opts.web && opts.web.async
		        });
		    }
	
		    e = new env.Environment(TemplateLoader, opts);
	
		    if(opts && opts.express) {
		        e.express(opts.express);
		    }
	
		    return e;
		};
	
		module.exports.compile = function(src, env, path, eagerCompile) {
		    if(!e) {
		        module.exports.configure();
		    }
		    return new module.exports.Template(src, env, path, eagerCompile);
		};
	
		module.exports.render = function(name, ctx, cb) {
		    if(!e) {
		        module.exports.configure();
		    }
	
		    return e.render(name, ctx, cb);
		};
	
		module.exports.renderString = function(src, ctx, cb) {
		    if(!e) {
		        module.exports.configure();
		    }
	
		    return e.renderString(src, ctx, cb);
		};
	
		if(precompile) {
		    module.exports.precompile = precompile.precompile;
		    module.exports.precompileString = precompile.precompileString;
		}
	
	
	/***/ }),
	/* 1 */
	/***/ (function(module, exports) {
	
		'use strict';
	
		var ArrayProto = Array.prototype;
		var ObjProto = Object.prototype;
	
		var escapeMap = {
		    '&': '&amp;',
		    '"': '&quot;',
		    '\'': '&#39;',
		    '<': '&lt;',
		    '>': '&gt;'
		};
	
		var escapeRegex = /[&"'<>]/g;
	
		var lookupEscape = function(ch) {
		    return escapeMap[ch];
		};
	
		var exports = module.exports = {};
	
		exports.prettifyError = function(path, withInternals, err) {
		    // jshint -W022
		    // http://jslinterrors.com/do-not-assign-to-the-exception-parameter
		    if (!err.Update) {
		        // not one of ours, cast it
		        err = new exports.TemplateError(err);
		    }
		    err.Update(path);
	
		    // Unless they marked the dev flag, show them a trace from here
		    if (!withInternals) {
		        var old = err;
		        err = new Error(old.message);
		        err.name = old.name;
		    }
	
		    return err;
		};
	
		exports.TemplateError = function(message, lineno, colno) {
		    var err = this;
	
		    if (message instanceof Error) { // for casting regular js errors
		        err = message;
		        message = message.name + ': ' + message.message;
	
		        try {
		            if(err.name = '') {}
		        }
		        catch(e) {
		            // If we can't set the name of the error object in this
		            // environment, don't use it
		            err = this;
		        }
		    } else {
		        if(Error.captureStackTrace) {
		            Error.captureStackTrace(err);
		        }
		    }
	
		    err.name = 'Template render error';
		    err.message = message;
		    err.lineno = lineno;
		    err.colno = colno;
		    err.firstUpdate = true;
	
		    err.Update = function(path) {
		        var message = '(' + (path || 'unknown path') + ')';
	
		        // only show lineno + colno next to path of template
		        // where error occurred
		        if (this.firstUpdate) {
		            if(this.lineno && this.colno) {
		                message += ' [Line ' + this.lineno + ', Column ' + this.colno + ']';
		            }
		            else if(this.lineno) {
		                message += ' [Line ' + this.lineno + ']';
		            }
		        }
	
		        message += '\n ';
		        if (this.firstUpdate) {
		            message += ' ';
		        }
	
		        this.message = message + (this.message || '');
		        this.firstUpdate = false;
		        return this;
		    };
	
		    return err;
		};
	
		exports.TemplateError.prototype = Error.prototype;
	
		exports.escape = function(val) {
		  return val.replace(escapeRegex, lookupEscape);
		};
	
		exports.isFunction = function(obj) {
		    return ObjProto.toString.call(obj) === '[object Function]';
		};
	
		exports.isArray = Array.isArray || function(obj) {
		    return ObjProto.toString.call(obj) === '[object Array]';
		};
	
		exports.isString = function(obj) {
		    return ObjProto.toString.call(obj) === '[object String]';
		};
	
		exports.isObject = function(obj) {
		    return ObjProto.toString.call(obj) === '[object Object]';
		};
	
		exports.groupBy = function(obj, val) {
		    var result = {};
		    var iterator = exports.isFunction(val) ? val : function(obj) { return obj[val]; };
		    for(var i=0; i<obj.length; i++) {
		        var value = obj[i];
		        var key = iterator(value, i);
		        (result[key] || (result[key] = [])).push(value);
		    }
		    return result;
		};
	
		exports.toArray = function(obj) {
		    return Array.prototype.slice.call(obj);
		};
	
		exports.without = function(array) {
		    var result = [];
		    if (!array) {
		        return result;
		    }
		    var index = -1,
		    length = array.length,
		    contains = exports.toArray(arguments).slice(1);
	
		    while(++index < length) {
		        if(exports.indexOf(contains, array[index]) === -1) {
		            result.push(array[index]);
		        }
		    }
		    return result;
		};
	
		exports.extend = function(obj, obj2) {
		    for(var k in obj2) {
		        obj[k] = obj2[k];
		    }
		    return obj;
		};
	
		exports.repeat = function(char_, n) {
		    var str = '';
		    for(var i=0; i<n; i++) {
		        str += char_;
		    }
		    return str;
		};
	
		exports.each = function(obj, func, context) {
		    if(obj == null) {
		        return;
		    }
	
		    if(ArrayProto.each && obj.each === ArrayProto.each) {
		        obj.forEach(func, context);
		    }
		    else if(obj.length === +obj.length) {
		        for(var i=0, l=obj.length; i<l; i++) {
		            func.call(context, obj[i], i, obj);
		        }
		    }
		};
	
		exports.map = function(obj, func) {
		    var results = [];
		    if(obj == null) {
		        return results;
		    }
	
		    if(ArrayProto.map && obj.map === ArrayProto.map) {
		        return obj.map(func);
		    }
	
		    for(var i=0; i<obj.length; i++) {
		        results[results.length] = func(obj[i], i);
		    }
	
		    if(obj.length === +obj.length) {
		        results.length = obj.length;
		    }
	
		    return results;
		};
	
		exports.asyncIter = function(arr, iter, cb) {
		    var i = -1;
	
		    function next() {
		        i++;
	
		        if(i < arr.length) {
		            iter(arr[i], i, next, cb);
		        }
		        else {
		            cb();
		        }
		    }
	
		    next();
		};
	
		exports.asyncFor = function(obj, iter, cb) {
		    var keys = exports.keys(obj);
		    var len = keys.length;
		    var i = -1;
	
		    function next() {
		        i++;
		        var k = keys[i];
	
		        if(i < len) {
		            iter(k, obj[k], i, len, next);
		        }
		        else {
		            cb();
		        }
		    }
	
		    next();
		};
	
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
		exports.indexOf = Array.prototype.indexOf ?
		    function (arr, searchElement, fromIndex) {
		        return Array.prototype.indexOf.call(arr, searchElement, fromIndex);
		    } :
		    function (arr, searchElement, fromIndex) {
		        var length = this.length >>> 0; // Hack to convert object.length to a UInt32
	
		        fromIndex = +fromIndex || 0;
	
		        if(Math.abs(fromIndex) === Infinity) {
		            fromIndex = 0;
		        }
	
		        if(fromIndex < 0) {
		            fromIndex += length;
		            if (fromIndex < 0) {
		                fromIndex = 0;
		            }
		        }
	
		        for(;fromIndex < length; fromIndex++) {
		            if (arr[fromIndex] === searchElement) {
		                return fromIndex;
		            }
		        }
	
		        return -1;
		    };
	
		if(!Array.prototype.map) {
		    Array.prototype.map = function() {
		        throw new Error('map is unimplemented for this js engine');
		    };
		}
	
		exports.keys = function(obj) {
		    if(Object.prototype.keys) {
		        return obj.keys();
		    }
		    else {
		        var keys = [];
		        for(var k in obj) {
		            if(obj.hasOwnProperty(k)) {
		                keys.push(k);
		            }
		        }
		        return keys;
		    }
		};
	
		exports.inOperator = function (key, val) {
		    if (exports.isArray(val)) {
		        return exports.indexOf(val, key) !== -1;
		    } else if (exports.isObject(val)) {
		        return key in val;
		    } else if (exports.isString(val)) {
		        return val.indexOf(key) !== -1;
		    } else {
		        throw new Error('Cannot use "in" operator to search for "'
		            + key + '" in unexpected types.');
		    }
		};
	
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var path = __webpack_require__(3);
		var asap = __webpack_require__(4);
		var lib = __webpack_require__(1);
		var Obj = __webpack_require__(6);
		var compiler = __webpack_require__(3);
		var builtin_filters = __webpack_require__(7);
		var builtin_loaders = __webpack_require__(3);
		var runtime = __webpack_require__(8);
		var globals = __webpack_require__(9);
		var waterfall = __webpack_require__(10);
		var Frame = runtime.Frame;
		var Template;
	
		// Unconditionally load in this loader, even if no other ones are
		// included (possible in the slim browser build)
		builtin_loaders.PrecompiledLoader = __webpack_require__(14);
	
		// If the user is using the async API, *always* call it
		// asynchronously even if the template was synchronous.
		function callbackAsap(cb, err, res) {
		    asap(function() { cb(err, res); });
		}
	
		var Environment = Obj.extend({
		    init: function(loaders, opts) {
		        // The dev flag determines the trace that'll be shown on errors.
		        // If set to true, returns the full trace from the error point,
		        // otherwise will return trace starting from Template.render
		        // (the full trace from within nunjucks may confuse developers using
		        //  the library)
		        // defaults to false
		        opts = this.opts = opts || {};
		        this.opts.dev = !!opts.dev;
	
		        // The autoescape flag sets global autoescaping. If true,
		        // every string variable will be escaped by default.
		        // If false, strings can be manually escaped using the `escape` filter.
		        // defaults to true
		        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;
	
		        // If true, this will make the system throw errors if trying
		        // to output a null or undefined value
		        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
		        this.opts.trimBlocks = !!opts.trimBlocks;
		        this.opts.lstripBlocks = !!opts.lstripBlocks;
	
		        this.loaders = [];
	
		        if(!loaders) {
		            // The filesystem loader is only available server-side
		            if(builtin_loaders.FileSystemLoader) {
		                this.loaders = [new builtin_loaders.FileSystemLoader('views')];
		            }
		            else if(builtin_loaders.WebLoader) {
		                this.loaders = [new builtin_loaders.WebLoader('/views')];
		            }
		        }
		        else {
		            this.loaders = lib.isArray(loaders) ? loaders : [loaders];
		        }
	
		        // It's easy to use precompiled templates: just include them
		        // before you configure nunjucks and this will automatically
		        // pick it up and use it
		        if((true) && window.nunjucksPrecompiled) {
		            this.loaders.unshift(
		                new builtin_loaders.PrecompiledLoader(window.nunjucksPrecompiled)
		            );
		        }
	
		        this.initCache();
	
		        this.globals = globals();
		        this.filters = {};
		        this.asyncFilters = [];
		        this.extensions = {};
		        this.extensionsList = [];
	
		        for(var name in builtin_filters) {
		            this.addFilter(name, builtin_filters[name]);
		        }
		    },
	
		    initCache: function() {
		        // Caching and cache busting
		        lib.each(this.loaders, function(loader) {
		            loader.cache = {};
	
		            if(typeof loader.on === 'function') {
		                loader.on('update', function(template) {
		                    loader.cache[template] = null;
		                });
		            }
		        });
		    },
	
		    addExtension: function(name, extension) {
		        extension._name = name;
		        this.extensions[name] = extension;
		        this.extensionsList.push(extension);
		        return this;
		    },
	
		    removeExtension: function(name) {
		        var extension = this.getExtension(name);
		        if (!extension) return;
	
		        this.extensionsList = lib.without(this.extensionsList, extension);
		        delete this.extensions[name];
		    },
	
		    getExtension: function(name) {
		        return this.extensions[name];
		    },
	
		    hasExtension: function(name) {
		        return !!this.extensions[name];
		    },
	
		    addGlobal: function(name, value) {
		        this.globals[name] = value;
		        return this;
		    },
	
		    getGlobal: function(name) {
		        if(typeof this.globals[name] === 'undefined') {
		            throw new Error('global not found: ' + name);
		        }
		        return this.globals[name];
		    },
	
		    addFilter: function(name, func, async) {
		        var wrapped = func;
	
		        if(async) {
		            this.asyncFilters.push(name);
		        }
		        this.filters[name] = wrapped;
		        return this;
		    },
	
		    getFilter: function(name) {
		        if(!this.filters[name]) {
		            throw new Error('filter not found: ' + name);
		        }
		        return this.filters[name];
		    },
	
		    resolveTemplate: function(loader, parentName, filename) {
		        var isRelative = (loader.isRelative && parentName)? loader.isRelative(filename) : false;
		        return (isRelative && loader.resolve)? loader.resolve(parentName, filename) : filename;
		    },
	
		    getTemplate: function(name, eagerCompile, parentName, ignoreMissing, cb) {
		        var that = this;
		        var tmpl = null;
		        if(name && name.raw) {
		            // this fixes autoescape for templates referenced in symbols
		            name = name.raw;
		        }
	
		        if(lib.isFunction(parentName)) {
		            cb = parentName;
		            parentName = null;
		            eagerCompile = eagerCompile || false;
		        }
	
		        if(lib.isFunction(eagerCompile)) {
		            cb = eagerCompile;
		            eagerCompile = false;
		        }
	
		        if (name instanceof Template) {
		             tmpl = name;
		        }
		        else if(typeof name !== 'string') {
		            throw new Error('template names must be a string: ' + name);
		        }
		        else {
		            for (var i = 0; i < this.loaders.length; i++) {
		                var _name = this.resolveTemplate(this.loaders[i], parentName, name);
		                tmpl = this.loaders[i].cache[_name];
		                if (tmpl) break;
		            }
		        }
	
		        if(tmpl) {
		            if(eagerCompile) {
		                tmpl.compile();
		            }
	
		            if(cb) {
		                cb(null, tmpl);
		            }
		            else {
		                return tmpl;
		            }
		        } else {
		            var syncResult;
		            var _this = this;
	
		            var createTemplate = function(err, info) {
		                if(!info && !err) {
		                    if(!ignoreMissing) {
		                        err = new Error('template not found: ' + name);
		                    }
		                }
	
		                if (err) {
		                    if(cb) {
		                        cb(err);
		                    }
		                    else {
		                        throw err;
		                    }
		                }
		                else {
		                    var tmpl;
		                    if(info) {
		                        tmpl = new Template(info.src, _this,
		                                            info.path, eagerCompile);
	
		                        if(!info.noCache) {
		                            info.loader.cache[name] = tmpl;
		                        }
		                    }
		                    else {
		                        tmpl = new Template('', _this,
		                                            '', eagerCompile);
		                    }
	
		                    if(cb) {
		                        cb(null, tmpl);
		                    }
		                    else {
		                        syncResult = tmpl;
		                    }
		                }
		            };
	
		            lib.asyncIter(this.loaders, function(loader, i, next, done) {
		                function handle(err, src) {
		                    if(err) {
		                        done(err);
		                    }
		                    else if(src) {
		                        src.loader = loader;
		                        done(null, src);
		                    }
		                    else {
		                        next();
		                    }
		                }
	
		                // Resolve name relative to parentName
		                name = that.resolveTemplate(loader, parentName, name);
	
		                if(loader.async) {
		                    loader.getSource(name, handle);
		                }
		                else {
		                    handle(null, loader.getSource(name));
		                }
		            }, createTemplate);
	
		            return syncResult;
		        }
		    },
	
		    express: function(app) {
		        var env = this;
	
		        function NunjucksView(name, opts) {
		            this.name          = name;
		            this.path          = name;
		            this.defaultEngine = opts.defaultEngine;
		            this.ext           = path.extname(name);
		            if (!this.ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
		            if (!this.ext) this.name += (this.ext = ('.' !== this.defaultEngine[0] ? '.' : '') + this.defaultEngine);
		        }
	
		        NunjucksView.prototype.render = function(opts, cb) {
		          env.render(this.name, opts, cb);
		        };
	
		        app.set('view', NunjucksView);
		        app.set('nunjucksEnv', this);
		        return this;
		    },
	
		    render: function(name, ctx, cb) {
		        if(lib.isFunction(ctx)) {
		            cb = ctx;
		            ctx = null;
		        }
	
		        // We support a synchronous API to make it easier to migrate
		        // existing code to async. This works because if you don't do
		        // anything async work, the whole thing is actually run
		        // synchronously.
		        var syncResult = null;
	
		        this.getTemplate(name, function(err, tmpl) {
		            if(err && cb) {
		                callbackAsap(cb, err);
		            }
		            else if(err) {
		                throw err;
		            }
		            else {
		                syncResult = tmpl.render(ctx, cb);
		            }
		        });
	
		        return syncResult;
		    },
	
		    renderString: function(src, ctx, opts, cb) {
		        if(lib.isFunction(opts)) {
		            cb = opts;
		            opts = {};
		        }
		        opts = opts || {};
	
		        var tmpl = new Template(src, this, opts.path);
		        return tmpl.render(ctx, cb);
		    },
	
		    waterfall: waterfall
		});
	
		var Context = Obj.extend({
		    init: function(ctx, blocks, env) {
		        // Has to be tied to an environment so we can tap into its globals.
		        this.env = env || new Environment();
	
		        // Make a duplicate of ctx
		        this.ctx = {};
		        for(var k in ctx) {
		            if(ctx.hasOwnProperty(k)) {
		                this.ctx[k] = ctx[k];
		            }
		        }
	
		        this.blocks = {};
		        this.exported = [];
	
		        for(var name in blocks) {
		            this.addBlock(name, blocks[name]);
		        }
		    },
	
		    lookup: function(name) {
		        // This is one of the most called functions, so optimize for
		        // the typical case where the name isn't in the globals
		        if(name in this.env.globals && !(name in this.ctx)) {
		            return this.env.globals[name];
		        }
		        else {
		            return this.ctx[name];
		        }
		    },
	
		    setVariable: function(name, val) {
		        this.ctx[name] = val;
		    },
	
		    getVariables: function() {
		        return this.ctx;
		    },
	
		    addBlock: function(name, block) {
		        this.blocks[name] = this.blocks[name] || [];
		        this.blocks[name].push(block);
		        return this;
		    },
	
		    getBlock: function(name) {
		        if(!this.blocks[name]) {
		            throw new Error('unknown block "' + name + '"');
		        }
	
		        return this.blocks[name][0];
		    },
	
		    getSuper: function(env, name, block, frame, runtime, cb) {
		        var idx = lib.indexOf(this.blocks[name] || [], block);
		        var blk = this.blocks[name][idx + 1];
		        var context = this;
	
		        if(idx === -1 || !blk) {
		            throw new Error('no super block available for "' + name + '"');
		        }
	
		        blk(env, context, frame, runtime, cb);
		    },
	
		    addExport: function(name) {
		        this.exported.push(name);
		    },
	
		    getExported: function() {
		        var exported = {};
		        for(var i=0; i<this.exported.length; i++) {
		            var name = this.exported[i];
		            exported[name] = this.ctx[name];
		        }
		        return exported;
		    }
		});
	
		Template = Obj.extend({
		    init: function (src, env, path, eagerCompile) {
		        this.env = env || new Environment();
	
		        if(lib.isObject(src)) {
		            switch(src.type) {
		            case 'code': this.tmplProps = src.obj; break;
		            case 'string': this.tmplStr = src.obj; break;
		            }
		        }
		        else if(lib.isString(src)) {
		            this.tmplStr = src;
		        }
		        else {
		            throw new Error('src must be a string or an object describing ' +
		                            'the source');
		        }
	
		        this.path = path;
	
		        if(eagerCompile) {
		            var _this = this;
		            try {
		                _this._compile();
		            }
		            catch(err) {
		                throw lib.prettifyError(this.path, this.env.opts.dev, err);
		            }
		        }
		        else {
		            this.compiled = false;
		        }
		    },
	
		    render: function(ctx, parentFrame, cb) {
		        if (typeof ctx === 'function') {
		            cb = ctx;
		            ctx = {};
		        }
		        else if (typeof parentFrame === 'function') {
		            cb = parentFrame;
		            parentFrame = null;
		        }
	
		        var forceAsync = true;
		        if(parentFrame) {
		            // If there is a frame, we are being called from internal
		            // code of another template, and the internal system
		            // depends on the sync/async nature of the parent template
		            // to be inherited, so force an async callback
		            forceAsync = false;
		        }
	
		        var _this = this;
		        // Catch compile errors for async rendering
		        try {
		            _this.compile();
		        } catch (_err) {
		            var err = lib.prettifyError(this.path, this.env.opts.dev, _err);
		            if (cb) return callbackAsap(cb, err);
		            else throw err;
		        }
	
		        var context = new Context(ctx || {}, _this.blocks, _this.env);
		        var frame = parentFrame ? parentFrame.push(true) : new Frame();
		        frame.topLevel = true;
		        var syncResult = null;
	
		        _this.rootRenderFunc(
		            _this.env,
		            context,
		            frame || new Frame(),
		            runtime,
		            function(err, res) {
		                if(err) {
		                    err = lib.prettifyError(_this.path, _this.env.opts.dev, err);
		                }
	
		                if(cb) {
		                    if(forceAsync) {
		                        callbackAsap(cb, err, res);
		                    }
		                    else {
		                        cb(err, res);
		                    }
		                }
		                else {
		                    if(err) { throw err; }
		                    syncResult = res;
		                }
		            }
		        );
	
		        return syncResult;
		    },
	
	
		    getExported: function(ctx, parentFrame, cb) {
		        if (typeof ctx === 'function') {
		            cb = ctx;
		            ctx = {};
		        }
	
		        if (typeof parentFrame === 'function') {
		            cb = parentFrame;
		            parentFrame = null;
		        }
	
		        // Catch compile errors for async rendering
		        try {
		            this.compile();
		        } catch (e) {
		            if (cb) return cb(e);
		            else throw e;
		        }
	
		        var frame = parentFrame ? parentFrame.push() : new Frame();
		        frame.topLevel = true;
	
		        // Run the rootRenderFunc to populate the context with exported vars
		        var context = new Context(ctx || {}, this.blocks, this.env);
		        this.rootRenderFunc(this.env,
		                            context,
		                            frame,
		                            runtime,
		                            function(err) {
		        		        if ( err ) {
		        			    cb(err, null);
		        		        } else {
		        			    cb(null, context.getExported());
		        		        }
		                            });
		    },
	
		    compile: function() {
		        if(!this.compiled) {
		            this._compile();
		        }
		    },
	
		    _compile: function() {
		        var props;
	
		        if(this.tmplProps) {
		            props = this.tmplProps;
		        }
		        else {
		            var source = compiler.compile(this.tmplStr,
		                                          this.env.asyncFilters,
		                                          this.env.extensionsList,
		                                          this.path,
		                                          this.env.opts);
	
		            /* jslint evil: true */
		            var func = new Function(source);
		            props = func();
		        }
	
		        this.blocks = this._getBlocks(props);
		        this.rootRenderFunc = props.root;
		        this.compiled = true;
		    },
	
		    _getBlocks: function(props) {
		        var blocks = {};
	
		        for(var k in props) {
		            if(k.slice(0, 2) === 'b_') {
		                blocks[k.slice(2)] = props[k];
		            }
		        }
	
		        return blocks;
		    }
		});
	
		module.exports = {
		    Environment: Environment,
		    Template: Template
		};
	
	
	/***/ }),
	/* 3 */
	/***/ (function(module, exports) {
	
		
	
	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {
	
		"use strict";
	
		// rawAsap provides everything we need except exception management.
		var rawAsap = __webpack_require__(5);
		// RawTasks are recycled to reduce GC churn.
		var freeTasks = [];
		// We queue errors to ensure they are thrown in right order (FIFO).
		// Array-as-queue is good enough here, since we are just dealing with exceptions.
		var pendingErrors = [];
		var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);
	
		function throwFirstError() {
		    if (pendingErrors.length) {
		        throw pendingErrors.shift();
		    }
		}
	
		/**
		 * Calls a task as soon as possible after returning, in its own event, with priority
		 * over other events like animation, reflow, and repaint. An error thrown from an
		 * event will not interrupt, nor even substantially slow down the processing of
		 * other events, but will be rather postponed to a lower priority event.
		 * @param {{call}} task A callable object, typically a function that takes no
		 * arguments.
		 */
		module.exports = asap;
		function asap(task) {
		    var rawTask;
		    if (freeTasks.length) {
		        rawTask = freeTasks.pop();
		    } else {
		        rawTask = new RawTask();
		    }
		    rawTask.task = task;
		    rawAsap(rawTask);
		}
	
		// We wrap tasks with recyclable task objects.  A task object implements
		// `call`, just like a function.
		function RawTask() {
		    this.task = null;
		}
	
		// The sole purpose of wrapping the task is to catch the exception and recycle
		// the task object after its single use.
		RawTask.prototype.call = function () {
		    try {
		        this.task.call();
		    } catch (error) {
		        if (asap.onerror) {
		            // This hook exists purely for testing purposes.
		            // Its name will be periodically randomized to break any code that
		            // depends on its existence.
		            asap.onerror(error);
		        } else {
		            // In a web browser, exceptions are not fatal. However, to avoid
		            // slowing down the queue of pending tasks, we rethrow the error in a
		            // lower priority turn.
		            pendingErrors.push(error);
		            requestErrorThrow();
		        }
		    } finally {
		        this.task = null;
		        freeTasks[freeTasks.length] = this;
		    }
		};
	
	
	/***/ }),
	/* 5 */
	/***/ (function(module, exports) {
	
		/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
		// Use the fastest means possible to execute a task in its own turn, with
		// priority over other events including IO, animation, reflow, and redraw
		// events in browsers.
		//
		// An exception thrown by a task will permanently interrupt the processing of
		// subsequent tasks. The higher level `asap` function ensures that if an
		// exception is thrown by a task, that the task queue will continue flushing as
		// soon as possible, but if you use `rawAsap` directly, you are responsible to
		// either ensure that no exceptions are thrown from your task, or to manually
		// call `rawAsap.requestFlush` if an exception is thrown.
		module.exports = rawAsap;
		function rawAsap(task) {
		    if (!queue.length) {
		        requestFlush();
		        flushing = true;
		    }
		    // Equivalent to push, but avoids a function call.
		    queue[queue.length] = task;
		}
	
		var queue = [];
		// Once a flush has been requested, no further calls to `requestFlush` are
		// necessary until the next `flush` completes.
		var flushing = false;
		// `requestFlush` is an implementation-specific method that attempts to kick
		// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
		// the event queue before yielding to the browser's own event loop.
		var requestFlush;
		// The position of the next task to execute in the task queue. This is
		// preserved between calls to `flush` so that it can be resumed if
		// a task throws an exception.
		var index = 0;
		// If a task schedules additional tasks recursively, the task queue can grow
		// unbounded. To prevent memory exhaustion, the task queue will periodically
		// truncate already-completed tasks.
		var capacity = 1024;
	
		// The flush function processes all tasks that have been scheduled with
		// `rawAsap` unless and until one of those tasks throws an exception.
		// If a task throws an exception, `flush` ensures that its state will remain
		// consistent and will resume where it left off when called again.
		// However, `flush` does not make any arrangements to be called again if an
		// exception is thrown.
		function flush() {
		    while (index < queue.length) {
		        var currentIndex = index;
		        // Advance the index before calling the task. This ensures that we will
		        // begin flushing on the next task the task throws an error.
		        index = index + 1;
		        queue[currentIndex].call();
		        // Prevent leaking memory for long chains of recursive calls to `asap`.
		        // If we call `asap` within tasks scheduled by `asap`, the queue will
		        // grow, but to avoid an O(n) walk for every task we execute, we don't
		        // shift tasks off the queue after they have been executed.
		        // Instead, we periodically shift 1024 tasks off the queue.
		        if (index > capacity) {
		            // Manually shift all values starting at the index back to the
		            // beginning of the queue.
		            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
		                queue[scan] = queue[scan + index];
		            }
		            queue.length -= index;
		            index = 0;
		        }
		    }
		    queue.length = 0;
		    index = 0;
		    flushing = false;
		}
	
		// `requestFlush` is implemented using a strategy based on data collected from
		// every available SauceLabs Selenium web driver worker at time of writing.
		// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593
	
		// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
		// have WebKitMutationObserver but not un-prefixed MutationObserver.
		// Must use `global` or `self` instead of `window` to work in both frames and web
		// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	
		/* globals self */
		var scope = typeof global !== "undefined" ? global : self;
		var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
	
		// MutationObservers are desirable because they have high priority and work
		// reliably everywhere they are implemented.
		// They are implemented in all modern browsers.
		//
		// - Android 4-4.3
		// - Chrome 26-34
		// - Firefox 14-29
		// - Internet Explorer 11
		// - iPad Safari 6-7.1
		// - iPhone Safari 7-7.1
		// - Safari 6-7
		if (typeof BrowserMutationObserver === "function") {
		    requestFlush = makeRequestCallFromMutationObserver(flush);
	
		// MessageChannels are desirable because they give direct access to the HTML
		// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
		// 11-12, and in web workers in many engines.
		// Although message channels yield to any queued rendering and IO tasks, they
		// would be better than imposing the 4ms delay of timers.
		// However, they do not work reliably in Internet Explorer or Safari.
	
		// Internet Explorer 10 is the only browser that has setImmediate but does
		// not have MutationObservers.
		// Although setImmediate yields to the browser's renderer, it would be
		// preferrable to falling back to setTimeout since it does not have
		// the minimum 4ms penalty.
		// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
		// Desktop to a lesser extent) that renders both setImmediate and
		// MessageChannel useless for the purposes of ASAP.
		// https://github.com/kriskowal/q/issues/396
	
		// Timers are implemented universally.
		// We fall back to timers in workers in most engines, and in foreground
		// contexts in the following browsers.
		// However, note that even this simple case requires nuances to operate in a
		// broad spectrum of browsers.
		//
		// - Firefox 3-13
		// - Internet Explorer 6-9
		// - iPad Safari 4.3
		// - Lynx 2.8.7
		} else {
		    requestFlush = makeRequestCallFromTimer(flush);
		}
	
		// `requestFlush` requests that the high priority event queue be flushed as
		// soon as possible.
		// This is useful to prevent an error thrown in a task from stalling the event
		// queue if the exception handled by Node.js’s
		// `process.on("uncaughtException")` or by a domain.
		rawAsap.requestFlush = requestFlush;
	
		// To request a high priority event, we induce a mutation observer by toggling
		// the text of a text node between "1" and "-1".
		function makeRequestCallFromMutationObserver(callback) {
		    var toggle = 1;
		    var observer = new BrowserMutationObserver(callback);
		    var node = document.createTextNode("");
		    observer.observe(node, {characterData: true});
		    return function requestCall() {
		        toggle = -toggle;
		        node.data = toggle;
		    };
		}
	
		// The message channel technique was discovered by Malte Ubl and was the
		// original foundation for this library.
		// http://www.nonblocking.io/2011/06/windownexttick.html
	
		// Safari 6.0.5 (at least) intermittently fails to create message ports on a
		// page's first load. Thankfully, this version of Safari supports
		// MutationObservers, so we don't need to fall back in that case.
	
		// function makeRequestCallFromMessageChannel(callback) {
		//     var channel = new MessageChannel();
		//     channel.port1.onmessage = callback;
		//     return function requestCall() {
		//         channel.port2.postMessage(0);
		//     };
		// }
	
		// For reasons explained above, we are also unable to use `setImmediate`
		// under any circumstances.
		// Even if we were, there is another bug in Internet Explorer 10.
		// It is not sufficient to assign `setImmediate` to `requestFlush` because
		// `setImmediate` must be called *by name* and therefore must be wrapped in a
		// closure.
		// Never forget.
	
		// function makeRequestCallFromSetImmediate(callback) {
		//     return function requestCall() {
		//         setImmediate(callback);
		//     };
		// }
	
		// Safari 6.0 has a problem where timers will get lost while the user is
		// scrolling. This problem does not impact ASAP because Safari 6.0 supports
		// mutation observers, so that implementation is used instead.
		// However, if we ever elect to use timers in Safari, the prevalent work-around
		// is to add a scroll event listener that calls for a flush.
	
		// `setTimeout` does not call the passed callback if the delay is less than
		// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
		// even then.
	
		function makeRequestCallFromTimer(callback) {
		    return function requestCall() {
		        // We dispatch a timeout with a specified delay of 0 for engines that
		        // can reliably accommodate that request. This will usually be snapped
		        // to a 4 milisecond delay, but once we're flushing, there's no delay
		        // between events.
		        var timeoutHandle = setTimeout(handleTimer, 0);
		        // However, since this timer gets frequently dropped in Firefox
		        // workers, we enlist an interval handle that will try to fire
		        // an event 20 times per second until it succeeds.
		        var intervalHandle = setInterval(handleTimer, 50);
	
		        function handleTimer() {
		            // Whichever timer succeeds will cancel both timers and
		            // execute the callback.
		            clearTimeout(timeoutHandle);
		            clearInterval(intervalHandle);
		            callback();
		        }
		    };
		}
	
		// This is for `asap.js` only.
		// Its name will be periodically randomized to break any code that depends on
		// its existence.
		rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
	
		// ASAP was originally a nextTick shim included in Q. This was factored out
		// into this ASAP package. It was later adapted to RSVP which made further
		// amendments. These decisions, particularly to marginalize MessageChannel and
		// to capture the MutationObserver implementation in a closure, were integrated
		// back into ASAP proper.
		// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js
	
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ }),
	/* 6 */
	/***/ (function(module, exports) {
	
		'use strict';
	
		// A simple class system, more documentation to come
	
		function extend(cls, name, props) {
		    // This does that same thing as Object.create, but with support for IE8
		    var F = function() {};
		    F.prototype = cls.prototype;
		    var prototype = new F();
	
		    // jshint undef: false
		    var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;
		    props = props || {};
	
		    for(var k in props) {
		        var src = props[k];
		        var parent = prototype[k];
	
		        if(typeof parent === 'function' &&
		           typeof src === 'function' &&
		           fnTest.test(src)) {
		            /*jshint -W083 */
		            prototype[k] = (function (src, parent) {
		                return function() {
		                    // Save the current parent method
		                    var tmp = this.parent;
	
		                    // Set parent to the previous method, call, and restore
		                    this.parent = parent;
		                    var res = src.apply(this, arguments);
		                    this.parent = tmp;
	
		                    return res;
		                };
		            })(src, parent);
		        }
		        else {
		            prototype[k] = src;
		        }
		    }
	
		    prototype.typename = name;
	
		    var new_cls = function() {
		        if(prototype.init) {
		            prototype.init.apply(this, arguments);
		        }
		    };
	
		    new_cls.prototype = prototype;
		    new_cls.prototype.constructor = new_cls;
	
		    new_cls.extend = function(name, props) {
		        if(typeof name === 'object') {
		            props = name;
		            name = 'anonymous';
		        }
		        return extend(new_cls, name, props);
		    };
	
		    return new_cls;
		}
	
		module.exports = extend(Object, 'Object', {});
	
	
	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var lib = __webpack_require__(1);
		var r = __webpack_require__(8);
	
		function normalize(value, defaultValue) {
		    if(value === null || value === undefined || value === false) {
		        return defaultValue;
		    }
		    return value;
		}
	
		var filters = {
		    abs: Math.abs,
	
		    batch: function(arr, linecount, fill_with) {
		        var i;
		        var res = [];
		        var tmp = [];
	
		        for(i = 0; i < arr.length; i++) {
		            if(i % linecount === 0 && tmp.length) {
		                res.push(tmp);
		                tmp = [];
		            }
	
		            tmp.push(arr[i]);
		        }
	
		        if(tmp.length) {
		            if(fill_with) {
		                for(i = tmp.length; i < linecount; i++) {
		                    tmp.push(fill_with);
		                }
		            }
	
		            res.push(tmp);
		        }
	
		        return res;
		    },
	
		    capitalize: function(str) {
		        str = normalize(str, '');
		        var ret = str.toLowerCase();
		        return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
		    },
	
		    center: function(str, width) {
		        str = normalize(str, '');
		        width = width || 80;
	
		        if(str.length >= width) {
		            return str;
		        }
	
		        var spaces = width - str.length;
		        var pre = lib.repeat(' ', spaces/2 - spaces % 2);
		        var post = lib.repeat(' ', spaces/2);
		        return r.copySafeness(str, pre + str + post);
		    },
	
		    'default': function(val, def, bool) {
		        if(bool) {
		            return val ? val : def;
		        }
		        else {
		            return (val !== undefined) ? val : def;
		        }
		    },
	
		    dictsort: function(val, case_sensitive, by) {
		        if (!lib.isObject(val)) {
		            throw new lib.TemplateError('dictsort filter: val must be an object');
		        }
	
		        var array = [];
		        for (var k in val) {
		            // deliberately include properties from the object's prototype
		            array.push([k,val[k]]);
		        }
	
		        var si;
		        if (by === undefined || by === 'key') {
		            si = 0;
		        } else if (by === 'value') {
		            si = 1;
		        } else {
		            throw new lib.TemplateError(
		                'dictsort filter: You can only sort by either key or value');
		        }
	
		        array.sort(function(t1, t2) {
		            var a = t1[si];
		            var b = t2[si];
	
		            if (!case_sensitive) {
		                if (lib.isString(a)) {
		                    a = a.toUpperCase();
		                }
		                if (lib.isString(b)) {
		                    b = b.toUpperCase();
		                }
		            }
	
		            return a > b ? 1 : (a === b ? 0 : -1);
		        });
	
		        return array;
		    },
	
		    dump: function(obj, spaces) {
		        return JSON.stringify(obj, null, spaces);
		    },
	
		    escape: function(str) {
		        if(str instanceof r.SafeString) {
		            return str;
		        }
		        str = (str === null || str === undefined) ? '' : str;
		        return r.markSafe(lib.escape(str.toString()));
		    },
	
		    safe: function(str) {
		        if (str instanceof r.SafeString) {
		            return str;
		        }
		        str = (str === null || str === undefined) ? '' : str;
		        return r.markSafe(str.toString());
		    },
	
		    first: function(arr) {
		        return arr[0];
		    },
	
		    groupby: function(arr, attr) {
		        return lib.groupBy(arr, attr);
		    },
	
		    indent: function(str, width, indentfirst) {
		        str = normalize(str, '');
	
		        if (str === '') return '';
	
		        width = width || 4;
		        var res = '';
		        var lines = str.split('\n');
		        var sp = lib.repeat(' ', width);
	
		        for(var i=0; i<lines.length; i++) {
		            if(i === 0 && !indentfirst) {
		                res += lines[i] + '\n';
		            }
		            else {
		                res += sp + lines[i] + '\n';
		            }
		        }
	
		        return r.copySafeness(str, res);
		    },
	
		    join: function(arr, del, attr) {
		        del = del || '';
	
		        if(attr) {
		            arr = lib.map(arr, function(v) {
		                return v[attr];
		            });
		        }
	
		        return arr.join(del);
		    },
	
		    last: function(arr) {
		        return arr[arr.length-1];
		    },
	
		    length: function(val) {
		        var value = normalize(val, '');
	
		        if(value !== undefined) {
		            if(
		                (typeof Map === 'function' && value instanceof Map) ||
		                (typeof Set === 'function' && value instanceof Set)
		            ) {
		                // ECMAScript 2015 Maps and Sets
		                return value.size;
		            }
		            if(lib.isObject(value) && !(value instanceof r.SafeString)) {
		                // Objects (besides SafeStrings), non-primative Arrays
		                return Object.keys(value).length;
		            }
		            return value.length;
		        }
		        return 0;
		    },
	
		    list: function(val) {
		        if(lib.isString(val)) {
		            return val.split('');
		        }
		        else if(lib.isObject(val)) {
		            var keys = [];
	
		            if(Object.keys) {
		                keys = Object.keys(val);
		            }
		            else {
		                for(var k in val) {
		                    keys.push(k);
		                }
		            }
	
		            return lib.map(keys, function(k) {
		                return { key: k,
		                         value: val[k] };
		            });
		        }
		        else if(lib.isArray(val)) {
		          return val;
		        }
		        else {
		            throw new lib.TemplateError('list filter: type not iterable');
		        }
		    },
	
		    lower: function(str) {
		        str = normalize(str, '');
		        return str.toLowerCase();
		    },
	
		    nl2br: function(str) {
		        if (str === null || str === undefined) {
		            return '';
		        }
		        return r.copySafeness(str, str.replace(/\r\n|\n/g, '<br />\n'));
		    },
	
		    random: function(arr) {
		        return arr[Math.floor(Math.random() * arr.length)];
		    },
	
		    rejectattr: function(arr, attr) {
		      return arr.filter(function (item) {
		        return !item[attr];
		      });
		    },
	
		    selectattr: function(arr, attr) {
		      return arr.filter(function (item) {
		        return !!item[attr];
		      });
		    },
	
		    replace: function(str, old, new_, maxCount) {
		        var originalStr = str;
	
		        if (old instanceof RegExp) {
		            return str.replace(old, new_);
		        }
	
		        if(typeof maxCount === 'undefined'){
		            maxCount = -1;
		        }
	
		        var res = '';  // Output
	
		        // Cast Numbers in the search term to string
		        if(typeof old === 'number'){
		            old = old + '';
		        }
		        else if(typeof old !== 'string') {
		            // If it is something other than number or string,
		            // return the original string
		            return str;
		        }
	
		        // Cast numbers in the replacement to string
		        if(typeof str === 'number'){
		            str = str + '';
		        }
	
		        // If by now, we don't have a string, throw it back
		        if(typeof str !== 'string' && !(str instanceof r.SafeString)){
		            return str;
		        }
	
		        // ShortCircuits
		        if(old === ''){
		            // Mimic the python behaviour: empty string is replaced
		            // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
		            res = new_ + str.split('').join(new_) + new_;
		            return r.copySafeness(str, res);
		        }
	
		        var nextIndex = str.indexOf(old);
		        // if # of replacements to perform is 0, or the string to does
		        // not contain the old value, return the string
		        if(maxCount === 0 || nextIndex === -1){
		            return str;
		        }
	
		        var pos = 0;
		        var count = 0; // # of replacements made
	
		        while(nextIndex  > -1 && (maxCount === -1 || count < maxCount)){
		            // Grab the next chunk of src string and add it with the
		            // replacement, to the result
		            res += str.substring(pos, nextIndex) + new_;
		            // Increment our pointer in the src string
		            pos = nextIndex + old.length;
		            count++;
		            // See if there are any more replacements to be made
		            nextIndex = str.indexOf(old, pos);
		        }
	
		        // We've either reached the end, or done the max # of
		        // replacements, tack on any remaining string
		        if(pos < str.length) {
		            res += str.substring(pos);
		        }
	
		        return r.copySafeness(originalStr, res);
		    },
	
		    reverse: function(val) {
		        var arr;
		        if(lib.isString(val)) {
		            arr = filters.list(val);
		        }
		        else {
		            // Copy it
		            arr = lib.map(val, function(v) { return v; });
		        }
	
		        arr.reverse();
	
		        if(lib.isString(val)) {
		            return r.copySafeness(val, arr.join(''));
		        }
		        return arr;
		    },
	
		    round: function(val, precision, method) {
		        precision = precision || 0;
		        var factor = Math.pow(10, precision);
		        var rounder;
	
		        if(method === 'ceil') {
		            rounder = Math.ceil;
		        }
		        else if(method === 'floor') {
		            rounder = Math.floor;
		        }
		        else {
		            rounder = Math.round;
		        }
	
		        return rounder(val * factor) / factor;
		    },
	
		    slice: function(arr, slices, fillWith) {
		        var sliceLength = Math.floor(arr.length / slices);
		        var extra = arr.length % slices;
		        var offset = 0;
		        var res = [];
	
		        for(var i=0; i<slices; i++) {
		            var start = offset + i * sliceLength;
		            if(i < extra) {
		                offset++;
		            }
		            var end = offset + (i + 1) * sliceLength;
	
		            var slice = arr.slice(start, end);
		            if(fillWith && i >= extra) {
		                slice.push(fillWith);
		            }
		            res.push(slice);
		        }
	
		        return res;
		    },
	
		    sum: function(arr, attr, start) {
		        var sum = 0;
	
		        if(typeof start === 'number'){
		            sum += start;
		        }
	
		        if(attr) {
		            arr = lib.map(arr, function(v) {
		                return v[attr];
		            });
		        }
	
		        for(var i = 0; i < arr.length; i++) {
		            sum += arr[i];
		        }
	
		        return sum;
		    },
	
		    sort: r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function(arr, reverse, caseSens, attr) {
		         // Copy it
		        arr = lib.map(arr, function(v) { return v; });
	
		        arr.sort(function(a, b) {
		            var x, y;
	
		            if(attr) {
		                x = a[attr];
		                y = b[attr];
		            }
		            else {
		                x = a;
		                y = b;
		            }
	
		            if(!caseSens && lib.isString(x) && lib.isString(y)) {
		                x = x.toLowerCase();
		                y = y.toLowerCase();
		            }
	
		            if(x < y) {
		                return reverse ? 1 : -1;
		            }
		            else if(x > y) {
		                return reverse ? -1: 1;
		            }
		            else {
		                return 0;
		            }
		        });
	
		        return arr;
		    }),
	
		    string: function(obj) {
		        return r.copySafeness(obj, obj);
		    },
	
		    striptags: function(input, preserve_linebreaks) {
		        input = normalize(input, '');
		        preserve_linebreaks = preserve_linebreaks || false;
		        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
		        var trimmedInput = filters.trim(input.replace(tags, ''));
		        var res = '';
		        if (preserve_linebreaks) {
		            res = trimmedInput
		                .replace(/^ +| +$/gm, '')     // remove leading and trailing spaces
		                .replace(/ +/g, ' ')          // squash adjacent spaces
		                .replace(/(\r\n)/g, '\n')     // normalize linebreaks (CRLF -> LF)
		                .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
		        } else {
		            res = trimmedInput.replace(/\s+/gi, ' ');
		        }
		        return r.copySafeness(input, res);
		    },
	
		    title: function(str) {
		        str = normalize(str, '');
		        var words = str.split(' ');
		        for(var i = 0; i < words.length; i++) {
		            words[i] = filters.capitalize(words[i]);
		        }
		        return r.copySafeness(str, words.join(' '));
		    },
	
		    trim: function(str) {
		        return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
		    },
	
		    truncate: function(input, length, killwords, end) {
		        var orig = input;
		        input = normalize(input, '');
		        length = length || 255;
	
		        if (input.length <= length)
		            return input;
	
		        if (killwords) {
		            input = input.substring(0, length);
		        } else {
		            var idx = input.lastIndexOf(' ', length);
		            if(idx === -1) {
		                idx = length;
		            }
	
		            input = input.substring(0, idx);
		        }
	
		        input += (end !== undefined && end !== null) ? end : '...';
		        return r.copySafeness(orig, input);
		    },
	
		    upper: function(str) {
		        str = normalize(str, '');
		        return str.toUpperCase();
		    },
	
		    urlencode: function(obj) {
		        var enc = encodeURIComponent;
		        if (lib.isString(obj)) {
		            return enc(obj);
		        } else {
		            var parts;
		            if (lib.isArray(obj)) {
		                parts = obj.map(function(item) {
		                    return enc(item[0]) + '=' + enc(item[1]);
		                });
		            } else {
		                parts = [];
		                for (var k in obj) {
		                    if (obj.hasOwnProperty(k)) {
		                        parts.push(enc(k) + '=' + enc(obj[k]));
		                    }
		                }
		            }
		            return parts.join('&');
		        }
		    },
	
		    urlize: function(str, length, nofollow) {
		        if (isNaN(length)) length = Infinity;
	
		        var noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');
	
		        // For the jinja regexp, see
		        // https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
		        var puncRE = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
		        // from http://blog.gerv.net/2011/05/html5_email_address_regexp/
		        var emailRE = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
		        var httpHttpsRE = /^https?:\/\/.*$/;
		        var wwwRE = /^www\./;
		        var tldRE = /\.(?:org|net|com)(?:\:|\/|$)/;
	
		        var words = str.split(/(\s+)/).filter(function(word) {
		          // If the word has no length, bail. This can happen for str with
		          // trailing whitespace.
		          return word && word.length;
		        }).map(function(word) {
		          var matches = word.match(puncRE);
		          var possibleUrl = matches && matches[1] || word;
	
		          // url that starts with http or https
		          if (httpHttpsRE.test(possibleUrl))
		            return '<a href="' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';
	
		          // url that starts with www.
		          if (wwwRE.test(possibleUrl))
		            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';
	
		          // an email address of the form username@domain.tld
		          if (emailRE.test(possibleUrl))
		            return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + '</a>';
	
		          // url that ends in .com, .org or .net that is not an email address
		          if (tldRE.test(possibleUrl))
		            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';
	
		          return word;
	
		        });
	
		        return words.join('');
		    },
	
		    wordcount: function(str) {
		        str = normalize(str, '');
		        var words = (str) ? str.match(/\w+/g) : null;
		        return (words) ? words.length : null;
		    },
	
		    'float': function(val, def) {
		        var res = parseFloat(val);
		        return isNaN(res) ? def : res;
		    },
	
		    'int': function(val, def) {
		        var res = parseInt(val, 10);
		        return isNaN(res) ? def : res;
		    }
		};
	
		// Aliases
		filters.d = filters['default'];
		filters.e = filters.escape;
	
		module.exports = filters;
	
	
	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var lib = __webpack_require__(1);
		var Obj = __webpack_require__(6);
	
		// Frames keep track of scoping both at compile-time and run-time so
		// we know how to access variables. Block tags can introduce special
		// variables, for example.
		var Frame = Obj.extend({
		    init: function(parent, isolateWrites) {
		        this.variables = {};
		        this.parent = parent;
		        this.topLevel = false;
		        // if this is true, writes (set) should never propagate upwards past
		        // this frame to its parent (though reads may).
		        this.isolateWrites = isolateWrites;
		    },
	
		    set: function(name, val, resolveUp) {
		        // Allow variables with dots by automatically creating the
		        // nested structure
		        var parts = name.split('.');
		        var obj = this.variables;
		        var frame = this;
	
		        if(resolveUp) {
		            if((frame = this.resolve(parts[0], true))) {
		                frame.set(name, val);
		                return;
		            }
		        }
	
		        for(var i=0; i<parts.length - 1; i++) {
		            var id = parts[i];
	
		            if(!obj[id]) {
		                obj[id] = {};
		            }
		            obj = obj[id];
		        }
	
		        obj[parts[parts.length - 1]] = val;
		    },
	
		    get: function(name) {
		        var val = this.variables[name];
		        if(val !== undefined) {
		            return val;
		        }
		        return null;
		    },
	
		    lookup: function(name) {
		        var p = this.parent;
		        var val = this.variables[name];
		        if(val !== undefined) {
		            return val;
		        }
		        return p && p.lookup(name);
		    },
	
		    resolve: function(name, forWrite) {
		        var p = (forWrite && this.isolateWrites) ? undefined : this.parent;
		        var val = this.variables[name];
		        if(val !== undefined) {
		            return this;
		        }
		        return p && p.resolve(name);
		    },
	
		    push: function(isolateWrites) {
		        return new Frame(this, isolateWrites);
		    },
	
		    pop: function() {
		        return this.parent;
		    }
		});
	
		function makeMacro(argNames, kwargNames, func) {
		    return function() {
		        var argCount = numArgs(arguments);
		        var args;
		        var kwargs = getKeywordArgs(arguments);
		        var i;
	
		        if(argCount > argNames.length) {
		            args = Array.prototype.slice.call(arguments, 0, argNames.length);
	
		            // Positional arguments that should be passed in as
		            // keyword arguments (essentially default values)
		            var vals = Array.prototype.slice.call(arguments, args.length, argCount);
		            for(i = 0; i < vals.length; i++) {
		                if(i < kwargNames.length) {
		                    kwargs[kwargNames[i]] = vals[i];
		                }
		            }
	
		            args.push(kwargs);
		        }
		        else if(argCount < argNames.length) {
		            args = Array.prototype.slice.call(arguments, 0, argCount);
	
		            for(i = argCount; i < argNames.length; i++) {
		                var arg = argNames[i];
	
		                // Keyword arguments that should be passed as
		                // positional arguments, i.e. the caller explicitly
		                // used the name of a positional arg
		                args.push(kwargs[arg]);
		                delete kwargs[arg];
		            }
	
		            args.push(kwargs);
		        }
		        else {
		            args = arguments;
		        }
	
		        return func.apply(this, args);
		    };
		}
	
		function makeKeywordArgs(obj) {
		    obj.__keywords = true;
		    return obj;
		}
	
		function getKeywordArgs(args) {
		    var len = args.length;
		    if(len) {
		        var lastArg = args[len - 1];
		        if(lastArg && lastArg.hasOwnProperty('__keywords')) {
		            return lastArg;
		        }
		    }
		    return {};
		}
	
		function numArgs(args) {
		    var len = args.length;
		    if(len === 0) {
		        return 0;
		    }
	
		    var lastArg = args[len - 1];
		    if(lastArg && lastArg.hasOwnProperty('__keywords')) {
		        return len - 1;
		    }
		    else {
		        return len;
		    }
		}
	
		// A SafeString object indicates that the string should not be
		// autoescaped. This happens magically because autoescaping only
		// occurs on primitive string objects.
		function SafeString(val) {
		    if(typeof val !== 'string') {
		        return val;
		    }
	
		    this.val = val;
		    this.length = val.length;
		}
	
		SafeString.prototype = Object.create(String.prototype, {
		    length: { writable: true, configurable: true, value: 0 }
		});
		SafeString.prototype.valueOf = function() {
		    return this.val;
		};
		SafeString.prototype.toString = function() {
		    return this.val;
		};
	
		function copySafeness(dest, target) {
		    if(dest instanceof SafeString) {
		        return new SafeString(target);
		    }
		    return target.toString();
		}
	
		function markSafe(val) {
		    var type = typeof val;
	
		    if(type === 'string') {
		        return new SafeString(val);
		    }
		    else if(type !== 'function') {
		        return val;
		    }
		    else {
		        return function() {
		            var ret = val.apply(this, arguments);
	
		            if(typeof ret === 'string') {
		                return new SafeString(ret);
		            }
	
		            return ret;
		        };
		    }
		}
	
		function suppressValue(val, autoescape) {
		    val = (val !== undefined && val !== null) ? val : '';
	
		    if(autoescape && !(val instanceof SafeString)) {
		        val = lib.escape(val.toString());
		    }
	
		    return val;
		}
	
		function ensureDefined(val, lineno, colno) {
		    if(val === null || val === undefined) {
		        throw new lib.TemplateError(
		            'attempted to output null or undefined value',
		            lineno + 1,
		            colno + 1
		        );
		    }
		    return val;
		}
	
		function memberLookup(obj, val) {
		    obj = obj || {};
	
		    if(typeof obj[val] === 'function') {
		        return function() {
		            return obj[val].apply(obj, arguments);
		        };
		    }
	
		    return obj[val];
		}
	
		function callWrap(obj, name, context, args) {
		    if(!obj) {
		        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
		    }
		    else if(typeof obj !== 'function') {
		        throw new Error('Unable to call `' + name + '`, which is not a function');
		    }
	
		    // jshint validthis: true
		    return obj.apply(context, args);
		}
	
		function contextOrFrameLookup(context, frame, name) {
		    var val = frame.lookup(name);
		    return (val !== undefined) ?
		        val :
		        context.lookup(name);
		}
	
		function handleError(error, lineno, colno) {
		    if(error.lineno) {
		        return error;
		    }
		    else {
		        return new lib.TemplateError(error, lineno, colno);
		    }
		}
	
		function asyncEach(arr, dimen, iter, cb) {
		    if(lib.isArray(arr)) {
		        var len = arr.length;
	
		        lib.asyncIter(arr, function(item, i, next) {
		            switch(dimen) {
		            case 1: iter(item, i, len, next); break;
		            case 2: iter(item[0], item[1], i, len, next); break;
		            case 3: iter(item[0], item[1], item[2], i, len, next); break;
		            default:
		                item.push(i, next);
		                iter.apply(this, item);
		            }
		        }, cb);
		    }
		    else {
		        lib.asyncFor(arr, function(key, val, i, len, next) {
		            iter(key, val, i, len, next);
		        }, cb);
		    }
		}
	
		function asyncAll(arr, dimen, func, cb) {
		    var finished = 0;
		    var len, i;
		    var outputArr;
	
		    function done(i, output) {
		        finished++;
		        outputArr[i] = output;
	
		        if(finished === len) {
		            cb(null, outputArr.join(''));
		        }
		    }
	
		    if(lib.isArray(arr)) {
		        len = arr.length;
		        outputArr = new Array(len);
	
		        if(len === 0) {
		            cb(null, '');
		        }
		        else {
		            for(i = 0; i < arr.length; i++) {
		                var item = arr[i];
	
		                switch(dimen) {
		                case 1: func(item, i, len, done); break;
		                case 2: func(item[0], item[1], i, len, done); break;
		                case 3: func(item[0], item[1], item[2], i, len, done); break;
		                default:
		                    item.push(i, done);
		                    // jshint validthis: true
		                    func.apply(this, item);
		                }
		            }
		        }
		    }
		    else {
		        var keys = lib.keys(arr);
		        len = keys.length;
		        outputArr = new Array(len);
	
		        if(len === 0) {
		            cb(null, '');
		        }
		        else {
		            for(i = 0; i < keys.length; i++) {
		                var k = keys[i];
		                func(k, arr[k], i, len, done);
		            }
		        }
		    }
		}
	
		module.exports = {
		    Frame: Frame,
		    makeMacro: makeMacro,
		    makeKeywordArgs: makeKeywordArgs,
		    numArgs: numArgs,
		    suppressValue: suppressValue,
		    ensureDefined: ensureDefined,
		    memberLookup: memberLookup,
		    contextOrFrameLookup: contextOrFrameLookup,
		    callWrap: callWrap,
		    handleError: handleError,
		    isArray: lib.isArray,
		    keys: lib.keys,
		    SafeString: SafeString,
		    copySafeness: copySafeness,
		    markSafe: markSafe,
		    asyncEach: asyncEach,
		    asyncAll: asyncAll,
		    inOperator: lib.inOperator
		};
	
	
	/***/ }),
	/* 9 */
	/***/ (function(module, exports) {
	
		'use strict';
	
		function cycler(items) {
		    var index = -1;
	
		    return {
		        current: null,
		        reset: function() {
		            index = -1;
		            this.current = null;
		        },
	
		        next: function() {
		            index++;
		            if(index >= items.length) {
		                index = 0;
		            }
	
		            this.current = items[index];
		            return this.current;
		        },
		    };
	
		}
	
		function joiner(sep) {
		    sep = sep || ',';
		    var first = true;
	
		    return function() {
		        var val = first ? '' : sep;
		        first = false;
		        return val;
		    };
		}
	
		// Making this a function instead so it returns a new object
		// each time it's called. That way, if something like an environment
		// uses it, they will each have their own copy.
		function globals() {
		    return {
		        range: function(start, stop, step) {
		            if(typeof stop === 'undefined') {
		                stop = start;
		                start = 0;
		                step = 1;
		            }
		            else if(!step) {
		                step = 1;
		            }
	
		            var arr = [];
		            var i;
		            if (step > 0) {
		                for (i=start; i<stop; i+=step) {
		                    arr.push(i);
		                }
		            } else {
		                for (i=start; i>stop; i+=step) {
		                    arr.push(i);
		                }
		            }
		            return arr;
		        },
	
		        // lipsum: function(n, html, min, max) {
		        // },
	
		        cycler: function() {
		            return cycler(Array.prototype.slice.call(arguments));
		        },
	
		        joiner: function(sep) {
		            return joiner(sep);
		        }
		    };
		}
	
		module.exports = globals;
	
	
	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(setImmediate, process) {// MIT license (by Elan Shanker).
		(function(globals) {
		  'use strict';
	
		  var executeSync = function(){
		    var args = Array.prototype.slice.call(arguments);
		    if (typeof args[0] === 'function'){
		      args[0].apply(null, args.splice(1));
		    }
		  };
	
		  var executeAsync = function(fn){
		    if (typeof setImmediate === 'function') {
		      setImmediate(fn);
		    } else if (typeof process !== 'undefined' && process.nextTick) {
		      process.nextTick(fn);
		    } else {
		      setTimeout(fn, 0);
		    }
		  };
	
		  var makeIterator = function (tasks) {
		    var makeCallback = function (index) {
		      var fn = function () {
		        if (tasks.length) {
		          tasks[index].apply(null, arguments);
		        }
		        return fn.next();
		      };
		      fn.next = function () {
		        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
		      };
		      return fn;
		    };
		    return makeCallback(0);
		  };
		  
		  var _isArray = Array.isArray || function(maybeArray){
		    return Object.prototype.toString.call(maybeArray) === '[object Array]';
		  };
	
		  var waterfall = function (tasks, callback, forceAsync) {
		    var nextTick = forceAsync ? executeAsync : executeSync;
		    callback = callback || function () {};
		    if (!_isArray(tasks)) {
		      var err = new Error('First argument to waterfall must be an array of functions');
		      return callback(err);
		    }
		    if (!tasks.length) {
		      return callback();
		    }
		    var wrapIterator = function (iterator) {
		      return function (err) {
		        if (err) {
		          callback.apply(null, arguments);
		          callback = function () {};
		        } else {
		          var args = Array.prototype.slice.call(arguments, 1);
		          var next = iterator.next();
		          if (next) {
		            args.push(wrapIterator(next));
		          } else {
		            args.push(callback);
		          }
		          nextTick(function () {
		            iterator.apply(null, args);
		          });
		        }
		      };
		    };
		    wrapIterator(makeIterator(tasks))();
		  };
	
		  if (true) {
		    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
		      return waterfall;
		    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
		  } else if (typeof module !== 'undefined' && module.exports) {
		    module.exports = waterfall; // CommonJS
		  } else {
		    globals.waterfall = waterfall; // <script>
		  }
		})(this);
	
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).setImmediate, __webpack_require__(13)))
	
	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var apply = Function.prototype.apply;
	
		// DOM APIs, for completeness
	
		exports.setTimeout = function() {
		  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
		};
		exports.setInterval = function() {
		  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
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
		  this._clearFn.call(window, this._id);
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
		__webpack_require__(12);
		exports.setImmediate = setImmediate;
		exports.clearImmediate = clearImmediate;
	
	
	/***/ }),
	/* 12 */
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
	
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(13)))
	
	/***/ }),
	/* 13 */
	/***/ (function(module, exports) {
	
		
	
	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Loader = __webpack_require__(15);
	
		var PrecompiledLoader = Loader.extend({
		    init: function(compiledTemplates) {
		        this.precompiled = compiledTemplates || {};
		    },
	
		    getSource: function(name) {
		        if (this.precompiled[name]) {
		            return {
		                src: { type: 'code',
		                       obj: this.precompiled[name] },
		                path: name
		            };
		        }
		        return null;
		    }
		});
	
		module.exports = PrecompiledLoader;
	
	
	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var path = __webpack_require__(3);
		var Obj = __webpack_require__(6);
		var lib = __webpack_require__(1);
	
		var Loader = Obj.extend({
		    on: function(name, func) {
		        this.listeners = this.listeners || {};
		        this.listeners[name] = this.listeners[name] || [];
		        this.listeners[name].push(func);
		    },
	
		    emit: function(name /*, arg1, arg2, ...*/) {
		        var args = Array.prototype.slice.call(arguments, 1);
	
		        if(this.listeners && this.listeners[name]) {
		            lib.each(this.listeners[name], function(listener) {
		                listener.apply(null, args);
		            });
		        }
		    },
	
		    resolve: function(from, to) {
		        return path.resolve(path.dirname(from), to);
		    },
	
		    isRelative: function(filename) {
		        return (filename.indexOf('./') === 0 || filename.indexOf('../') === 0);
		    }
		});
	
		module.exports = Loader;
	
	
	/***/ }),
	/* 16 */
	/***/ (function(module, exports) {
	
		function installCompat() {
		    'use strict';
	
		    // This must be called like `nunjucks.installCompat` so that `this`
		    // references the nunjucks instance
		    var runtime = this.runtime; // jshint ignore:line
		    var lib = this.lib; // jshint ignore:line
		    var Compiler = this.compiler.Compiler; // jshint ignore:line
		    var Parser = this.parser.Parser; // jshint ignore:line
		    var nodes = this.nodes; // jshint ignore:line
		    var lexer = this.lexer; // jshint ignore:line
	
		    var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
		    var orig_Compiler_assertType = Compiler.prototype.assertType;
		    var orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
		    var orig_memberLookup = runtime.memberLookup;
	
		    function uninstall() {
		        runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
		        Compiler.prototype.assertType = orig_Compiler_assertType;
		        Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
		        runtime.memberLookup = orig_memberLookup;
		    }
	
		    runtime.contextOrFrameLookup = function(context, frame, key) {
		        var val = orig_contextOrFrameLookup.apply(this, arguments);
		        if (val === undefined) {
		            switch (key) {
		            case 'True':
		                return true;
		            case 'False':
		                return false;
		            case 'None':
		                return null;
		            }
		        }
	
		        return val;
		    };
	
		    var Slice = nodes.Node.extend('Slice', {
		        fields: ['start', 'stop', 'step'],
		        init: function(lineno, colno, start, stop, step) {
		            start = start || new nodes.Literal(lineno, colno, null);
		            stop = stop || new nodes.Literal(lineno, colno, null);
		            step = step || new nodes.Literal(lineno, colno, 1);
		            this.parent(lineno, colno, start, stop, step);
		        }
		    });
	
		    Compiler.prototype.assertType = function(node) {
		        if (node instanceof Slice) {
		            return;
		        }
		        return orig_Compiler_assertType.apply(this, arguments);
		    };
		    Compiler.prototype.compileSlice = function(node, frame) {
		        this.emit('(');
		        this._compileExpression(node.start, frame);
		        this.emit('),(');
		        this._compileExpression(node.stop, frame);
		        this.emit('),(');
		        this._compileExpression(node.step, frame);
		        this.emit(')');
		    };
	
		    function getTokensState(tokens) {
		        return {
		            index: tokens.index,
		            lineno: tokens.lineno,
		            colno: tokens.colno
		        };
		    }
	
		    Parser.prototype.parseAggregate = function() {
		        var self = this;
		        var origState = getTokensState(this.tokens);
		        // Set back one accounting for opening bracket/parens
		        origState.colno--;
		        origState.index--;
		        try {
		            return orig_Parser_parseAggregate.apply(this);
		        } catch(e) {
		            var errState = getTokensState(this.tokens);
		            var rethrow = function() {
		                lib.extend(self.tokens, errState);
		                return e;
		            };
	
		            // Reset to state before original parseAggregate called
		            lib.extend(this.tokens, origState);
		            this.peeked = false;
	
		            var tok = this.peekToken();
		            if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
		                throw rethrow();
		            } else {
		                this.nextToken();
		            }
	
		            var node = new Slice(tok.lineno, tok.colno);
	
		            // If we don't encounter a colon while parsing, this is not a slice,
		            // so re-raise the original exception.
		            var isSlice = false;
	
		            for (var i = 0; i <= node.fields.length; i++) {
		                if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
		                    break;
		                }
		                if (i === node.fields.length) {
		                    if (isSlice) {
		                        this.fail('parseSlice: too many slice components', tok.lineno, tok.colno);
		                    } else {
		                        break;
		                    }
		                }
		                if (this.skip(lexer.TOKEN_COLON)) {
		                    isSlice = true;
		                } else {
		                    var field = node.fields[i];
		                    node[field] = this.parseExpression();
		                    isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
		                }
		            }
		            if (!isSlice) {
		                throw rethrow();
		            }
		            return new nodes.Array(tok.lineno, tok.colno, [node]);
		        }
		    };
	
		    function sliceLookup(obj, start, stop, step) {
		        obj = obj || [];
		        if (start === null) {
		            start = (step < 0) ? (obj.length - 1) : 0;
		        }
		        if (stop === null) {
		            stop = (step < 0) ? -1 : obj.length;
		        } else {
		            if (stop < 0) {
		                stop += obj.length;
		            }
		        }
	
		        if (start < 0) {
		            start += obj.length;
		        }
	
		        var results = [];
	
		        for (var i = start; ; i += step) {
		            if (i < 0 || i > obj.length) {
		                break;
		            }
		            if (step > 0 && i >= stop) {
		                break;
		            }
		            if (step < 0 && i <= stop) {
		                break;
		            }
		            results.push(runtime.memberLookup(obj, i));
		        }
		        return results;
		    }
	
		    var ARRAY_MEMBERS = {
		        pop: function(index) {
		            if (index === undefined) {
		                return this.pop();
		            }
		            if (index >= this.length || index < 0) {
		                throw new Error('KeyError');
		            }
		            return this.splice(index, 1);
		        },
		        append: function(element) {
		                return this.push(element);
		        },
		        remove: function(element) {
		            for (var i = 0; i < this.length; i++) {
		                if (this[i] === element) {
		                    return this.splice(i, 1);
		                }
		            }
		            throw new Error('ValueError');
		        },
		        count: function(element) {
		            var count = 0;
		            for (var i = 0; i < this.length; i++) {
		                if (this[i] === element) {
		                    count++;
		                }
		            }
		            return count;
		        },
		        index: function(element) {
		            var i;
		            if ((i = this.indexOf(element)) === -1) {
		                throw new Error('ValueError');
		            }
		            return i;
		        },
		        find: function(element) {
		            return this.indexOf(element);
		        },
		        insert: function(index, elem) {
		            return this.splice(index, 0, elem);
		        }
		    };
		    var OBJECT_MEMBERS = {
		        items: function() {
		            var ret = [];
		            for(var k in this) {
		                ret.push([k, this[k]]);
		            }
		            return ret;
		        },
		        values: function() {
		            var ret = [];
		            for(var k in this) {
		                ret.push(this[k]);
		            }
		            return ret;
		        },
		        keys: function() {
		            var ret = [];
		            for(var k in this) {
		                ret.push(k);
		            }
		            return ret;
		        },
		        get: function(key, def) {
		            var output = this[key];
		            if (output === undefined) {
		                output = def;
		            }
		            return output;
		        },
		        has_key: function(key) {
		            return this.hasOwnProperty(key);
		        },
		        pop: function(key, def) {
		            var output = this[key];
		            if (output === undefined && def !== undefined) {
		                output = def;
		            } else if (output === undefined) {
		                throw new Error('KeyError');
		            } else {
		                delete this[key];
		            }
		            return output;
		        },
		        popitem: function() {
		            for (var k in this) {
		                // Return the first object pair.
		                var val = this[k];
		                delete this[k];
		                return [k, val];
		            }
		            throw new Error('KeyError');
		        },
		        setdefault: function(key, def) {
		            if (key in this) {
		                return this[key];
		            }
		            if (def === undefined) {
		                def = null;
		            }
		            return this[key] = def;
		        },
		        update: function(kwargs) {
		            for (var k in kwargs) {
		                this[k] = kwargs[k];
		            }
		            return null;    // Always returns None
		        }
		    };
		    OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
		    OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
		    OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
		    runtime.memberLookup = function(obj, val, autoescape) { // jshint ignore:line
		        if (arguments.length === 4) {
		            return sliceLookup.apply(this, arguments);
		        }
		        obj = obj || {};
	
		        // If the object is an object, return any of the methods that Python would
		        // otherwise provide.
		        if (lib.isArray(obj) && ARRAY_MEMBERS.hasOwnProperty(val)) {
		            return function() {return ARRAY_MEMBERS[val].apply(obj, arguments);};
		        }
	
		        if (lib.isObject(obj) && OBJECT_MEMBERS.hasOwnProperty(val)) {
		            return function() {return OBJECT_MEMBERS[val].apply(obj, arguments);};
		        }
	
		        return orig_memberLookup.apply(this, arguments);
		    };
	
		    return uninstall;
		}
	
		module.exports = installCompat;
	
	
	/***/ })
	/******/ ])
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).setImmediate, __webpack_require__(12).clearImmediate))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
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
	  this._clearFn.call(window, this._id);
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
	__webpack_require__(13);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 13 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(14)))

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

	module.exports = function (nunjucks, env, obj, dependencies){
	
	    var oldRoot = obj.root;
	
	    obj.root = function( env, context, frame, runtime, ignoreMissing, cb ) {
	        var oldGetTemplate = env.getTemplate;
	        env.getTemplate = function (name, ec, parentName, ignoreMissing, cb) {
	            if( typeof ec === "function" ) {
	                cb = ec = false;
	            }
	            var _require = function (name) {
	                try {
	                    // add a reference to the already resolved dependency here
	                    return dependencies[name];
	                }
	                catch (e) {
	                    if (frame.get("_require")) {
	                        return frame.get("_require")(name);
	                    }
	                    else {
	                        console.warn('Could not load template "%s"', name);
	                    }
	                }
	            };
	
	            var tmpl = _require(name);
	            frame.set("_require", _require);
	
	            if( ec ) tmpl.compile();
	            cb( null, tmpl );
	        };
	
	        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {
	            env.getTemplate = oldGetTemplate;
	            cb( err, res );
	        });
	    };
	
	    var src = {
	        obj: obj,
	        type: 'code'
	    };
	
	    return new nunjucks.Template(src, env);
	
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Tracker
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For tracking and analytics
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	exports.trackingLibrary = trackingLibrary;
	exports.sendEvent = sendEvent;
	exports.sendDataLayerEvent = sendDataLayerEvent;
	exports.sendUniversalEvent = sendUniversalEvent;
	exports.sendClassicEvent = sendClassicEvent;
	
	var _pluginizr = __webpack_require__(3);
	
	var _pluginizr2 = _interopRequireDefault(_pluginizr);
	
	var _eventr = __webpack_require__(6);
	
	var _eventr2 = _interopRequireDefault(_eventr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Defaults = {
		trackSelectors: ["a[data-track]", "button[data-track]", "[type='submit'][data-track]", "[type='reset'][data-track]", "[type='image'][data-track]", "[data-track] a", "[data-track] button", ".tophat a"]
	};
	
	var TagManager = "TagManager",
	    Classic = "Classic",
	    Universal = "Universal";
	
	// Gets the name of tracking library available
	function trackingLibrary() {
		if (window.dataLayer && typeof window.dataLayer.push === "function") return TagManager;
	
		if (window._gaq && typeof window._gaq.push === "function") return Classic;
	
		if (typeof window.ga === "function") return Universal;
	
		return "";
	}
	
	/**
	 * A function that gets called as soon as a hit to Google has been successfully sent.
	 *
	 * @callback hitCallback
	 * @param {string} message An optional error message if it fails
	 */
	
	/**
	 * Tracks an event to the current loaded analytics services (either GTM/GA/UA)
	 * @param  {string} category        The name you supply for the group of objects you want to track.
	 * @param  {string} action        	A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
	 * @param  {string} label        	An optional string to provide additional dimensions to the event data.
	 * @param  {integer} value       	An optional integer that you can use to provide numerical data about the user event.
	 * @param  {hitCallback} callback 	A function to callback
	 * @param  {boolean} nonInteraction Specified an event as a non-interaction event. Note: non-interaction can"t be set via the datalayer in GTM
	 * @return {Promise}				A promise that resolves when the track has successfully finished
	 * @example
	 * 	import Tracker from "tracker";
	 * 	Tracker.trackEvent("ct", "actn", "lbl").then(() => {
	 * 		// tracked
	 * 	}).catch(err => {
	 * 		// Error tracking
	 * 	};
	 */
	function sendEvent(category, action) {
		var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
		var value = arguments[3];
		var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
		var nonInteraction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
	
	
		if (trackingLibrary() == TagManager) return sendDataLayerEvent(category, action, label, value, callback);else if (trackingLibrary() == Universal) return sendUniversalEvent(category, action, label, value, callback, nonInteraction);else if (trackingLibrary() == Classic) return sendClassicEvent(category, action, label, value, callback, nonInteraction);
	
		var msg = "No tracking library available",
		    err = new Error(msg);
		if (typeof callback === "function") callback(err);
		return Promise.reject(err);
	}
	
	/**
	 * Sends an event to the GTM data layer
	 * @param  {String} category 	Category
	 * @param  {String} action 		Action
	 * @param  {String} label 		Label
	 * @param  {Int} values			Value
	 * @param  {Function} callback 	Callback
	 * @return {Promise}			A promise resolved when the track has fired
	 */
	function sendDataLayerEvent(category, action) {
		var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
		var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
		var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	
	
		if (trackingLibrary() !== TagManager) {
			return new Promise(function (resolve, reject) {
				// eslint-disable-line no-unused-vars
				var msg = "Google Tag Manager is not available";
				if (typeof callback === "function") callback(msg);
				reject(msg);
			});
		}
	
		var data = {
			event: "event",
			eventCategory: category,
			eventAction: action,
			eventLabel: label
		};
	
		if (value) data.eventValue = value;
	
		return new Promise(function (resolve) {
			data.eventCallback = function () {
				if (typeof callback === "function") callback();
				resolve();
			};
	
			window.dataLayer.push(data);
		});
	}
	
	/**
	 * Sends an event to the Universal Analytics
	 * @param  {String} category 	Category
	 * @param  {String} action 		Action
	 * @param  {String} label 		Label
	 * @param  {Int} values			Value
	 * @param  {Function} callback 	Callback
	 * @return {Promise}			A promise resolved when the track has fired
	 */
	function sendUniversalEvent(category, action) {
		var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
		var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
		var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	
	
		if (trackingLibrary() !== Universal) {
			return new Promise(function (resolve, reject) {
				// eslint-disable-line no-unused-vars
				var msg = "Universal Analytics is not available";
				if (typeof callback === "function") callback(msg);
				reject(msg);
			});
		}
	
		return new Promise(function (resolve) {
			var cb = function cb() {
				if (typeof callback === "function") callback();
				resolve();
			};
	
			window.ga("send", {
				hitType: "event",
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				eventValue: value,
				hitCallback: cb
			});
		});
	}
	
	function sendClassicEvent(category, action) {
		var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
		var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
		var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	
	
		if (trackingLibrary() !== Classic) {
			return new Promise(function (resolve, reject) {
				// eslint-disable-line no-unused-vars
				var msg = "Classic Analytics is not available";
				if (typeof callback === "function") callback(msg);
				reject(msg);
			});
		}
	
		return new Promise(function (resolve) {
			var cb = function cb() {
				if (typeof callback === "function") callback();
				resolve();
			};
	
			window._gaq.push(["_set", "hitCallback", cb]);
			window._gaq.push(["_trackEvent", category, action, label, value]);
		});
	}
	
	/// @class Tracker
	/// Base on the old NICE.EventTracking.js.
	/// @link //cdn.nice.org.uk/V3/Scripts/nice/NICE.EventTracking.js
	
	var Tracker = function () {
		_createClass(Tracker, null, [{
			key: "defaults",
			value: function defaults() {
				return Defaults;
			}
		}]);
	
		function Tracker(element, options) {
			_classCallCheck(this, Tracker);
	
			if (!element) throw new Error("Element must be non-null");
	
			this.el = element;
			this.$el = $(element);
	
			this.options = $.extend({}, Tracker.defaults(), options);
	
			this.delegate();
		}
	
		_createClass(Tracker, [{
			key: "events",
			value: function events() {
				return _defineProperty({}, "click.tracker " + this.options.trackSelectors.join(","), "_handleTrack");
			}
		}, {
			key: "_handleTrack",
			value: function _handleTrack(e) {
				var $el = $(e.currentTarget);
	
				var cat = $el.data("track-category") || "",
				    action = $el.data("track-action") || "",
				    label = $el.data("track-label") || "",
				    value = $el.data("track-value");
	
				sendEvent(cat, action, label, value);
			}
		}]);
	
		return Tracker;
	}();
	
	exports['default'] = Tracker;
	
	Tracker.sendEvent = sendEvent;
	Tracker.sendDataLayerEvent = sendDataLayerEvent;
	Tracker.sendUniversalEvent = sendUniversalEvent;
	Tracker.sendClassicEvent = sendClassicEvent;
	
	(0, _eventr2['default'])(Tracker);
	(0, _pluginizr2['default'])("tracker", Tracker);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./in-page-nav/in-page-nav.js": 7,
		"./tabs/tabs.js": 4
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 17;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./breakpoints.js": 9,
		"./eventr.js": 6,
		"./index.js": 1,
		"./plugin-autoloader.js": 2,
		"./pluginizr.js": 3,
		"./tracker.js": 16,
		"./utils.js": 8
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 18;


/***/ })
/******/ ])
});
;
//# sourceMappingURL=nice.dev.map