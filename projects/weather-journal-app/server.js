// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('./node_modules/express');

// Start up an instance of app
const app = express();
//C:\Users\betom\Desktop\fend\projects\weather-journal-app\node_modules
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('./node_modules/body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('./node_modules/cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
// Set up get route.
app.get('/all', function(req, res) {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  const newProjectData = {temp: req.body.temp, date: req.body.date, user_response: req.body.user_response};
  projectData.push(newProjectData);
  res.send({});
  console.log(newProjectData);
  console.log(projectData);
});
