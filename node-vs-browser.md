# Day 52 - Homework: What does Node.js do that a browser does not?

Node.js and browsers both run JavaScript, but they serve different purposes and have different capabilities:

## Key Differences

### 1. **File System Access**
Node.js can read, write, create, and delete files on the server's file system using the `fs` module. Browsers cannot directly access the user's file system for security reasons - they can only read files that the user explicitly selects through file input dialogs.

### 2. **Network Server Capabilities**
Node.js can create servers that listen on network ports and handle incoming HTTP requests. It can act as a web server, API server, or any other type of network service. Browsers are clients - they make requests to servers but cannot themselves act as servers.

### 3. **Operating System Integration**
Node.js can interact with the operating system - it can spawn child processes, access environment variables, work with streams, and execute system commands. Browsers are sandboxed and have limited access to OS features.

### 4. **No DOM or Browser APIs**
Node.js does not have access to browser-specific APIs like the DOM, window object, localStorage, or canvas. It's designed for server-side operations, not for manipulating web pages.

### 5. **Event Loop for I/O**
While both use an event loop, Node.js's event loop is optimized for non-blocking I/O operations on the server - handling thousands of concurrent connections efficiently. Browsers use their event loop primarily for UI rendering and user interactions.

### 6. **Module System**
Node.js uses CommonJS (require/module.exports) or ES modules, with access to npm's vast ecosystem of server-side packages. Browsers have limited module support and cannot use many Node-specific packages.

## Summary
Node.js extends JavaScript beyond the browser by providing server-side capabilities: file system access, network server functionality, OS integration, and a package ecosystem optimized for backend operations. This makes JavaScript a full-stack language capable of handling both frontend and backend development.
