import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { EnterButton } from '../../components/EnterButton.jsx';
import { Timer } from '../../components/timer.jsx';
import WebWorker from '../../sandbox/webWorker.js';
import customWorker from '../../sandbox/myWorker.js';

const defaultValue = `box.square = function square (x) {
    x = x * x;
    return x;
};`;
/*
const tests = [
    {
        argument: 2,
        expected: 4,
    },
    {
        argument: 3,
        expected: 6,
    },
];
*/
const markers = [
    {
        startRow: 3,
        type: 'text',
        className: 'test-marker',
    },
];

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: defaultValue,
            valid: false,
        };
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSelectionChange = this.handleOnSelectionChange.bind(this);
        this.handleOnCursorChange = this.handleOnCursorChange.bind(this);
        this.handleOnValidate = this.handleOnValidate.bind(this);
        this.Exec = this.Exec.bind(this);
    }

    handleOnLoad() {
        console.log('load');
        //get tests
    }

    handleOnChange(newValue) {
        this.setState({
            value: newValue,
        });
    }

    handleOnSelectionChange() {
    }

    handleOnCursorChange(newValue, event) {
    }

    handleOnValidate(res) {
        if (res.length === 0) {
            this.setState({
                valid: true,
            });
        }
        else {
            this.setState({
                valid: false,
            });
        }
    }

    Exec(event) {
        const {
            value,
            valid,
        } = this.state;
        if (valid) {
            const worker = new WebWorker(customWorker);
            worker.postMessage({
                code: value,
                name: 'square',
            });
            worker.addEventListener('message', (e) => {
                console.log('in editor');
                console.log(e.data);
            });
        }
        else {
            // call mobx action to edit log
            console.log('nop pas valide');
        }

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-10">
                    <AceEditor
                        markers={ markers }
                        commands={ [{   // commands is array of key bindings.
                            name: 'test', //name for the key binding.
                            bindKey: {win: 'Ctrl-Return', mac: 'Command-Return'}, //key combination used for the command.
                            exec: this.Exec,  // name of the command to rebind
                        }] }
                        height="420px"
                        width="100%"
                        placeholder="placeholder text"
                        mode="javascript"
                        theme="monokai"
                        name="blah2"
                        onLoad={ this.handleOnLoad }
                        onChange={ this.handleOnChange }
                        onSelectionChange={ this.handleOnSelectionChange }
                        onCursorChange={ this.handleOnCursorChange }
                        onValidate={ this.handleOnValidate }
                        value={ this.state.value }
                        fontSize={ 14 }
                        showPrintMargin
                        showGutter
                        highlightActiveLine
                        setOptions={ {
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        } }
                    />
                </div>
                <div className="col-md-2 ">
                    <Timer start={ Date.now() } />
                    <EnterButton submit={ this.Exec() } />
                </div>
            </div>
        );
    }
}

export { Editor };
