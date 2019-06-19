import { observable,
    runInAction,
    action,
} from 'mobx';


class AppStore {
    @observable levels = [];
    @observable start = 0;
    @observable level = 0;
    @observable skip = true;

    constructor(api) {
        this.Api = api;
    }

    fetchLevels = async () => {
        const levels = await this.Api.fetchLevels();

        runInAction(() => {
            this.levels = levels;
        });
    }

    @action.bound
    startEndTest() {
        this.start = this.start + 1;
    }

    @action.bound
    detectSkip() {
        this.skip = !this.skip;
    }

    @action.bound
    skipLevel() {
        this.level = this.level + 1;
    }
}

export { AppStore };
