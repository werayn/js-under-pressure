import React from 'react';

class LogScreen extends React.Component {
    render () {
        return (
            <div className="log">
                <h1>
                    { 'Ctrl+Enter or ⌘+Enter to submit/continue, (Ctrl/⌘)+Q to skip a level, (Ctrl/⌘)+R to restart a level.' }
                </h1>
                <h2>
                    { 'Loading levels...' }
                </h2>
                <h3>
                    { 'Finished loading levels. Proceed.' }
                </h3>
            </div>

        );
    }
}

export { LogScreen };
