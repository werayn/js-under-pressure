import React from 'react';
import AceEditor from 'react-ace';
//import Runner from '../../utils/tester';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { EnterButton } from '../../components/EnterButton.jsx';
import { Timer } from '../../components/timer.jsx';

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
        this.getInitHeight = this.getInitHeight.bind(this);
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

    getInitHeight(editor){
        if (editor){
            let newHeight;
            newHeight = editor.getSession()
                .getScreenLength() *
              (editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth());
            newHeight = newHeight > 70 ? newHeight : 70;
            console.log(newHeight);
            return `${newHeight}px`;
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
                    <EnterButton />
                </div>
            </div>
        );
    }
}

export { Editor };
