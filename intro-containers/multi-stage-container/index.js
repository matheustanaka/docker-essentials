const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("<h1>Hello from my container</h1>");
})

const port = 3333;

app.listen(port, () => console.log("Listening on port 3333"));
