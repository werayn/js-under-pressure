import mongoose from 'mongoose';
import uuid from 'uuid';

const levelSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        default: uuid.v1,
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
