//! this file is for accessing useful function

const jwt = require('jsonwebtoken');

// function for creating token
function createToken(payload, secret, expiresIn = '600000') { // token expires in 10min  by default
    const token = jwt.sign(payload, secret, {
        algorithm: process.env.JWT_ALGO,
        expiresIn,
    });
    return token;
}

function getUserByEmail(email) {
    return db.findOne({
        email
    }, (err, doc) => {
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

module.exports = {
    createToken,
    getUserByEmail,
    storeUser
}