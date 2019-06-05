import mongoose from 'mongoose';
import { Level } from './levels';
import { Test } from './tests';

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;

const connectDb = () => {
    return mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true, autoIndex: false }, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Database connected!');
    });
};

const disconnectDb = () => {
    return mongoose.disconnect((err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Database well disconnected !');
    });
};

const models = { Level, Test };

export { connectDb, disconnectDb, models };
