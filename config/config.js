// config/config.js

require('dotenv').config(); // instantiate env variables

let CONFIG = {}; // Make a global CONFIG object to be used all over the app

CONFIG.app = process.env.APP; // 'dev';
CONFIG.port = process.env.PORT; // 4000;

CONFIG.ip_address = process.env.IP_ADDRESS; // 'http://localhost:4000';
CONFIG.db_dialect = process.env.DB_DIALECT; // 'mongodb';
CONFIG.db_user = process.env.DB_USER; // 'user'
CONFIG.db_pass = process.env.DB_PASS; // 'user123'
CONFIG.db_host = process.env.DB_HOST; // 'localhost';
CONFIG.db_port = process.env.DB_PORT; // '27017';
CONFIG.db_name = process.env.DB_NAME; // 'platform-backend-dev';
CONFIG.db_options = process.env.DB_OPTIONS; // 'retryWrites=true&w=majority'

CONFIG.secret_key = process.env.SECRET_KEY; // 'http://localhost:4000';

module.exports = CONFIG;
