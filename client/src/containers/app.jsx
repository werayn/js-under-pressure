import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Result } from './result/index.jsx';
import { MainPanel } from './mainPanel.jsx';
import 'styles/index.scss';

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
        if (e.keyCode === 13 && e.ctrlKey) {
            switch (this.props.store.start) {
            case 1 :
                this.props.store.testCode();
                break;
            case 0 :
                this.props.store.startTest();
                break;
            default :
                console.log('do nothing');
                break;
            }
        }

        if (e.keyCode === 81 && e.ctrlKey) {
            switch (this.props.store.start) {
            case 1 :
                this.props.store.skipLevel();
                console.log('skip level');
                break;
            case -1 :
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
            <div className="row">
                {
                    this.props.store.start >= 0 ?
                        <MainPanel /> :
                        <Result />
                }
            </div>
        );
    }
}

export { App };
