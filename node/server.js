const express = require("express");
const path = require("path");
const fs= require('fs');

//middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/calculate", (req, res) => {
    const { operation, num1, num2 } = req.body;
    let result;
    if (operation === "add") {
        result = parseFloat(num1) + parseFloat(num2);
        console.log(result);
        res.send(`The result after addition is: ${result}`);
        let data = "the result written in the file is: " +result.toString();   
        fs.writeFileSync("result.txt",data, (err)=>{
            if (err) {
                console.error("Error writing to file:", err);
              } else {
                console.log("File created successfully!");
              }
        });
        res.download('result.txt');
    } else if (operation === "subtract") {
        result = parseFloat(num1) - parseFloat(num2);
        res.send(`The result after subtraction is: ${result}`);
        console.log(result);
        let data = result.toString();
        fs.writeFileSync("result.txt",data, (err)=>{
            if (err) {
                console.error("Error writing to file:", err);
              } else {
                console.log("File created successfully!");
              }
        });

        res.download('result.txt');

    }
    else if (operation === "multiply") {
        result = parseFloat(num1) * parseFloat(num2);
        res.send(`The result after multiplication is: ${result}`);
        console.log(result)
    }   
    else if(operation === "download")  {
       res.download('image.jpg');
    }
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
