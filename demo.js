// var newOneTimeEvent = require('one-time-event').newOneTimeEvent;
import { newOneTimeEvent } from './oneTimeEvent.js';

const log = console.log.bind(console);
const log2 = () => log('log2 called');

const event = newOneTimeEvent();

// pub can be exposed
event.pub.addHandler(log);
event.fire(1, 2);
  // Console: 1 2

event.pub.addHandler(log);
event.pub.addHandler(log2);
event.fire(1, 2);
  // Console: 1 2
  // Console: log2 called
event.fire(1, 2);
  // Nothing happens.


event.pub.addHandler(log);
event.pub.addHandler(log);
event.pub.removeHandler(log);
log(event.isEmpty)
  // Console: true
event.fire('X', 'Y');
  // Nothing happens.

// Handle when the first handler is added or the last is removed.
// May be used to lazily register in other events which may trigger the event.
let fireEvent2;
const event2 = newOneTimeEvent(() => {
  log('first handler added');
  event.pub.addHandler(fireEvent2);
}, () => {
  log('last removed');
  event.pub.removeHandler(fireEvent2);
});
fireEvent2 = event2.fire.bind(event2);

event2.addHandler(log);
event.fire(3);
  // Console: 3

