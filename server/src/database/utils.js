import { models } from '../models/index.js';

const insertLevel = (level) => {
    const Level = models.Level();
    Level.name = level.name;
    Level.description = level.description;
    Level.tests = level.tests;

    Level.save((err) => {
        if (err) {
            console.error(err);
            return null;
        }
    });
};

/*
const insertTest = (LevelId, testTmp) => {
    models.Level.findOne({_id: LevelId}, (err, level) => {
        if (err) {
            console.log(err);
            return;
        }
        const Test = testSchema;
        Test.argument = testTmp.argument;
        Test.expectedResult = testTmp.expectedResult;
        level.test = Test;

        return level.save((err2) => {
            if (err2) {
                console.error(err2);
            }
        });
    });
};
*/
const listLevel = () => {
    return models.Level.find();
};


export { insertLevel, listLevel };
