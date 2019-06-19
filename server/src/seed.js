import fs from 'fs';
import mongoose from 'mongoose';
import { insertLevel } from './database/utils.js';
import  { connectDb } from './models/index.js';

class Seed {
    constructor() {
        const tmp = fs.readFileSync('src/database/level.json', 'utf8');
        this.levels = JSON.parse(tmp);
        connectDb();
    }

    async insertLevels() {
        this.levels.forEach(level => {
            console.log(level);
            insertLevel(level);
        });
    }

    async resetDb() {
        mongoose.connection.collections.levels.drop((err) => {
            (err) ?
                console.error(err) :
                console.log('collection levels dropped');
        });
    }

    insertData() {
        connectDb()
            .then(this.resetDb()
                .then(this.insertLevels()
                ));
    }
}

const seed = new Seed();

seed.insertData();
