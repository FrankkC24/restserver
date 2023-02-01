const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // DB Connection
        this.database();

        // Middleweres
        this.middleweres();

        // Routes of the application
        this.routes();
    };

    async database() {
        await dbConnection();
    }

    middleweres() {
        // CORS
        this.app.use( cors() );

        // Read and parse body
        this.app.use( express.json() );

        // Public directory
        this.app.use( express.static( 'public' ) );
    };

    routes() {
        this.app.use( this.usersPath , require('../routes/user'));
    };

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    };
};

module.exports = Server;