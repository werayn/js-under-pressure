import React from 'react';

class LogScreen extends React.Component {
    render () {
        return (
            <div className="log">
                <div className="log-line">
                    { 'Ctrl+Enter or ⌘+Enter to submit/continue, (Ctrl/⌘)+Q to skip a level, (Ctrl/⌘)+R to restart a level.' }
                </div>
                <div className="log-line">
                    { 'Loading levels...' }
                </div>
                <div className="log-line">
                    { 'Finished loading levels. Proceed.' }
                </div>
            </div>

        );
    }
}

export { LogScreen };
