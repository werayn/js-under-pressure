import React from 'react';
import AceEditor from 'react-ace';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
//import { EnterButton } from '../../components/EnterButton.jsx';

const markers = [
    {
        startRow: 3,
        type: 'text',
        className: 'test-marker',
    },
];

@inject('store')
@observer
class Editor extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnValidate = this.handleOnValidate.bind(this);
    }

    handleOnLoad() {
        this.props.store.initCode();
    }

    handleOnChange(newValue) {
        this.props.store.onChangeCode(newValue);
    }

    handleOnValidate(res) {
        this.props.store.pushError(res);
    }

    render() {
        return (
            <div className="col-md-10">
                <AceEditor
                    markers={ markers }
                    height="420px"
                    width="100%"
                    placeholder="placeholder text"
                    mode="javascript"
                    theme="monokai"
                    name="blah2"
                    onLoad={ this.handleOnLoad }
                    onChange={ this.handleOnChange }
                    onValidate={ this.handleOnValidate }
                    value={ toJS(this.props.store.code) }
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
        );
    }
}

export { Editor };
