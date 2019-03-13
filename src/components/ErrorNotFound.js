import React, { PureComponent } from 'react';

export default class ErrorNotFound extends PureComponent {

    render() {
        return (
            // <div style={{ width: '100%', height: '100%', float: 'left', position: 'fixed', background: 'white' }}>
            <div>
                <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
                <p className="notFoundDesc">
                    It looks like nothing was found at this location.
                    Maybe try one of the links in the menu or press back to go to the previous page.
                </p>
            </div>
        );
    }
}