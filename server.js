// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require("express");

// setting constants for parsing and managing cors
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 8000;
const serverListen = () => {
  console.log(`running on localhost: ${port}`);
};
const server = app.listen(port, serverListen);

// GET route will projectData
const returnProjectData = (request, response) => {
  console.log(projectData);
  response.send(projectData);
};

app.get("/all", returnProjectData);

// POST route will add received data to ProjectData
const addProjectData = (request, response) => {
  newEntry = {
    temperature: request.body.temperature,
    date: request.body.date,
    userResponse: request.body.userResponse
  };

  projectData.unshift(newEntry);
};

app.post("/add", addProjectData);
