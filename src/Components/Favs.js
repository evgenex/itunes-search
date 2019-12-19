import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TrackItem from './TrackItem';
import Header from './Header';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 50
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
})


class Favs extends Component {

  render() {
    const {classes, appState} = this.props;
    return (
      <div>
        <Header/>
        <div className={classes.root}>
          <Grid container spacing={24}>
            {appState.favTracks.map((track, index) => (
              <Grid item sm={12} md={6} >
                <TrackItem track={track} type='favs' key={index} count={index}/>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

Favs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('appState')(observer(Favs)));