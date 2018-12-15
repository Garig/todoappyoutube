const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const favicon = require('serve-favicon')

const port = process.env.PORT || 3000;
const hostname = "localhost";

// Database
mongoose.connect('mongodb://localhost/todoapp', {useNewUrlParser: true}).then(() => {
    console.log('Connecté à la base de données')
});

// Template engine
app.set('view engine', 'pug')

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Middleware favicon
app.use('/assets', express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'))

// Routes fichier séparé
const index = require('./routes/index');
app.use('/', index);

app.listen(port, hostname, () => console.log("Serveur lancé sur http://"+hostname+":"+port));