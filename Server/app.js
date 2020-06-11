import createError from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import cors from './config/cors';
import path from 'path';
import indexRouter from './routes/index';


// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign


// Set up the express app
const app = express();

app.use(cors.permission);

app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({limit: '150mb'}))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //next(createError(404));
    res.end("404 not found");
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
