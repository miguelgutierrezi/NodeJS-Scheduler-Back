const config = {
    port: process.env.port || 3000,
    username: process.env.username || 'e-volution',
    password: process.env.password || 'Evolution123',
    database: process.env.database || 'e-volution',
    apiRoute: process.env.apiRoute || 'api/v1'
};

module.exports = config;
