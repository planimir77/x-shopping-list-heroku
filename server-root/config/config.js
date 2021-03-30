const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 4200,
        dbURL: 'mongodb://localhost:27017/shoppinglists',
        origin: [
            'http://localhost:5555', 
            'http://localhost:4200', 
            'http://192.168.0.102:4200',
            'http://192.168.1.145:4200',
        ]
    },
    production: {
        port: process.env.PORT || 4200,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    },
};

module.exports = config[env];
