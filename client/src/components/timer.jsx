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
            time: '',
            start: this.props.start,
        };
        this.timer = null;
        this.tick = this.tick.bind(this);
        this.timerBuilder = this.timerBuilder.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timerBuilder() {
        const { start } = this.state;
        const ms = (new Date() - start);
        console.log(ms);
        const elapsed = Math.round(ms / 100);
        let seconds = (elapsed / 10 ).toFixed(1);

        const min = Math.floor(seconds / 60);
        const hour = Math.floor(min / 60);
        switch (true) {
        case seconds > 3600:
            seconds = seconds % 60;
            return `${hour} : ${min} : ${seconds}`;
        case seconds > 60 :
            seconds = seconds % 60;
            return `${min} : ${seconds}`;
        default :
            return `${seconds}`;

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

