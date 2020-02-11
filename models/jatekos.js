const Schema = require('mongoose').Schema;
const db = require('../config/database');

const Jatekos = db.model('Jatekos', {
    nev: String,
    mezszam: Number,
    teljesitmeny: String,
    _jatszik: {
        type: Schema.Types.ObjectId,
        ref: 'Csapat'
    }
});

module.exports = Jatekos;
