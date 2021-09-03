window.onload = () => {

    let loader = document.querySelector('.loader-container');
    
    fetch('/api/dashboard', {
        headers: {
            Authorization: localStorage.getItem('jwtlwpToken')
        }
    }).then(res => {
        res.json().then(json => {
            if (json.status === 200) {
                // hide loade after 1 second of response code 200
                setTimeout(() => {
                    loader.classList.add('hide');
                }, 1000)
            } else { // token is expired or invalid
                // delete token
                localStorage.removeItem('jwtlwpToken');
                location.assign('/login'); // go to login
            }
    
        })
    })

}