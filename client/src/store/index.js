import { observable, runInAction } from 'mobx';

class AppStore {
    @observable test = [];
    @observable levels = [];

    constructor(api) {
        this.Api = api;
        this.fetchLevels = this.fetchLevels.bind(this);
        this.fetchTest = this.fetchTest.bind(this);
        //this.fetchLevels();
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
