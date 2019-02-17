'use strict';
const {userinfoget} = require('../models/userinfo.model');

module.exports.userinfoget = function (req, res, next) {
    if (req.params && req.params[0] && req.params[1]) {
        userinfoget(req)
            .then( addresses => res.status(200).send('firstname: ' + req.params[0] + ' lastname: ' + req.params[1] + ' ' +
                'country: ' + addresses[0] + ', city: ' + addresses[1] + ', street: ' + addresses[2]))
            .catch( err => res.status(209).send(err))
    } else {
        res.status(404).send('Page not found');
    }

};