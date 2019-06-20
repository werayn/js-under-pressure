import { observable,
    runInAction,
    action,
    toJS,
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

    constructor(api, sand) {
        this.Api = api;
        this.sandbox = sand;
    }

    fetchLevels = async () => {
        const levels = await this.Api.fetchLevels();

        runInAction(() => {
            this.levels = levels;
        });
    }

    @action.bound
    initCode() {
        this.code = `box.${this.levels[this.level].name} = function ${this.levels[this.level].name} (x) {
// ${this.levels[this.level].description}

};`;
    }

    @action.bound
    testCode() {
        if (this.parser.length === 0) {
            console.log('exec code');
            const toto = this.levels[this.level].tests.map( async test => {
                this.sandbox.createWorker();
                this.sandbox.PostMessage(toJS(this.code), toJS(this.levels[this.level].name), toJS(test.arguments));
                this.sandbox.worker.addEventListener('message', async (e) => {
                    if (equal(test.expectedResult === e.data.result)) {
                        console.log('nice');
                        this.sandbox.stopWorker();
                        this.match = true;
                        return await true;
                        //send to logger nice
                    }
                    else {
                        //send to logger bad
                        this.match = false;
                        console.log('bad result');
                        //  this.sandbox.stopWorker();
                        return await false;
                    }
                    //     this.props.store.skipLevel();
                });

            });
            console.log(toto);
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
}

/*
   Exec(event) {
        const {
            value,
            valid,
        } = this.state;

        if (valid) {
            console.log('valide');
            const worker = new WebWorker(customWorker);
            worker.postMessage({
                code: value,
                name: 'square',
            });
            worker.addEventListener('message', (e) => {
                console.log(e.data);
                //     this.props.store.skipLevel();
            });
        }
        else {
            // call mobx action to edit log
            console.log('nop pas valide');
        }

    }
*/

export { AppStore };
