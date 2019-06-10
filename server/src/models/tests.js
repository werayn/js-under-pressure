import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    argument: {
        type: Array,
        unique: true,
    },
    expectedResult: {
        type: Array,
        unique: true,
    },
});

export { testSchema };
