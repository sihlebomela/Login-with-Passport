//! this file is for accessing useful function

// function for creating token
function createToken(payload, secret, expiresIn = '1d') { // token expires in one day by default
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