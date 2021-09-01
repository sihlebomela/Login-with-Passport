import { sendRequest } from './forms';

sendRequest('/dashboard', 'GET', '', localStorage.getItem('lwpToken')).then((res) => {
    
}).catch((err) => {
    console.log('an error occured: ', err)
})