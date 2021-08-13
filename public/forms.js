const form = document.querySelector('form');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    
    let data = new URLSearchParams(new FormData(form));
    sendRequest('/signup', 'POST', data);
})

/**
 * Sends request to route
 * @param {String} route The endpoint to send request to
 * @param {String} method The request method
 * @param {any} data the data to attach to the body header
 * @returns response from server
 */
async function sendRequest(route, method, data) {
    const options = {
        method: method,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : data
    }
   
    let res = await fetch(route, options)
    let json =  res.json(); 

    return json;
}