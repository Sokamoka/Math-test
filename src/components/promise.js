/**
 * return a promise which can be resolved or rejected from outside
 */
export function createDeferred() {
  let resolve;
  let reject;

  // eslint-disable-next-line promise/param-names, no-new
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}
