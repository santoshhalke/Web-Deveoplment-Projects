const express = require('express');
const app = express();
const conn = require('./config/dbConnect');
const urlRoutes = require('./routes/url');
const port = 3000;

//connecting to mongodb
conn("mongodb://localhost:27017/urlShortner");

// middleware for json parsing
app.use(express.json());

app.use('/api/url', urlRoutes);

app.listen(port, () => {
    console.log('Server started..');
});