import React from 'react';
import { observer } from 'mobx-react';
import { MainEditor } from './main-editor.jsx';
import { LogScreen } from './log-screen.jsx';
import 'styles/index.scss';

@observer
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterQ = this.handleEnterQ.bind(this);
    }

    handleEnterQ(e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            console.log('ENTER BRO');
            if (!this.props.AppStore.level === 0) {
                this.props.AppStore.levelUp;
                this.props.AppStore.startTimer;
                this.props.AppStore.startTest;
            }
/*            else if (!this.props.AppStore.check === 2 ) {
              this.props.
            }
        */      }
        if (e.keyCode === 81 && e.ctrlKey) {
            console.log('QUIT BRO');
            /* else */if (this.AppStore.state === true) {
                this.AppStore.levelUp;
            }
            /*
            if (this.AppStore.level === this.AppStore.levels.length) {
                this.AppStore.endTest;
            }
            */
            else {
                this.AppStore.skiped;
            }
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
        const {
            AppStore
        } = this.props.AppStore

        return (
            <div className="grid-container">
                {
                    AppStore.state === 2 ?
                      (  <Result />)
                    :
                    (
                        <MainEditor />
                        <LogScreen />
        )
                }
     </div>
        );
    }
}

export { App };
