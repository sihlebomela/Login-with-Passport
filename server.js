const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.listen(port, console.log(`listening on ${port}`));

app.get('/', (req, res) => {
    res.render('index'); // render the login page
}) 