(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.oneTimeEvent = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.newOneTimeEvent = newOneTimeEvent;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var OneTimeEventPub = function () {
    function OneTimeEventPub(priv) {
      _classCallCheck(this, OneTimeEventPub);

      this._priv = priv;
    }

    _createClass(OneTimeEventPub, [{
      key: 'addHandler',
      value: function addHandler(handler) {
        this._priv.addHandler(handler);
      }
    }, {
      key: 'removeHandler',
      value: function removeHandler(handler) {
        this._priv.removeHandler(handler);
      }
    }]);

    return OneTimeEventPub;
  }();

  var OneTimeEvent = function () {
    function OneTimeEvent(firstAdded, lastRemoved) {
      _classCallCheck(this, OneTimeEvent);

      this._handlers = new Set();
      this._firstAdded = firstAdded;
      this._lastRemoved = lastRemoved;
      this.pub = new OneTimeEventPub(this);
    }

    _createClass(OneTimeEvent, [{
      key: 'fire',
      value: function fire() {
        var currentHandlers = this._handlers;
        this._handlers = new Set();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = currentHandlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var handler = _step.value;

            handler.apply(undefined, arguments);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'addHandler',
      value: function addHandler(handler) {
        if (!handler) {
          throw 'handler must be a function.';
        }
        if (this._firstAdded && this._handlers.size === 0) {
          this._handlers.add(handler);
          this._firstAdded();
        } else {
          this._handlers.add(handler);
        }
      }
    }, {
      key: 'removeHandler',
      value: function removeHandler(handler) {
        if (!handler) {
          throw 'handler must be a function.';
        }
        this._handlers.delete(handler);
        if (this._lastRemoved && this._handlers.size === 0) {
          this._lastRemoved();
        }
      }
    }, {
      key: 'isEmpty',
      get: function get() {
        return this._handlers.size === 0;
      }
    }]);

    return OneTimeEvent;
  }();

  function newOneTimeEvent() {
    var firstAdded = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
    var lastRemoved = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    return new OneTimeEvent(firstAdded, lastRemoved);
  }
});

