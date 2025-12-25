// Part1: Core Modules ( 1.5 Grades)

// 1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// • Input Example: "./big.txt"
// • Output Example: log each chunk

// Answer:

// const fs = require("fs");
// function readFileInChunks(path) {
//   const stream = fs.createReadStream(path, {
//     encoding: "utf8",
//     highWaterMark: 5
//   });
//   stream.on("data", (chunk) => {
//     console.log("Chunk:", chunk);
//   });
//   stream.on("end", () => {
//     console.log("Finished reading file");
//   });
//   stream.on("error", (err) => {
//     console.error("Error reading file:", err.message);
//   });
// }
// readFileInChunks("./big.txt");
// --------------------------------------------------------------------------

// 2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// • Input Example: "./source.txt", "./dest.txt"
// • Output Example: File copied using streams

// Answer:

// const fs = require("fs");
// function copyFileUsingStreams(source, destination) {
//   const readableStream = fs.createReadStream(source);
//   const writableStream = fs.createWriteStream(destination);
//   readableStream.pipe(writableStream);
//   writableStream.on("finish", () => {
//     console.log("File copied using streams");
//   });
//   readableStream.on("error", (err) => {
//     console.error("Read error:", err.message);
//   });
//   writableStream.on("error", (err) => {
//     console.error("Write error:", err.message);
//   });
// }
// copyFileUsingStreams("./source.txt", "./dest.txt");
// --------------------------------------------------------------------------

// 3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// • Input Example: "./data.txt", "./data.txt.gz"

// Answer:

// const fs = require("fs");
// const zlib = require("zlib");
// const { pipeline } = require("stream");
// function compressFile(input, output) {
//   pipeline(
//     fs.createReadStream(input),
//     zlib.createGzip(),
//     fs.createWriteStream(output),
//     (err) => {
//       if (err) {
//         console.error("Pipeline failed:", err.message);
//       } else {
//         console.log("File compressed successfully");
//       }
//     }
//   );
// }
// compressFile("./data.txt", "./data.txt.gz");
// --------------------------------------------------------------------------

// Part2: Simple CRUD Operations Using HTTP ( 5.5 Grades):
// For allthe following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json).
// Do not store or manage data using arrays (0.5 Grades).

const http = require("http");
const fs = require("fs");

// 1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before) (1 Grade)
// o URL: POST /user

// Answer:

const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/users") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const newUser = JSON.parse(body);
//       fs.readFile("users.json", "utf8", (err, data) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ message: "Server error" }));
//         }
//         const fileData = JSON.parse(data);
//         const emailExists = fileData.users.some(
//           (user) => user.email === newUser.email
//         );
//         if (emailExists) {
//           res.writeHead(400, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ message: "Email already exists." }));
//         }
//         fileData.users.push(newUser);
//         fs.writeFile(
//           "users.json",
//           JSON.stringify(fileData, null, 2),
//           (err) => {
//             if (err) {
//               res.writeHead(500, { "Content-Type": "application/json" });
//               return res.end(JSON.stringify({ message: "Write error" }));
//             }
//             res.writeHead(201, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({ message: "User added successfully." })
//             );
//           }
//         );
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Invalid URL or METHOD" }));
//   }
// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
// --------------------------------------------------------------------------

// 2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL (1 Grade)
// Note: Remember to update the corresponding values in the JSON file
// o URL: PATCH /user/id

// Answer:

//   const cleanUrl = req.url.trim();
//   if (req.method === "PATCH" && cleanUrl.startsWith("/student/")) {
//     const id = parseInt(cleanUrl.split("/")[2]);
//     let body = "";
//     req.on("data", chunk => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const updatedData = JSON.parse(body);
//       fs.readFile("students.json", "utf8", (err, data) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ message: "Server error" }));
//         }
//         const fileData = JSON.parse(data);
//         const studentIndex = fileData.students.findIndex(
//           student => student.id === id
//         );
//         if (studentIndex === -1) {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           return res.end(
//             JSON.stringify({ message: "Student ID not found." })
//           );
//         }
//         if (updatedData.name !== undefined)
//           fileData.students[studentIndex].name = updatedData.name;

//         if (updatedData.age !== undefined)
//           fileData.students[studentIndex].age = updatedData.age;

//         if (updatedData.email !== undefined)
//           fileData.students[studentIndex].email = updatedData.email;
//         fs.writeFile(
//           "students.json",
//           JSON.stringify(fileData, null, 2),
//           err => {
//             if (err) {
//               res.writeHead(500, { "Content-Type": "application/json" });
//               return res.end(
//                 JSON.stringify({ message: "Write error" })
//               );
//             }
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(
//               JSON.stringify({
//                 message: "User age updated successfully."
//               })
//             );
//           }
//         );
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "User ID not found." }));
//   }
// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
// --------------------------------------------------------------------------

// 3. Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
// Note: Remember to delete the user from the file
// o URL: DELETE /user/id

// Answer:

// const url = require("url");
// const FILE_PATH = "./customers.json";
//   const parsedUrl = url.parse(req.url, true);
//   const method = req.method;
//   const path = parsedUrl.pathname;
//   if (method === "DELETE" && path.startsWith("/customer/")) {
//     const id = parseInt(path.split("/")[2]);
//     const data = fs.readFileSync(FILE_PATH, "utf8");
//     let customers = JSON.parse(data);
//     const index = customers.findIndex(c => c.id === id);
//     res.setHeader("Content-Type", "application/json");
//     if (index === -1) {
//       res.end(JSON.stringify({ message: "Customer ID not found." }));
//       return;
//     }
//     customers.splice(index, 1);
//     fs.writeFileSync(FILE_PATH, JSON.stringify(customers, null, 2));
//     res.end(JSON.stringify({ message: "Customer deleted successfully." }));
//   } else {
//     res.statusCode = 404;
//     res.end("Route not found");
//   }
// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
// --------------------------------------------------------------------------

// 4. Create an API that gets all users from the JSON file. (1 Grade)
// o URL: GET /user

// Answer:

// const url = require("url");
//   const parsedUrl = url.parse(req.url, true);
//   const method = req.method;
//   const path = parsedUrl.pathname;
//   if (method === "GET" && path === "/employee") {
//     const data = fs.readFileSync("employees.json", "utf8");
//     const employees = JSON.parse(data);
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify(employees));
//   } else {
//     res.statusCode = 404;
//     res.end("Route not found");
//   }
// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
// --------------------------------------------------------------------------

// 5. Create an API that gets User by ID. (1 Grade)
// o URL: GET /user/:id

// Answer:

//   if (req.method === "GET") {
//     const urlParts = req.url.split("/");
//     if (urlParts[1] === "client" && urlParts[2]) {
//       const clientId = parseInt(urlParts[2]);
//       fs.readFile("clients.json", "utf8", (err, data) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ message: "Server error" }));
//           return;
//         }
//         const clients = JSON.parse(data);
//         const client = clients.find(c => c.id === clientId);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         if (client) {
//           res.end(JSON.stringify(client));
//         } else {
//           res.end(JSON.stringify({ message: "Client not found." }));
//         }
//       });
//     } else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "Invalid route" }));
//     }
//   } else {
//     res.writeHead(405, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Method not allowed" }));
//   }
});
// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
// --------------------------------------------------------------------------

// Part3: Node Internals (3 Grades):

// 1. What is the Node.js Event Loop? (0.5 Grade)

// Answer:

// The Node.js Event Loop is a mechanism that allows Node.js to handle asynchronous operations using a single thread by executing callbacks when tasks are completed
// --------------------------------------------------------------------------

// 2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)

// Answer:

// Libuv is a C library used by Node.js to manage the event loop and handle asynchronous operations such as file system, timers, and networking
// --------------------------------------------------------------------------

// 3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)

// Answer:

// Node.js handles asynchronous operations by offloading them to Libuv, which executes them in the background and uses the event loop to run their callbacks without blocking the main thread
// --------------------------------------------------------------------------

// 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)

// Answer:

// Call Stack: Executes synchronous code and keeps track of function calls
// Event Queue: Stores callbacks from completed asynchronous operations
// Event Loop: Monitors the call stack and moves tasks from the event queue to the stack when it is empty
// --------------------------------------------------------------------------

// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)

// Answer:

// Node.js Thread Pool: A set of worker threads managed by Libuv to handle heavy asynchronous tasks such as file system operations and cryptography without blocking the main thread

// Setting Thread Pool Size: The size can be set using the UV_THREADPOOL_SIZE environment variable before running the Node.js application
// --------------------------------------------------------------------------

// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)

// Answer:

// Blocking Code: Blocks the call stack and prevents Node.js from handling other requests until the operation completes

// Non-Blocking Code: Offloads operations to Libuv to run asynchronously and uses the event loop to handle results without blocking the main thread