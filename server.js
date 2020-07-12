const express = require('express');
const path = require('path');

const app = express();

const hbs = require('express-handlebars');

app.engine('hbs', hbs());
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.use('/user', (req, res, next) => {
    res.show('forbidden.html');
    next();
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: false, name: req.params.name });
});

app.get('/', (req, res) => {
    res.render('home', { layout: false });
});

app.get('/about', (req, res) => {
    res.render('about', { layout: false });
});

app.get('/404.png', (req, res) => {
    res.sendFile(path.join(__dirname, '/404.png'));
});

app.use((req, res) => {
    res.status(404).show('404.html');
});

app.listen(5000, () => {
    console.log('Server is running on port: 5000');
});