//middleware function for protecting route and validating jwt 
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    // if there is no token
    if (token == undefined || token == 'undefined') {
        return res.redirect('/login?error=' + encodeURIComponent('login_to_access_your_dashboard'));
    } else {
        try {
            // get token depending on how it is sent to the server
            const token = req.headers.authorization.split(' ').indexOf('Bearer') != -1 ? req.headers.authorization.split(' ')[1] : req.headers.authorization;

            // verify
            jwt.verify(token, process.env.JWT_SECRET);
            console.log('success');
            next(); // should lead here if it all went well

        } catch (e) {

            // error occured with the token or the code could not process token
            if (e.name == 'JsonWebTokenError') {
                console.log('an error occured with jwt: ', e.message)
                return res.status(400).json({
                    message: 'please login',
                    status: 400
                });

                // if token expired
            } else if (e.name == 'TokenExpiredError') {
                console.log('token expired: ', e.expiredAt)
                return res.status(400).json({
                    message: 'please login',
                    status: 400
                });
            } else {
                console.log('unknown error occured: ', e)
                return res.status(400).json({
                    message: 'oppsie! error occured, please try again later...',
                    status: 400
                });
            }
        }
    }
}

module.exports = authenticateToken;