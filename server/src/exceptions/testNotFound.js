import HttpException from './HttpException';

class TestNotFound extends HttpException {
    constructor(id) {
        super(404, `The test of level with id: ${id} not found`);
    }
}

export { TestNotFound };
