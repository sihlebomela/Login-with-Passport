//! this file is for accessing useful function

const jwt = require('jsonwebtoken');

// function for creating token
export function createToken(payload, secret, expiresIn = '1d') { // token expires in one day by default
    const token = jwt.sign(payload, secret, {
        algorithm: process.env.JWT_ALGO,
        expiresIn,
    });
    return token;
}

export function getUserByEmail(email) {
    return db.findOne({
        email
    }, (err, doc) => {
        return doc
    })
}

export function storeUser(db, data, hashedPassword) {
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