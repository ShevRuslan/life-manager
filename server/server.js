// require('./db');
const express = require('express');


const app = express();

app.listen(3001, () => {
    console.log('We are live on ' + 3001);
});

app.get('/api/users', (request, response) => {
    const users = [
        {
            name: 'Kirill'
        },
        {
            name: 'Ruslan'
        },
        {
            name: 'Denis'
        }
    ];
    response.send(users);
})

   