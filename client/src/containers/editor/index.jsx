import React from 'react';
import AceEditor from 'react-ace';
//import Runner from '../../utils/tester';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const defaultValue = `function square(x) {

}`;
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
            // runner: new Runner(),
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
                err: null,
            });
        }
        else {
            this.setState({
                valid: true,
                err: null,
            });
        }
    }

    Exec(event) {
        const {
            //            value,
            valid,
            // runner,
        } = this.state;

        if (valid) {
            console.log('cest pas valide');
            //runner.startTest(tests, value);
            // exec func & get res
            // call mobx action to edit log
        }
        else {
            // call mobx action to edit log

        }

    }

    render() {
        return (
            <AceEditor
                markers={ markers }
                commands={ [{   // commands is array of key bindings.
                    name: 'test', //name for the key binding.
                    bindKey: {win: 'Ctrl-Return', mac: 'Command-Return'}, //key combination used for the command.
                    exec: this.Exec,  // name of the command to rebind
                }] }
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
        );
    }
}

export { Editor };
