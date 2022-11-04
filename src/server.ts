import 'reflect-metadata';
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import * as pkg from '../package.json';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Logger } from './logger';
import './controllers/auth.controller';
import './controllers/status.controller';
import './controllers/home.controller';
import { env } from './environment';
import { AuthressLoginClient } from './clients/authress-login.client';

// Setup DI
let container = new Container();
container.bind<Logger>(Logger).to(Logger);
container.bind<AuthressLoginClient>(AuthressLoginClient).to(AuthressLoginClient)

// Server configuration
let server = new InversifyExpressServer(container, null, null, null, null);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let app = server.build();

app.set('views', path.join(__dirname, '../public/views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "/../public")))

// Serve the application at the given port

var port = env.PORT || "8080";

app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
    console.log(`Running Build: ${(<any>pkg)["version"]}`);
});