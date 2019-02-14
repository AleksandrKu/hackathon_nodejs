'use strict';
const {userinfoget} = require('../models/userinfo.model');

module.exports.userinfoget = function (req, res, next) {
    if (req.params && req.params[0] && req.params[1]) {
        userinfoget(req, res);
    } else {
        res.status(404).send('Page not found');
    }

};