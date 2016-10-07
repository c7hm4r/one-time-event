class OneTimeEventPub {
  constructor(priv) {
    this._priv = priv;
  }
  addHandler(handler) {
    this._priv.addHandler(handler);
  }
  removeHandler(handler) {
    this._priv.removeHandler(handler);
  }
}

class OneTimeEvent {
  constructor(firstAdded, lastRemoved) {
    this._handlers = new Set();
    this._firstAdded = firstAdded;
    this._lastRemoved = lastRemoved;
    this.pub = new OneTimeEventPub(this);
  }
  fire(...args) {
    var currentHandlers = this._handlers;
    this._handlers = new Set();
    for (const handler of currentHandlers) {
      handler(...args);
    }
  }
  get isEmpty() {
    return this._handlers.size === 0;
  }
  addHandler(handler) {
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
  removeHandler(handler) {
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
  }
}

export function newOneTimeEvent(firstAdded = false, lastRemoved = false) {
  return new OneTimeEvent(firstAdded, lastRemoved);
}
