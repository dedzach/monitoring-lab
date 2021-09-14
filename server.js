const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "ea6f594bbb614999ad553967a21ba9d0",
    captureUncaught: true,
    captureUnhandledRejections: true
})

rollbar.log("I am saved!")

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file server success!");
})

const port = process.env.PORT || 4444;

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`Server up and running on ${port}!`);
})

try {
    nonExistentFunction();
} catch (error) {
    console.error(error);
}