import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';


@inject('store')
@observer
class Timer extends React.Component {

    static propTypes = {
        start: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            time: '00.000',
            start: this.props.start,
        };
        this.timer = null;
        this.tick = this.tick.bind(this);
        this.timerBuilder = this.timerBuilder.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 99);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timerBuilder() {
        const { start } = this.state;
        const end = new Date();
        const diff = new Date(end - start);
        let msec = diff.getMilliseconds();
        let sec = diff.getSeconds();
        let min = diff.getMinutes();
        const hr = diff.getHours() - 1;
        if (min < 10){
            min = '0' + min;
        }
        if (sec < 10){
            sec = '0' + sec;
        }
        if (msec < 10){
            msec = '00' + msec;
        }
        else if (msec < 100){
            msec = '0' + msec;
        }
        switch (true) {
        case hr > 0:
            return `${hr} : ${min} : ${sec}.${msec}`;
        case min > 0 :
            return `${min} : ${sec}.${msec}`;
        default :
            return `${sec}.${msec}`;
        }
    }

    tick() {
        this.setState({
            time: this.timerBuilder(),
        });
    }

    render() {
        return (
            <div className="timer">
                <p>
                    { this.state.time }
                </p>
            </div>
        );
    }
}

export { Timer };

