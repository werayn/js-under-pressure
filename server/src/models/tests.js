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
    level : {
        type: mongoose.Types.ObjectId,
        unique: true,
        ref: 'Level',
    },
});

const Test = mongoose.model('Test', testSchema);

export { Test };
