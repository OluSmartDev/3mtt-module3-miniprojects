# Node.js Scalable API Demo

This project demonstrates Node.js's capability to handle **multiple concurrent connections** efficiently using its **non-blocking, event-driven architecture**.  
It implements a simple HTTP server with an endpoint `/compute` that performs a CPU-intensive operation to simulate real-world API computation.

---

## 🔧 Code Implementation Explanation

### `server.js`
- Creates an HTTP server using Node's built-in `http` module.
- Listens on port 3000 (default).
- Handles `/compute` requests by calling a simulated heavy computation.
- Returns the result as JSON.

### `compute.js`
- Contains a CPU-bound task simulated with a large loop summing numbers from 1 to 10 million.
- In a real-world scenario, this could represent data processing, encryption, or image processing.

---

## ▶️ How to Run the Application

### Prerequisites
- Node.js v14 or later installed.

### Steps

1. Clone the repository:

   ```
   git clone https://github.com/OluSmartDev/3mtt-module3-miniprojects.git
   cd 3mtt-module3-miniprojects/01-scalable-nodejs-app
   ```
2. Run the Server:

   ```
   node server.js
   ```

3. Make requests to the API:  
    Visit http://localhost:3000/compute in your browser or use curl in your CLI:

   ```
   curl http://localhost:3000/compute
   ```

## 📈 Performance Metrics & Scalability Test

### Benchmarking with autocannon

#### Install autocannon:
```
npm install -g autocannon
```
#### Run a Load test:
```
autocannon -c 100 -d 10 http://localhost:3000/compute
```

#### Sample Output:  
```
Running 10s test @ http://localhost:3000/compute
100 connections

Stat         Avg     Stdev   Max
Latency (ms) 120     15      180
Req/Sec      800     30      850
Bytes/Sec    180 kB  20 kB   220 kB

64000 requests in 10s, 1.8 MB read
```

## What it Demonstrates:
- Node.js handles multiple concurrent requests with relatively low latency.

- While the event loop is single-threaded, non-blocking IO (e.g., file access, DB calls) allows thousands of simultaneous connections.

 - For CPU-bound operations, Node can be paired with clustering or worker threads (not shown here) for scaling further.


