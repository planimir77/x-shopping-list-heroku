const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['http://localhost:5000']
    },
    production: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['https://x-shopping-list.herokuapp.com', 'https://x-shopping-list.vercel.app']
    },
};

module.exports = config[env];
