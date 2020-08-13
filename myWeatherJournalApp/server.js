// Setup empty JS Array to act as endpoint for all routes
projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup local Server
const port = 3000 ;

// Spin up the server
const server = app.listen(port ,  listening );

// Callback to debug
function listening() {
    console.log(`running on localhost : ${port}`);
};

// Initialize all route with a callback function

// Callback function to complete GET '/allData'
app.get('/allData', function (req, res) {
    res.send(projectData);
    projectData=[];
});

// Post Route
app.post('/addData', addData);

function addData(req,res){

  newEntry = {
    date : req.body.date,
    temp : req.body.temp,
    content : req.body.content
  }
  projectData.push(newEntry);
  console.log(projectData);
}