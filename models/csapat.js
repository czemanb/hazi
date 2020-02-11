const Schema = require('mongoose').Schema;
const db = require('../config/database');

const Csapat = db.model('Csapat', {
    csapatnev: String,
    varos: String,
    stadion: String
});

module.exports = Csapat;
