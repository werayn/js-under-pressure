import React from 'react';
import PropTypes from 'prop-types';
import { inject,
    observer,
} from 'mobx-react';
import { toJS } from 'mobx';
import { Line } from './components/line.jsx';

@inject('store')
@observer
class LogScreen extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    }


    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="row log " id="textlog">
                <div className="col-md-12">
                    {
                        this.props.store.log.map((line, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Line content={ toJS(line.content) } layout={ toJS(line.layout) } key={ index } />
                        ))}
                </div>
            </div>
        );
    }
}

export { LogScreen };
