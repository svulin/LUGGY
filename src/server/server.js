const express = require('express')
    const bodyParser = require('body-parser')
    const Pusher = require('pusher');

    // create a express application
    const app = express();

    // initialize pusher
    let pusher = new Pusher({
        appId: 'PUSHER_APP_ID',
        key: 'PUSHER_APP_KEY',
        secret: 'PUSHER_APP_SECRET',
        cluster: 'PUSHER_APP_CLUSTER',
        encrypted: true
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // to Allow CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });
