import mongoose from 'mongoose';
import { testSchema } from './tests.js';

const levelSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        unique: true,
    },
    test : testSchema,
});

export { levelSchema };
