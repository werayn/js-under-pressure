
/*import ivm from 'isolated-vm';

class Runner {

    constructor() {
        // Create a new isolate limited to 128MB
        this.isolate = new ivm.Isolate({ memoryLimit: 128 });

        // Create a new context within this isolate. Each context has its own copy of all the builtin
        // Objects. So for instance if one context does Object.prototype.foo = 1 this would not affect any
        // other contexts.
        this.context = this.isolate.createContextSync();

        // Get a Reference{} to the global object within the context.
        this.jail = this.context.global;

        // This make the global object available in the context as `global`. We use `derefInto()` here
        // because otherwise `global` would actually be a Reference{} object in the new isolate.
        this.jail.setSync('global', this.jail.derefInto());
        // The entire ivm module is transferable! We transfer the module to the new isolate so that we
        // have access to the library from within the isolate.
        this.jail.setSync('_ivm', ivm);

        // We will create a basic `log` function for the new isolate to use.
        this.jail.setSync('_log', new ivm.Reference(function(...args) {
            console.log(...args);
        }));
    }

    tester(tests, code) {
        const ret = [];
        tests.forEach(test => {
        });
        console.log(ret);
    }
}

export default Runner;
*/
