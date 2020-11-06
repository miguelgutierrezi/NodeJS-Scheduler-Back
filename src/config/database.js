const config = require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(config.mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    (err) => {
        if (!err) console.log('Se ha establecido la conexión exitosamente');
        else console.log(`Ha fallado la conexión con la base de datos: ${err}`);
    });

module.exports = mongoose;
