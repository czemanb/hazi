const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jggsve', { useNewUrlParser: true} );

module.exports = mongoose;