const config = {
    port: process.env.port || 3000,
    apiRoute: process.env.apiRoute || 'api/v1',
    mongoUri: process.env.mongoUri || 'mongodb+srv://e-volution:Evolution123@cluster0.pwyq5.mongodb.net/e-volution?retryWrites=true&w=majority'
};

module.exports = config;
