'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    address_id: {type: Number, required: true},
});
const addressSchema = new Schema({
    id: {type: Number, required: true},
    country_id: {type: Number, required: true},
    city_id: {type: Number, required: true},
    street_id: {type: Number, required: true},
});
const countrySchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
});
const citySchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
});
const streetSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
});

module.exports.schema = {
    UserSchema,
    addressSchema,
    countrySchema,
    citySchema,
    streetSchema
};

