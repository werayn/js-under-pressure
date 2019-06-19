import WebWorker from './webWorker';
import customWorker from './myWorker';

class sandBox {
    createWorker() {
        this.worker = new WebWorker(customWorker);
    }

    closeWorker() {
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
