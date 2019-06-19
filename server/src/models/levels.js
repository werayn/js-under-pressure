import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        unique: true,
    },
    tests : {
        type: [ 'Mixed '],
        unique: true,
    },
});

export { levelSchema };
