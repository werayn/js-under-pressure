import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { levelSchema } from './levels';

dotenv.config({ path: './.env' });

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;

const connectDb = () => {
    return mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true, autoIndex: false, dbName: 'js-under-pressure' }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Database connected!');
    });
};

const disconnectDb = () => {
    return mongoose.disconnect((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Database well disconnected !');
    });
};

const Level = mongoose.model('Level', levelSchema, 'levels');

const models = { Level };

export { connectDb, disconnectDb, models };
