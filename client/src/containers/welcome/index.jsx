import React from 'react';

class Welcome extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <div className="welcome col-md-8 offset-2">
                    <p>
                        {'Welcome to a stupid clone of '}
                        <a href="https://github.com/werayn/js-under-pressure">
                            {'You Can\'t JavaScript Under Pressure'}
                        </a>
                        {'. I\'m less a fan of layout changes, social media, and bright colours.'}
                    </p>
                    <p>
                        {'Same principle:'}
                    </p>
                    <ul>
                        <li>
                            {'A bunch of questions'}
                        </li>
                        <li>
                            {'Ticking timer'}
                        </li>
                    </ul>
                    {'Hit (Ctrl/⌘)+Enter to proceed a level or submit.'}
                    {'(Ctrl/⌘)+Q to skip a level.'}
                    <p />
                    <p>
                        {'Source and complaints:'}
                        <a href="https://github.com/werayn/js-under-pressure">
                            {'werayn/js-under-pressure'}
                        </a>
                    </p>
                </div>
            </div>
        );
    }

}

export { Welcome };
