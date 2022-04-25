const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.json()) //allow the access to the object using req.body = require()

app.use(cors());

const jobschedule = require('./src/routes/getJobSchRoute')
app.use('/', jobschedule);


app.listen('5005', () => {
    console.log('connnected to port 5005...')
})