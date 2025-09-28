const output = document.getElementById("output");

// ✅ Helper function to simulate a promise that resolves after 1–3 seconds
function createPromise(promiseName) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2 + 1; // Between 1 and 3 seconds
    const startTime = performance.now();

    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(3);
      resolve({ name: promiseName, time: timeTaken });
    }, delay * 1000);
  });
}

// ✅ Create three promises
const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

// ✅ Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
  // Remove the loading row
  const loadingRow = document.getElementById("loading");
  if (loadingRow) {
    loadingRow.remove();
  }

  // Add each promise's result to the table
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
    output.appendChild(row);
  });

  // Calculate and display the total time (maximum of the 3)
  const totalTime = Math.max(...results.map(r => parseFloat(r.time))).toFixed(3);
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
  output.appendChild(totalRow);
});
