const box = {};
class Tester {

    constructor() {
        this.stringCall = null;
    }

    equal (left, right) {
        if (left === right || Object(left) === Object(right)) {
            return true;
        }

        //arrays
        if (Array.isArray(left)) {
            if (!Array.isArray(right) || left.length !== right.length) {
                return false;
            }

            return left.every(function testArrayItemEquality (item, idx) {
                return this.equal(item, right[idx]);
            });
        }

        //now, this is not a generic solution, this is tailored for the questions.
        // we will only deal with primitives (and their objects) and arrays.
        // so, we cheat.
        return false;
    }

    constructFunc(name, param) {
        return name + '(' + JSON.stringify(param) + ')';
    }


    CheckIt(form, result, expected) {

        if (this.equal(result, expected)) {
            console.log('passed');
        }
        else {
            console.log('Failed');
        }
    }

    static FuncExecutor(code, name) {

        try {
            // eslint-disable-next-line no-new-func
            Function(code)();

            const fun = box[name];
            if (!fun) {
                throw 'Function ' + name + ' not defined on box';
            }
            this.stringCall = this.constructFunctionCall(name, 2);
            this.checkIt(this.stringCall, fun(2), 4);

        }
        catch (e) {
            console.error(e);
        }
    }
}

export default Tester;
