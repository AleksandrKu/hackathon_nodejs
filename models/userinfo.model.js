'use strict';
const mongoose = require('mongoose');
const config = require('../config');
const {schema} = require('./shema.model');
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
mongoose.connect(config.mongo.uri, config.mongo.options);
if (process.env.NODE_ENV === "dev") {
    mongoose.set("debug", true);
}
mongoose.connection.on('error', (err) => {
    console.error("MongoDB err", err);
});
mongoose.connection.on('open', () => {
    console.log("MongoDB connect success");
});

const getAddress = (id) => {
    return new Promise(function (resolve, reject) {
        const Address = mongoose.model('address', schema.addressSchema);
        Address.findOne({id: id}).exec()
            .then(docs => {
                if (docs && docs.id) {
                    resolve(docs);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error("Error ", err);
            })
    });
};
const getPlaceName = (collection, id) => {
    return new Promise(function (resolve, reject) {
        const Name = mongoose.model(collection, schema[collection + "Schema"]);
        Name.findOne({id: id}).exec()
            .then(docs => {
                if (docs && docs.name && docs.id) {
                    resolve(docs.name);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error("Error ", err);
            })
    });
};
const getPlace = (collection, place) => {
    return new Promise(function (resolve, reject) {
        const Name = mongoose.model(collection, schema[collection + "Schema"]);
        Name.findOne({name: place}).exec()
            .then(docs => {
                if (docs && docs.name && docs.id) {
                    resolve(docs.id);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error("Error ", err);
            })
    });
};

const getAllDocuments = (collection) => {
    console.log(collection);
    return new Promise(function (resolve, reject) {
        let Name;
        if (collection == 'user') {
            Name = mongoose.model(collection, schema.UserSchema);
        } else {
            Name = mongoose.model(collection, schema[collection + "Schema"]);
        }
        Name.find()
            .select({ _id: 0, __v:0 })
            .then(docs => {
                if (docs) {
                    resolve(docs);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error("Error ", err);
            })
    });
};

// add user
module.exports.userinfoadd = (req, res) => {
    const checkUser = (user) => {
        return new Promise(function (resolve, reject) {
            const User = mongoose.model("user", schema.UserSchema);
            User.findOne({firstname: user.firstname, lastname: user.lastname}).exec()
                .then(docs => {
                    if (docs && docs.id) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((err) => {
                    console.error("Error ", err);

                })
        });
    };
    const addUser = (idAddress) => {
        const User = mongoose.model('user', schema.UserSchema);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address_id: idAddress
        });
        user.save((err) => {
            if (err) return console.log(err);
            res.status(201).send('User ' + req.body.firstname + ' ' + req.body.lastname + ' was created.');
        });
    };
    const getAddressId = (idCountry, idCity, idStreet) => {
        return new Promise((resolve, reject) => {
            const Address = mongoose.model('address', schema.addressSchema);
            Address.findOne({
                country_id: idCountry,
                city_id: idCity,
                street_id: idStreet
            }).exec()
                .then(docs => {
                    if (docs && docs.id) {
                        resolve(docs.id);
                    } else {
                        resolve(false);
                    }
                })
                .catch((err) => {
                    console.error("Error ", err);
                })
        });
    };

    const getIdCountry = getPlace("country", req.body.country);
    const getIdCity = getPlace("city", req.body.city);
    const getIdStreet = getPlace("street", req.body.street);
    const isUser = checkUser(req.body);
    Promise.all([getIdCountry, getIdCity, getIdStreet, isUser]).then(results => {
        if (!results[3]) {
            getAddressId(results[0], results[1], results[2])
                .then((idAddress) => {
                    if (idAddress) {
                        addUser(idAddress);
                    } else {
                        res.status(406).send('Address country city street doesn\'t exist.');
                    }
                })
        } else {
            res.status(204).send('User firstname lastname already exists.');
        }
    });
};


module.exports.userinfoget = (req, res) => {
    return new Promise(function (resolve, reject) {
        const User = mongoose.model("user", schema.UserSchema);
        User.findOne({firstname: req.params[0], lastname: req.params[1]}).exec()
            .then(docs => {
                if (docs && docs.id && docs.address_id) {
                    getAddress(docs.address_id)
                        .then((address) => {
                            const getCountry = getPlaceName("country", address.country_id);
                            const getCity = getPlaceName("city", address.city_id);
                            const getStreet = getPlaceName("street", address.street_id);
                            Promise.all([getCountry, getCity, getStreet]).then(addresses => {
                                res.status(200).send('firstname: ' + req.params[0] + ' lastname: ' + req.params[1] + ' ' +
                                    'country: ' + addresses[0] + ', city: ' + addresses[1] + ', street: ' + addresses[2]);
                            });
                        })
                } else {
                    console.log('User ' + req.params[0] + ' ' + req.params[1] + ' doesn\'t exist.');
                    res.status(204).send('User ' + req.params[0] + ' ' + req.params[1] + ' doesn\'t exist.');
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error("Error ", err);
            })
    });

}

// add 'country', 'city', 'street' collection
module.exports.userinfoaddaddress = (body) => {
    const schemaName = body.collection + 'Schema';
    const Address = mongoose.model(body.collection, schema[schemaName]);
    const address = new Address({
        id: body.id,
        name: body.name
    });
    address.save(function (err) {
        if (err) return console.log(err);
        console.log("Сохранен объект", address);
    });
    return true;
};

module.exports.getAllCollection = () => {
    return new Promise((resolve, reject) => {
        const getUser = getAllDocuments("user");
        const getAddress = getAllDocuments("address");
        const getCountry = getAllDocuments("country");
        const getCity = getAllDocuments("city");
        const getStreet = getAllDocuments("street");
        Promise.all([getUser, getAddress, getCountry, getCity, getStreet])
            .then(data => {
                resolve(data);
            });
    });

}