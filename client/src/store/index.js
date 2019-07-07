import { observable,
    runInAction,
    action,
    toJS,
    observe,
} from 'mobx';
import { equal } from '../utils/equal.js';


class AppStore {
    @observable levels = [];
    @observable parser = [];
    @observable start = 0;
    @observable level = 0;
    @observable code = '';
    @observable save = [];
    @observable match = false;
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
            console.log('aeazeazezzaee');
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
            console.log('exec code');
            const toto = await this.levels[this.level].tests.map( test => {
                this.sandbox.createWorker();
                this.sandbox.PostMessage(toJS(this.code), toJS(this.levels[this.level].name), toJS(test.arguments));
                this.sandbox.worker.addEventListener('message', (e) => {
                    if (equal(test.expectedResult === e.data.result)) {
                        console.log('nice');
                        this.sandbox.stopWorker();
                        this.match = true;
                        //send to logger nice
                    }
                    else {
                        //send to logger bad
                        this.match = false;
                        console.log('bad result');
                        //  this.sandbox.stopWorker();
                    }
                    //     this.props.store.skipLevel();
                });

            });
            console.log(this.match);
            if (this.match) {
                console.log('next level');
                this.save.push(this.code);
                this.skipLevel();
            }
        }
        else {
            //send to logger error
            console.log(toJS(this.parser));
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

}

export { AppStore };
