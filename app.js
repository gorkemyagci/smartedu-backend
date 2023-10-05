const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

mongoose.connect('mongodb://localhost:27017/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/smartedu-db'
    }),
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
}));

// Global Variable

global.userIN = null;

const port = 3000;

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});