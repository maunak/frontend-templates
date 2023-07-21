const fs = require('fs');
 let data = "Hello this is a file !";
fs.writeFileSync('Hello.txt', data);
console.log("file written successfully.")