const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const nedb = require('nedb');

const port = process.env.PORT || 3000;

let db = new nedb({autoload: true, filename: "database.db"});

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

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
        res.redirect('/register');
    }

})

app.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
    res.status(200).json('hello!')
})