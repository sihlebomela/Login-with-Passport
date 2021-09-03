sendRequest('/api/dashboard', 'GET', '', localStorage.getItem('jwtlwpToken')).then((res) => {

}).catch((err) => {
    console.log('an error occured: ', err)
})

/**
 * Sends request to route
 * @param {String} route The endpoint to send request to
 * @param {String} method The request method
 * @param {any} data the data to attach to the body header
 * @param {String} authToken the token to be attached on the authorization header to access secure route
 * @returns response from server
 */
 async function sendRequest(route, method, data, authToken = '') {
    const options = {
        method: method,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : data,
        authorization: authToken
    }
   
    let res = await fetch(route, options)
    let json =  res.json(); 

    return json;
}