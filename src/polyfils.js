 
 
//var  globalThis = require('globalthis')();

console.log('work');
  const getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };
  
  var globalThis = getGlobal();
  
  if (typeof globalThis.setTimeout !== 'function') {
    // no setTimeout in this environment! 
  }