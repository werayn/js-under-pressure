import {
    observable,
    action,
} from 'mobx';

class AppStore {
    @observable level = 0;
    @observable check = 0;
    @observable skiped = false;
    @observable state = 0;
    @observable count = 0;
    @observable levels= [];
    @observable test = [];

    @action.bound
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
    }
}

export { AppStore };
