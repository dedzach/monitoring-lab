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
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file server success!");
})

const port = process.env.PORT || 4444;

app.use(rollbar.errorHandler());

app.listen(port, () => {
    console.log(`Server up and running on ${port}!`);
})

// const students = [];


app.get('/api/spongebob', (req, res) => {
    try { 
        notAFunction();
    } catch (error) {
        rollbar.error('error');
    }
})

// app.get('/api/student', (req, res)=>{
//     let {name} = req.body
//     name = name.trim()

//     const index = students.findIndex(studentName=> studentName === name)

//     if(index === -1 && name !== ''){
//         students.push(name)
//         rollbar.log('Student added successfully', {author: 'Jeddy', type: 'manual entry'})
//         res.status(200).send(students)
//     } else if (name === ''){
//         rollbar.error('No name given')
//         res.status(400).send('must provide a name.')
//     } else {
//         rollbar.error('student already exists')
//         res.status(400).send('that student already exists')
//     }

// })
