'use strict';
const { userinfoadd, userinfoaddaddress } = require('../models/userinfo.model');
const requiredBodyFields = ['firstname', 'lastname', 'country', 'city', 'street'];
const collections = ['country', 'city', 'street'];

module.exports.userinfoadd = function (req, res, next) {
    if (req.body && typeof req.body == "object") {
        for (const key of requiredBodyFields) {
            if (!(key in req.body)) {
                res.status(406).send('Field ' + key + ' is empty!');
            }
        }
        userinfoadd(req, res);
    } else {
        res.status(406).send('Empty body');
    }
};

module.exports.userinfoaddaddress = function (req, res, next) {
    let message = '';
    if (req.body.collection && ~collections.indexOf(req.body.collection)) {
        message = 'Success add to collection ' + req.body.collection;
        userinfoaddaddress(req.body);
    } else {
        message = "No such collection. Don\'t add to database!"
    }
    res.render('index', {title: message});
};