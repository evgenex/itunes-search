import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TrackItem from './TrackItem';


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


class MediaList extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      this.doSearch();
    }
  }

  doSearch = () => {
    
    const queryStr = this.props.search.split(/ +/).join('+');
    
    fetch(`https://itunes.apple.com/search?term=${queryStr}&limit=25`, { mode: 'cors' })
    .then(res => res.json())
    .then(({ results }) => this.props.appState.tracks = results)
  }


  render() {
    const {classes, appState} = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {appState.tracks.map((track, index) => (
            (track.kind === 'song' || track.kind === 'feature-movie' || track.kind === 'tv-episode') && 
            <Grid item sm={12} md={6} >
               <TrackItem track={track} type='search' key={index} count={index}/>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('appState')(observer(MediaList)));