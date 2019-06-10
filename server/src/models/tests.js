import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    arguments: {
        type: Array,
        unique: true,
    },
    expectedResult: {
        type: Array,
        unique: true,
    },
});

const Test = mongoose.model('Test', testSchema);

export { Test };
