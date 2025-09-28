//your JS code here. If required.
const output = document.getElementById("output");

// 1️⃣ Show initial loading row
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
output.appendChild(loadingRow);

// 2️⃣ Helper function to create a promise with random delay
function createPromise(promiseName) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2 + 1; // between 1 and 3 seconds
    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      const timeTaken = ((end - start) / 1000).toFixed(3);
      resolve({ name: promiseName, time: timeTaken });
    }, delay * 1000);
  });
}

// 3️⃣ Create the 3 promises
const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

// 4️⃣ Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
  // Remove the loading row
  output.innerHTML = "";

  // Append each result row
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
    output.appendChild(row);
  });

  // Calculate total time taken (max of all times)
  const maxTime = Math.max(...results.map((r) => parseFloat(r.time))).toFixed(3);
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${maxTime}</td>`;
  output.appendChild(totalRow);
});

