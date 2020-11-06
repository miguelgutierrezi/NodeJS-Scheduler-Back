const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

exports.connect = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(
            process.env.NODE_ENV === 'test' ? global.__DB_URL__ : process.env.DB_URL,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        );
    }
}

exports.closeDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
}

exports.clearDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
        const {collections} = mongoose.connection;
        const promises = Object.keys(collections).map(collection =>
            mongoose.connection.collection(collection).deleteMany({})
        );
        await Promise.all(promises);
    }
}
