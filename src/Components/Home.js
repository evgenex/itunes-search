import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MediaList from './MediaList';
import Header from './Header';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  content: {
    marginTop: 20,
  }
});


class Home extends Component {
  render() {
    const {appState, classes} = this.props;

    return (
        <div className="App">
          <Header/>
          {appState.search === '' && 
            <div className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                  iTunes Media Library Search App
                </Typography>
                <Typography gutterBottom variant="p" component="p">
                  Created by Eugene Silovs
                </Typography>
                <Typography gutterBottom variant="p" component="p" style={{marginTop: '10px'}}>
                  <small>Techniques used:</small>
                </Typography>
                <Typography gutterBottom variant="p" component="p">
                  React.js | MobX | React Router | Meterial UI
                </Typography>
            </div>
          }
        <MediaList search={appState.search}/>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('appState')(observer(Home)));