
export default function customWorker() {
    // eslint-disable-next-line no-unused-vars
    const box = {};

    // eslint-disable-next-line no-unused-vars
    const onmessage = (event) => {
        const code = event.data.code;
        const name = event.data.name;
        const arg = event.data.arguments;
        let result;
        try {
            // eslint-disable-next-line no-new-func
            Function(code)();
            // eslint-disable-next-line no-var
            var fun = box[name];
            result = fun(arg);
        }
        catch (e) {
            postMessage( e.toString() );
            return;
        }
        postMessage({result: result});
    };
}
