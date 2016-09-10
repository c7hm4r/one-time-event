
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

  t.equals(firstAddedPasses, 0, 'Nr. 1');
  e.pub.addHandler(handler0);
  t.equals(firstAddedPasses, 1, 'Nr. 2');
  e.pub.addHandler(handler0);
  e.pub.addHandler(handler0);
  e.pub.addHandler(handler0);

  e.fire('x', 'y');
  t.equals(handler0Passes, 1, 'Nr. 3');
  t.deepEquals(handler0Args, ['x', 'y'], 'Nr. 4');

  t.equals(firstAddedPasses, 1, 'Nr. 4.5');
  e.pub.addHandler(handler1);
  t.equals(firstAddedPasses, 2, 'Nr. 4.8');
  e.pub.addHandler(handler1);
  e.pub.addHandler(handler0);
  e.pub.addHandler(handler0);
  e.pub.removeHandler(handler1);

  t.equals(lastRemovedPasses, 0, 'Nr. 14');
  e.pub.removeHandler(handler0);
  t.equals(lastRemovedPasses, 1, 'Nr. 15');

  e.fire('A');
  t.equals(handler1Passes, 0, 'Nr. 16');
  t.equals(handler0Passes, 1, 'Nr. 17');
  t.equals(firstAddedPasses, 2, 'Nr. 18');
  t.equals(lastRemovedPasses, 1, 'Nr. 19');
  t.end();
});
