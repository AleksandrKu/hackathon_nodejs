'use strict';
const { getAllCollection } = require('../models/userinfo.model');
module.exports.userinfo = (req, res, next) => {
     getAllCollection()
         .then ( (data) => {
             res.status(200).send('User: \n' + data[0] + ' \n Address: \n' + data[1] + '\n ' +
                 'country: \n' + data[2] + '\nСity:\n' + data[3] + '\nStreet:\n' + data[4]);
         });



};



