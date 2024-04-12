const express = require('express');
require('dotenv').config();
const path = require('path');
const { port } = require('./config');
const cron = require('node-cron');
const fs = require('fs');
const {inquirylogic} = require('../src/services/inquirylogic');
const {buyleadlogic} = require('../src/services/buyleadlogic');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

cron.schedule('*/10 * * * * *', () => {
  console.log('Running a task every 10 seconds');
  inquirylogic();
  buyleadlogic();
});


app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-data', (req, res) => {
   const jsonData = JSON.stringify(req.body, null, 2);
  console.log(jsonData); 
  fs.writeFile('src/data.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing data.json:', err);
      res.status(500).send('Error writing data');
    } else {
      console.log('Data successfully written to data.json');
      res.status(200).send('Data saved successfully');
    }
  });

});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
