import 'dotenv/config';
import { App } from './app';
import { disconnectDb } from './models';

const app = new App();

app.listen();

process.on('SIGINT', () => {
    console.log('Server received SIGINT event.\nClosing server...');
    disconnectDb();
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('Server received SIGTERM event.\nClosing server...');
    disconnectDb();
    process.exit(1);
});
