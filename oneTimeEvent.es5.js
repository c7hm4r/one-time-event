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

  function OneTimeEventPub(priv) {
    this._priv = priv;
  }
  OneTimeEventPub.prototype.addHandler = function addHandler(handler) {
    this._priv.addHandler(handler);
  };
  OneTimeEventPub.prototype.removeHandler = function removeHandler(handler) {
    this._priv.removeHandler(handler);
  };

  function OneTimeEvent(firstAdded, lastRemoved) {
    this._handlers = new Set();
    this._firstAdded = firstAdded;
    this._lastRemoved = lastRemoved;
    this.pub = new OneTimeEventPub(this);
  }
  OneTimeEvent.prototype.fire = function fire() {
    var currentHandlers = Array.from(this._handlers);
    this._handlers.clear();
    var l = currentHandlers.length;
    for (var i = 0; i < l; i++) {
      currentHandlers[i].apply(undefined, arguments);
    }
  };
  OneTimeEvent.prototype.isEmpty = function isEmpty() {
    return this._handlers.size === 0;
  };
  OneTimeEvent.prototype.addHandler = function addHandler(handler) {
    if (!handler) {
      throw 'handler must be a function.';
    }
    if (this._firstAdded && this._handlers.size === 0) {
      this._handlers.add(handler);
      this._firstAdded();
    } else {
      this._handlers.add(handler);
    }
  };
  OneTimeEvent.prototype.removeHandler = function removeHandler(handler) {
    if (!handler) {
      throw 'handler must be a function.';
    }
    if (this._lastRemoved && this._handlers.size === 1) {
      this._handlers.delete(handler);
      if (this._handlers.size === 0) {
        this._lastRemoved();
      }
    } else {
      this._handlers.delete(handler);
    }
  };

  function newOneTimeEvent(firstAdded, lastRemoved) {
    return new OneTimeEvent(firstAdded, lastRemoved);
  }
});

