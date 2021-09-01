
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const nedb = require('nedb');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

let db = new nedb({autoload: true, filename: "database.db"});

require('dotenv').config();

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs');
app.listen(port, console.log(`listening on ${port}`));

app.use(express.static('public'));

// ! GET
app.get('/dashboard', auth, (req, res) => {
    res.status(200).json({message: 'success', status: 200}); // render the login page
}) 

app.get('/', (req, res) => {
    res.render('login'); // render the login page
}) 

app.get('/signup', (req, res) => {
    res.render('signup'); // render the login page
}) 

app.get('/login',(req, res) => {
    res.render('login'); // render the login page
})

//! POST REQUESTS
app.post('/register', (req, res) => {
    const data = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        storeUser(db, data, hashedPassword);
        res.status(200).json('success')
    } catch (error) {
        res.status(500).json('Oops! something went wrong :('  + error );
    }
})

app.post('/login', (req, res) => {
    // todo: check if login is valid
    const data = req.body;
    db.findOne({email: data.email}, {}, (err, doc) => {
        console.log(doc)
        if (err) {
            throw new Error('Oops error on DB');
        }

        // if the user is found
        if(doc) {
            // compare
            const passwordValid = bcrypt.compareSync(data.password, doc.password)
            if (passwordValid) {
                //create token 
                const token = createToken('', process.env.JWT_SECRET);
                req.headers.authorization = token;
                console.log(req.headers.authorization)
                res.status(200).json({
                    message: 'login successful',
                    token, status: 200
                })
            } else {
                res.status(200).json({
                    message: 'invalid password',
                    status: 200
                })
            }
        } else {
            res.status(404).json({
                message: 'user with that email not found' ,
                status: 404
            })
        }
    })
})


function createToken(payload, secret) {
    const token = jwt.sign(payload, secret,{expiresIn: '60'});
    return token;
}

function getUserByEmail(email) {
    return db.findOne({email}, (err, doc) => {
        return doc
    })
}

function storeUser(db, data, hashedPassword) {
        // store to database
        db.insert({
            created: Date.now().toString(),
            username: data.name,
            email: data.email,
            password: hashedPassword
        }, (err) => {
            return 'error occured'
        })
}

function auth(req, res, next) {
    try {
    const token = req.headers.authorization
    console.log(token, 'middleware running...')
    console.log(jwt.verify(token, process.env.JWT_SECRET), 'verifying token ...');
    if (jwt.verify(token, process.env.JWT_SECRET)) {
        next();
        console.log('valid')
    }} catch (e) {
        if (e.name == 'JsonWebTokenError') {
            res.status(401).json('Unauthorized - 1' + e);
        } else {
            res.status(401).json('Unauthorized - 2' + e);
        }
    }
}