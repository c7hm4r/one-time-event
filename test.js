
import { newOneTimeEvent } from './oneTimeEvent.js';
import test from 'tape';

test('it works', (t) => {
  let firstAddedPasses = 0;
  let lastRemovedPasses = 0;
  let handler0Passes = 0;
  let handler1Passes = 0;
  let handler0Args;
  let handler1Args;

  const handler0 = function() {
    handler0Args = Array.prototype.slice.call(arguments);
    handler0Passes++;
  };
  const handler1 = function() {
    handler1Args = Array.prototype.slice.call(arguments);
    handler1Passes++;
  };

  const e = newOneTimeEvent(() => {
    firstAddedPasses++;
  }, () => {
    lastRemovedPasses++;
  });

  t.ok(e.isEmpty());

  t.equals(firstAddedPasses, 0, 'Nr. 1');
  e.pub.addHandler(handler0);
  t.equals(firstAddedPasses, 1, 'Nr. 2');
  t.notOk(e.isEmpty());
  e.pub.addHandler(handler0);
  e.pub.addHandler(handler0);
  e.pub.addHandler(handler0);

  e.fire('x', 'y');
  t.equals(handler0Passes, 1, 'Nr. 3');
  t.deepEquals(handler0Args, ['x', 'y'], 'Nr. 4');

  t.equals(firstAddedPasses, 1, 'Nr. 5');
  e.pub.addHandler(handler1);
  t.equals(firstAddedPasses, 2, 'Nr. 6');
  e.pub.addHandler(handler1);
  e.pub.addHandler(handler0);
  e.pub.addHandler(handler0);
  e.pub.removeHandler(handler1);

  t.equals(lastRemovedPasses, 0, 'Nr. 7');
  e.pub.removeHandler(handler0);
  t.equals(lastRemovedPasses, 1, 'Nr. 8');

  e.fire('A');
  t.equals(handler1Passes, 0, 'Nr. 9');
  t.equals(handler0Passes, 1, 'Nr. 10');
  t.equals(firstAddedPasses, 2, 'Nr. 11');
  t.equals(lastRemovedPasses, 1, 'Nr. 12');
  t.end();
});
