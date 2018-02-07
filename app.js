var express = require('express');
var bodyParser = require('body-parser');
var UserRepository = require('./src/repository/UserRepository');
var User = require('./src/model/User');
var db = require('./src/Db');
const uuidv4 = require('uuid/v4');
var app = express();
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app
    .route('/user/:id?')

    // Récupération d'un utilisateur
    .get(function (req, res) {
        var id = req.params.id;

        /**
         * Implémenter ce controlleur afin qu'il rechereche en base de donnée l'utilisateur par son ID et le retourne
         * sous format json au client.(voir le controlleur .post)
         */

        var repository = new UserRepository(db);
        var user = repository.findOneById(id);
        res.header("Access-Control-Allow-Origin", "*");

        res.send(user);
    })

    // Creation d'un utilisateur
    .post(function (req, res) {
        //req.body.name
        var user = new User();
        user.id = uuidv4();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.birthday = req.body.birthday;

        var repository = new UserRepository(db);
        repository.create(user);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(user)
    })

    //mise à jour d'un utilisateur
    .put(function (req, res) {

        /**
         * Implémenter le controlleur
         */
        var repository = new UserRepository(db);
        var user = new User();
        user.id = req.body.id;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.birthday = req.body.birthday;

        repository.update(user);
        res.header("Access-Control-Allow-Origin", "*");

        res.send(user);
    })

    //suppression d'un utilisateur
    .delete(function (req, res) {
        /**
         * Implémenter le controlleur
         */

        res.send('Not implemented');
    });


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});