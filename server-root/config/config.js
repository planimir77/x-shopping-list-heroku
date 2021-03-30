const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    },
    production: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    },
};

module.exports = config[env];
