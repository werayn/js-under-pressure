import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { connectDb, disconnectDb } from './models';
//import errorMiddleware from './middleware/error.middleware';

class App {

    constructor() {
        this.app = express();

        this.initializeMiddlewares();
        connectDb();
        this.initializeErrorHandling();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('/*************** *************** ***************/');
            console.log('/*************** STARTING SERVER ***************/');
            console.log('/*************** *************** ***************/');
            console.log(`App listening on the port ${process.env.PORT}`);
        }).on('error', (err) => {
            console.log(err);
            disconnectDb();
            process.exit(1);
        });
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    initializeErrorHandling() {
    }
/*
  initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
*/
}

export { App };
