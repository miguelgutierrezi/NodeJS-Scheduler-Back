const config = {
    port: process.env.PORT || 3000,
    apiRoute: process.env.API_ROUTE || 'api/v1',
    username: process.env.USERNAME || 'e-volution',
    database: process.env.DATABASE || 'e-volution',
    password: process.env.PASSWORD || 'Evolution123',
    cypherKey: process.env.CYPHER_KEY || 'SCHEDULER_CYPHER_KEY'
};

module.exports = config;
