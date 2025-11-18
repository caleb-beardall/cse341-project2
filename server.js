const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const error = require('./middleware/error');

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

// Catch 500 errors
app.use(error);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listenting on port ${port}.`);
    }
});

