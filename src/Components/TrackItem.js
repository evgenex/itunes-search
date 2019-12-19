import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MusicIcon from '@material-ui/icons/MusicNote';
import MovieIcon from '@material-ui/icons/Movie';
import {Link} from 'react-router-dom';

const styles = theme => ({
    card: {
      display: 'flex',
      maxHeight: 100,
      textAlign: 'left',
    },
    details: {
        width: '100%'
    },
    content: {
        float: 'left',
    },
    cover: {
      width: 100,
      height: 100,
    },
    controls: {
        float: 'right',
    },
    playIcon: {
      height: 30,
      width: 30,
    },
    typeIcon: {
        height: 30,
        width: 30,
        padding: 11,
      },
  });

  

class TrackItem extends Component {
    state = {
        fav: false,
    }

    

    componentDidMount(){
        const track = this.props
        let title = track.trackName;
        let artist = track.artistName;
        
        if(title && artist){
            if(title.length > 25){title = title.substr(0, 25) + ' ...'}
            if(artist.length > 25){artist = artist.substr(0, 25) + ' ...'}
        }
        if(this.props.type === 'favs'){
            this.setState({fav: true});
       }

    }

    handleClick = () => {
        if(this.state.fav===false){
            this.props.appState.favTracks.push(this.props.track);
            this.setState({fav: true});
        }else{
            this.props.appState.favTracks.splice(this.props.count, 1);
        }
    }

    render() {
        const { classes, track } = this.props;
        const title = track.trackName;
        const artist = track.artistName;

        const isFav = (element) => element.trackId === track.trackId
        const favInd = this.props.appState.favTracks.findIndex(isFav)

    return (
        <Card className={classes.card}>
            <Link to="/viewtrack" onClick={()=>this.props.appState.viewTrackId=track.trackId} >
            <CardMedia
                className={classes.cover}
                image={track.artworkUrl100}
                title={track.trackName}
            />
            </Link> 
            <div className={classes.details}>
            <Link to="/viewtrack" onClick={()=>this.props.appState.viewTrackId=track.trackId} >
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {artist}
                    </Typography>
                </CardContent>
                </Link>
                {this.props.type === 'favs' && 
                    <div className={classes.controls}>
                        <IconButton aria-label="Add to favourites" onClick={this.handleClick}>
                            {(this.state.fav || favInd > -1 )? <StarIcon className={classes.playIcon} color="secondary"/> : 
                            <StarBorderIcon className={classes.playIcon} color="secondary"/> }
                        </IconButton>
                    </div>
                }
                <div className={classes.controls}>
                    {(track.kind === 'song' || track.kind === 'podcast')? <MusicIcon className={classes.typeIcon} color="disabled"/> : 
                     (track.kind === 'feature-movie' || track.kind === 'tv-episode')?<MovieIcon className={classes.typeIcon} color="disabled"/> :
                     <div></div>
                    }
                </div>
            </div>
        </Card>
    );
    }
}

TrackItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('appState')(observer(TrackItem)));