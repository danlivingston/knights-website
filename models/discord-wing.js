"use strict";

let mongoose = require('../db');
let wing = require('./wing');

let Schema = mongoose.Schema;

let discordWing = new Schema({
    wing: wing,
    roleID: {
        type: Number,
        required: true
    }
});

let model = mongoose.model('discordWing',discordWing);

module.exports = model;