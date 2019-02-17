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


module.exports.userinfoaddaddress = (req, res, next) =>  {
    if (req.body.collection && ~collections.indexOf(req.body.collection)) {
        const result = userinfoaddaddress(req.body);
        result
            .then (data => res.status(200).send('Success add to collection ' + data.name))
            .catch(err =>  res.status(406).send(err))
    } else {
        res.status(406).send('"' + req.body.collection + '" collection is not in database. Did not add in database!');
    }
};