import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
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
