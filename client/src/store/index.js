import { observable,
    runInAction,
    action,
    toJS,
    observe,
} from 'mobx';
import { equality } from '../utils/equal.js';


class AppStore {
    @observable levels = [];
    @observable parser = [];
    @observable start = 0;
    @observable level = 0;
    @observable code = '';
    @observable save = [];
    @observable log = [];

    constructor(api, sand) {
        this.Api = api;
        this.sandbox = sand;
    }

    fetchLevels = async () => {
        const levels = await this.Api.fetchLevels();

        runInAction(() => {
            this.levels = levels;
            this.addLine('Finished loading levels. Proceed.');
        });
        this.ScrollDisposer();
    }

    ScrollDisposer() {
        observe(this.log, (change) => {
            const textLog = document.getElementById('textlog');
            textLog.scrollTop = textLog.scrollHeight;
        });
    }

    @action.bound
    initCode() {
        this.code = `box.${this.levels[this.level].name} = function ${this.levels[this.level].name} (x) {
// ${this.levels[this.level].description}

};`;
    }

    @action.bound
    async handleTestCode() {
        if (this.parser.length === 0) {
            this.addLine('Testing in progress...');
            const tested = await this.sandbox.execTests(toJS(this.code),
                toJS(this.levels[this.level].tests),
                toJS(this.levels[this.level].name));
            this.checkValidity(tested);
        }
        else {
            const parser = toJS(this.parser);
            parser.map(err => {
                this.addLine(`at line: ${err.row} ${err.text}`);
            });
            console.log(toJS(this.parser));
        }
    }

    checkValidity(tested) {
        let validity = true;
        tested.map(test => {
            if (equality(test.result, test.expectedResult)) {
                this.addLine(`${test.name}(${test.arg}) = ${test.expectedResult}`);
            }
            else {
                validity = false;
                this.addLine(`${test.name}(${test.arg}) expected ${test.expectedResult} got ${test.result}`);
            }
        });
        if (validity) {
            this.skipLevel();
        }
    }

    @action.bound
    pushError(err) {
        this.parser = err;
    }

    @action.bound
    onChangeCode(val) {
        this.code = val;
    }

    @action.bound
    startTest() {
        this.start = 1;
        this.initCode();
    }

    @action.bound
    endTest() {
        this.start = -1;
    }

    @action.bound
    skipLevel() {
        if (this.levels.length - 1 === this.level) {
            this.endTest();
        }
        else {
            this.level = this.level + 1;
            this.initCode();
        }
    }

    @action.bound
    addLine(val, styl) {
        const obj = {
            content: val,
            style: styl || '',
        };
        this.log.push(obj);
        const textLog = document.getElementById('textlog');
        textLog.scrollTop = textLog.scrollHeight;

    }

    @action.bound
    cleanLog() {
        this.log = [];
    }

    @action.bound
    addLineError(tested, style) {
        this.addLine(tested.ret, tested.expected, style);

    }
}

export { AppStore };
