
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
  this._handlers = [];
  this._handlersSet = {};
  this._count = 0;

  this._firstAdded = firstAdded;
  this._lastRemoved = lastRemoved;
  this.pub = new OneTimeEventPub(this);
}
OneTimeEvent.prototype.fire = function fire() {
  var currentHandlers = this._handlers;
  var currentHandlersSet = this._handlersSet;
  this._handlers = [];
  this._handlersSet = {};
  if (this._count === 0) {
    return;
  }
  this._count = 0;
  var l = currentHandlers.length;
  for (var i = 0; i < l; ++i) {
    var handler = currentHandlers[i];
    if (currentHandlersSet[handler] === 1) {
      handler.apply(undefined, arguments);
    }
  }
};
OneTimeEvent.prototype.isEmpty = function isEmpty() {
  return this._count === 0;
};
OneTimeEvent.prototype.addHandler = function addHandler(handler) {
  if (!handler) {
    throw 'handler must be a function.';
  }
  var handlersSetEntry = this._handlersSet[handler];
  if (handlersSetEntry === 1) {
    return;
  }
  if (handlersSetEntry !== 2) {
    this._handlers.push(handler);
  }  
  this._handlersSet[handler] = 1;
  ++this._count;
  if (this._firstAdded && this._count === 1) {
    this._firstAdded();
  }
};
OneTimeEvent.prototype.removeHandler = function removeHandler(handler) {
  if (!handler) {
    throw 'handler must be a function.';
  }
  var handlersSetEntry = this._handlersSet[handler];
  if (handlersSetEntry === 1) {
    --this._count;
    this._handlersSet[handler] = 2;
    if (this._lastRemoved && this._count === 0) {
      this._lastRemoved();
    }
  }
};

export function newOneTimeEvent(firstAdded, lastRemoved) {
  return new OneTimeEvent(firstAdded, lastRemoved);
}
