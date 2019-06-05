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
});

const Level = mongoose.model('Level', levelSchema);

export { Level };
