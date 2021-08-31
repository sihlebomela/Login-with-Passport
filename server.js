if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const nedb = require('nedb');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const { session } = require('passport');
const port = process.env.PORT || 3000;

let db = new nedb({autoload: true, filename: "database.db"});
initializePassport.initialize(passport, db.findOne({email}, (err, doc) => {return doc.email}))

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session());

app.set('view engine', 'ejs');
app.listen(port, console.log(`listening on ${port}`));

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('login'); // render the login page
}) 

app.get('/signup', (req, res) => {
    res.render('signup'); // render the login page
}) 

app.get('/login', (req, res) => {
    res.render('login'); // render the login page
}) 

app.post('/signup', async(req, res) => {
    const data = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        // store to database
        db.insert({
            created: Date.now().toString(),
            user: data.name,
            password: hashedPassword
        }, (err) => {
            return 'error occured'
        })
        res.redirect('/login'); 
    } catch (error) {
        res.status(500).json('a server error occured');
    }

})

app.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
    res.status(200).json('hello!')
})