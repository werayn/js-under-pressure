import express from 'express';
import { models } from '../models/index.js';
import {
    LevelNotFound,
    LevelsNotFound,
} from '../exceptions/levelNotFound.js';
import { TestNotFound } from '../exceptions/testNotFound.js';

class LevelsController {
    constructor() {
        this.path = '/levels';
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, this.getAllLevel);
        this.router.get(`${this.path}/:id`, this.getLevelById);
        this.router.get(`${this.path}/:id/tests`, this.getTest);
        this.router.delete(`${this.path}/:id`, this.deleteLevel);
    }

    getAllLevel(req, res, next) {
        models.Level.find()
            .then((levels) => {
                (Object.keys(levels).length > 0) ?
                    res.send(levels) :
                    next(new LevelsNotFound());
            });
    }

    getLevelById(req, res, next) {
        const id = req.params.id;
        models.Level.findById(id)
            .then((level) => {
                (level) ?
                    res.send(level) :
                    next(new LevelNotFound(id));
            });
    }

    getTest(req, res, next) {
        const id = req.params.id;
        models.Level.findById(id)
            .then((level) => {
                (level.tests) ?
                    res.send(level.tests) :
                    next(new TestNotFound(id));
            });
    }


    deleteLevel(req, res, next) {
        const id = req.params.id;
        models.Level.findByIdAndDelete(id)
            .then((successResponse) => {
                (successResponse) ?
                    res.send(200) :
                    next(new LevelNotFound(id));
            });
    }
}

export { LevelsController };
