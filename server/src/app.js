import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectDb, disconnectDb } from './models';
import { errorMiddleware } from './middleware/error.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';
import { LevelsController } from './controller/levels';

dotenv.config({ path: './.env' });

class App {

    constructor() {
        this.app = express();
        this.controllers = [
            new LevelsController(),
        ];
        this.initializeMiddlewares();
        this.db = connectDb();
        this.initializeControllers();
        this.initializeErrorHandling();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('/*************** *************** ***************/');
            console.log('/*************** STARTING SERVER ***************/');
            console.log('/*************** *************** ***************/');
            console.log(`App listening on the port ${process.env.PORT}`);
        }).on('error', (err) => {
            console.error(err);
            disconnectDb();
            process.exit(1);
        });
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(loggerMiddleware);
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    initializeControllers() {
        this.app.get('/', function (req, res) {
            res.send('Hello js-under-pressure !');
        });
        this.controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

}

export { App };
