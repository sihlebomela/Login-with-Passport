//middleware function for protecting route and validating jwt 
export function auth(req, res, next) {
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
                console.log('an error occured with jwt :', e.message)
                return res.redirect(400, '/login?error=' + encodeURIComponent('just_gotta_login'));
                // res.status(401).json('Unauthorized - 1 ' + e);
                console.log('error occured 1', e);

                // if token expired
            } else if (e.name == 'TokenExpiredError') {
                console.log('token expired user sent to login..')
                return res.redirect(400, '/login?error=' + encodeURIComponent('session_expired_just_gotta_login'));
            } else {
                return res.redirect('/login?error=' + encodeURIComponent('please_login'));
                // res.status(401).json('Unauthorized - 2 ' + e);
            }
        }
    }
}

module.exports = auth;