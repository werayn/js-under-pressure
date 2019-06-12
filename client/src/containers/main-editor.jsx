import React from 'react';
//import { inject } from 'mobx-react';
// import { Welcome } from './welcome/index.jsx';
import { Editor } from './editor/index.jsx';


//@inject('AppStore')
class MainEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Editor />
            </div>
        );
    }
}

export { MainEditor };
