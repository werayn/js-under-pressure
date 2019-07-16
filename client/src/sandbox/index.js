import WebWorker from './webWorker';
import customWorker from './myWorker';

class sandBox {
    constructor() {
        this.worker = null;
    }

    createWorker() {
        this.worker = new WebWorker(customWorker);
    }

    stopWorker() {
        this.worker.terminate();
    }

    async execTests(code, tests, name) {
        const ret = await Promise.all(tests.map( async test =>
            new Promise((resolve, reject) => {
                this.createWorker();
                this.PostMessage(code, name, test.arguments, test.expectedResult);
                this.worker.addEventListener('message',
                    event => resolve(event.data));
            })));
        return (ret);
    }

    PostMessage(value, name, arg, expected) {
        this.worker.postMessage({
            code: value,
            name: name,
            arguments: arg,
            expected: expected,
        });
    }
}

export { sandBox };
