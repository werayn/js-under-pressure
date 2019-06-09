import React from 'react';
import { MainEditor } from './main-editor.jsx';
import { LogScreen } from './log-screen.jsx';
import 'styles/index.scss';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            skip: false,
            level: 0,
            start: false,
        };
        this.handleEnterQ = this.handleEnterQ.bind(this);
    }

    handleEnterQ(e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            console.log('ENTER BRO');
            if (!this.state.start)
            {
                this.setState(state => ({
                    start: !state.start,
                    skip: false,
                    level : state.level + 1,
                }));
            }
        }
        if (e.keyCode === 81 && e.ctrlKey) {
            console.log('QUIT BRO');
            this.setState(state => ({
                skip: true,
            }));

        }
        console.log(this.state.skip, this.state.start);
    }


    componentDidMount() {
        document.addEventListener('keydown', this.handleEnterQ);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEnterQ);
    }

    render () {
        return (
            <div className="grid-container">
                <MainEditor />
                <LogScreen />
            </div>
        );
    }
}

export { App };
