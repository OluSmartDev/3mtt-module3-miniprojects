// compute.js
function heavyComputation(callback) {
    // Simulate a CPU-heavy task (e.g., Fibonacci or a long loop)
    let result = 0;
    for (let i = 1; i <= 1e7; i++) {
      result += i;
    }
    callback(result);
  }
  
  module.exports = { heavyComputation };
  