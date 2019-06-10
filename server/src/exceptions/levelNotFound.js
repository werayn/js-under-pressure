import HttpException from './HttpException';

class LevelNotFound extends HttpException {
    constructor(id) {
        super(404, `Level with id ${id} not found`);
    }
}

class LevelsNotFound extends HttpException {
    constructor(id) {
        super(404, 'No levels have been found');
    }
}

export { LevelNotFound, LevelsNotFound };
