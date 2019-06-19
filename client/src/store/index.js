import { observable,
    runInAction,
    action,
    toJS,
} from 'mobx';


class AppStore {
    @observable levels = [];
    @observable parser = [];
    @observable start = 0;
    @observable level = 0;
    @observable code = '';
    @observable save = [];

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
            console.log(this.levels[this.level].tests[0].arguments);
            this.sandbox.PostMessage(toJS(this.code), toJS(this.levels[this.level].name), toJS(this.levels[this.level].tests[0].arguments));
            this.sandbox.worker.addEventListener('message', (e) => {
                console.log(e.data);
                //     this.props.store.skipLevel();
                this.sandbox.worker.terminate();
            });
        }
        else {
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
        this.level = this.level + 1;
        this.initCode();
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
