'use strict';
const { getAllCollection } = require('../models/userinfo.model');
module.exports.userinfo = (req, res, next) => {
    getAllCollection()
        .then((data) => {
            let result = [];
            let results = [];
            let inforesult = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    const obj = JSON.parse(JSON.stringify(data[i][j]));
                    if (j == 0) result.push(Object.keys(obj))
                    result.push(Object.values(obj))
                }
                results.push(result);
                result = [];
            }

            for( let i=0, info = ''; i< results.length; info = '', i++) {
                for (let user of results[i]) {
                    for (let u of user) {
                        let string = u + ' ';
                        let pad = string.padEnd(14);
                        info += pad;
                    }
                    info += '\n';
                }
                inforesult.push(info);
            }

            res.status(200).send('All collection in database\n\nUser: \n' + inforesult[0] + ' \nAddress: \n' + inforesult[1] + '\n' +
                'Country: \n' + inforesult[2] + '\nСity:\n' + inforesult[3] + '\nStreet:\n' + inforesult[4])
        });

};





