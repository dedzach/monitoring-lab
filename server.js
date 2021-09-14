const express = require("expess");
const { appendFile } = require("fs");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "fill this in with something later",
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file server success!");
})

const port = process.env.PORT || 4444;

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`Server up and running on ${port}!`);
})