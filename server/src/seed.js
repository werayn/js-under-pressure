import fs from 'fs';
import mongoose from 'mongoose';
import { insertLevel, listLevel, insertTest } from './database/utils.js';
import  { connectDb } from './models/index.js';

class Seed {
    constructor() {
        const tmp = fs.readFileSync('src/database/level.json', 'utf8');
        const tmp2 = fs.readFileSync('src/database/test.json', 'utf8');
        this.levels = JSON.parse(tmp);
        this.tests = JSON.parse(tmp2);
        connectDb();
    }

    async insertLevels() {
        this.levels.forEach(level => {
            console.log(level);
            insertLevel(level);
        });
    }

    async insertTests() {
        const levels = await listLevel();
        for (let i = 0; i < levels.length; i++) {
            console.log(this.tests[i].argument, this.tests[i].expectedResult);
            insertTest(levels[i]._id, this.tests[i]);
        }
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
                    .then(this.insertTests())
                ));
    }
}

const seed = new Seed();

seed.insertData();
