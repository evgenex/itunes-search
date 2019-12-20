import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Chip from '@material-ui/core/Chip';
//import Header from './Header';

const styles = theme => ({
  root: {

    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 345,
  },
  cardActions: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
  },
  media: {
    height: 300,
    textAlign: 'center'
  },
  audio: {
    //padding: theme.spacing.unit * 2,
    width: '100%'
  }, 
  chip: {
    margin: theme.spacing.unit,
  },
});


class ViewTrack extends Component {
  state = {
    fav: false,
  }

  getfavIndex(){
    const track = this.props.appState.viewTrackDetails;
    const isFav = (element) => element.trackId === track.trackId;
    const favInd = this.props.appState.favTracks.findIndex(isFav);
    return favInd;
  }

  componentDidMount() {
    this.doSearch();

  }

  handleClick = () => {
    const track = this.props.appState.viewTrackDetails;
      if(this.state.fav===false){
          this.props.appState.favTracks.push(track);
          this.setState({fav: true});
      }else{
          this.props.appState.favTracks.splice(this.getfavIndex(), 1);
          this.setState({fav: false});
      }
  }

  doSearch = () => {
    
    const queryStr = this.props.appState.viewTrackId;
    
    fetch(`https://itunes.apple.com/lookup?id=${queryStr}`, { mode: 'cors' })
    .then(res => res.json())
    .then(({ results }) => this.props.appState.viewTrackDetails = results[0])
    .then(()=>{
      if(this.getfavIndex() >- 1){
        this.setState({fav: true});
      }
    })
  }


  render() {
    const {classes, appState} = this.props;
    const track = appState.viewTrackDetails;

    return (
        <div className={classes.root}>
          <Card className={classes.card}>
            {(track.kind === 'song' || track.kind === 'podcast' )? 
              <div>
                <CardMedia
                  className={classes.media}
                  image={track.artworkUrl100}
                  title={track.trackName}
                />
                <audio controls className={classes.audio}>
                  <source src={track.previewUrl} type="audio/ogg"/>
                </audio>
              </div>
              :
              <div>
                <video controls className={classes.audio}>
                    <source src={track.previewUrl} type="video/mp4"/>
                </video>
              </div>
              }
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {track.artistName}
                </Typography>
                <Typography gutterBottom variant="h6" component="h4">
                  {track.trackName}
                </Typography>
                <Typography component="p" style={{marginTop: 10}}>
                  {track.collectionName}
                </Typography>
              </CardContent>
            <CardActions className={classes.cardActions}>
                <Chip label={track.primaryGenreName} className={classes.chip} />
                <IconButton aria-label="Add to favourites" onClick={this.handleClick}>
                    {(this.state.fav)? <StarIcon className={classes.playIcon} color="secondary"/> : 
                    <StarBorderIcon className={classes.playIcon} color="secondary"/> }
                </IconButton>
            </CardActions>
          </Card>
        </div>
    );
  }
}

ViewTrack.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('appState')(observer(ViewTrack)));