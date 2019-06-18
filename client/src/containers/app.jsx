import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { MainEditor } from './main-editor.jsx';
import { LogScreen } from './logger/log-screen.jsx';
import 'styles/index.scss';
import { observer } from 'mobx-react';

@inject('store')
@observer
class App extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.props.store.fetchLevels();
        this.handleEnterQ = this.handleEnterQ.bind(this);
    }

    handleEnterQ(e) {
        if (e.keyCode === 13 && e.ctrlKey && this.props.store.start === 0) {
            this.props.store.startEndTest();
        }

        if (e.keyCode === 81 && e.ctrlKey) {
            switch (this.props.store.start) {
            case 1 :
                this.props.store.skipLevel();
                this.props.store.detectSkip();
                console.log('skip level');
                break;
            case 2 :
                // do nothing or maybe go back
                console.log('result page');
                break;
            default :
            // send logger you cant skip
                console.log('you cant skip now');
                break;
            }
        }

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEnterQ);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEnterQ);
    }

    render () {

        return (
            <div className="container-fluid">
                <MainEditor />
                <LogScreen />
            </div>
        );
    }
}

export { App };
