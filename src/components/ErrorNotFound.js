import React, { PureComponent } from 'react';

import Typography from '@material-ui/core/Typography';

import '../css/404.css'

class ErrorNotFound extends PureComponent {

    render() {
        return (
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <Typography variant="h2" gutterBottom style={{ marginTop: '40px' }}>404 - Page not found</Typography>
                    <Typography variant="p" gutterBottom>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</Typography>
                </div>
            </div>
        );
    }
}

export default (ErrorNotFound);