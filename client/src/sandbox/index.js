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

    PostMessage(value, name, arg) {
        this.worker.postMessage({
            code: value,
            name: name,
            arguments: arg,
        });
    }

}

export { sandBox };
