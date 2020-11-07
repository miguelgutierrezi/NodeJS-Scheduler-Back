const config = require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@cluster0.pwyq5.mongodb.net/${config.database}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    (err) => {
        if (!err) console.log('Se ha establecido la conexión exitosamente');
        else console.log(`Ha fallado la conexión con la base de datos: ${err}`);
    });

module.exports = mongoose;
