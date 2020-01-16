import React from 'react';

import {
  Typography,
} from '@material-ui/core';

class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <div className="err404">
        <Typography variant="h1">
          404
        </Typography>
        <Typography variant="h5">
          Page not found
        </Typography>
      </div>
    );
  }
}

export default NotFoundPage;
