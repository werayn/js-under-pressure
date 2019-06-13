import { observable,
    runInAction,
    action,
} from 'mobx';

class AppStore {
    @observable test = [];
    @observable levels = [];
    @observable start = false;
    @observable skip = false;
    @observable save = [];

    constructor(api) {
        this.Api = api;
    }

    fetchLevels = async () => {
        const levels = await this.Api.fetchLevels();

        runInAction(() => {
            this.levels = levels;
        });
    }

    fetchTest = async (id) => {
        const test = await this.Api.fetchTest(id);

        runInAction(() => {
            this.test = test;
        });
    }

    @action.bound
    saveLevel(save) {
        this.clock.save.push(save);
    }

    @action.bound
    detectSkip() {
        this.skip = true;
    }
    @action.bound
    startEndTest() {
        this.start = !this.start;
    }

    @action
    Submit() {
        console.log('nous on reste orthodoxes');
    }
/*      @observable check = 0;
    @observable skiped = false;
    @observable state = 0;
    @observable count = 0;
    @observable levels= [];
    @observable test = [];

    /*   @action.bound
    levelUp() {
        this.level += 1;
    }

    @action.bound
    startTimer() {
        setInterval(() => {
            this.count += 1;
        }, 1000);
    }

    @action.bound
    skiped() {
        this.skip = !this.skip;
    }

    @action.bound
    startTest() {
        this.state = 1;
    }

    @action.bound
    endTest() {
        this.state = 2;
        clearInterval(this.startTime());
    }*/
}

export { AppStore };
