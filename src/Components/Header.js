import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactLogo from './../logo.svg';
import HeadImage from '../Images/Head.png';
import ItunesLogo from '../Images/itunes-logo.png';
import MaterialUiLogo from '../Images/material-ui-logo.png';
import MobxLogo from '../Images/mobx-logo.png';
import RouterLogo from '../Images/react-router-logo.png';


const styles = theme => ({
  headImg: {
    minWidth: '100vw', 
    maxHeight: '23vw',
    },
  head: {
    marginTop: '-23vw',
    marginBottom: 'calc(23vw - 90px)',
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    justifyContent: 'space-between',
  },
  logos: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    height: '50px'
  },
  itunesLogo: {
    height: '60px', 
    marginTop: '-5px'
  }
});


class Header extends Component {
  render() {
    const {classes} = this.props;

    return (
        <div>
          <img src={HeadImage} alt="media search" className={classes.headImg} />
          <div className={classes.head}>
            <div classes={classes.logos}>
              <img src={ReactLogo} alt="logo" className={classes.logo}/>
              <img src={MobxLogo} alt="logo" className={classes.logo}/>
              <img src={RouterLogo} alt="logo" className={classes.logo}/>
              <img src={MaterialUiLogo} alt="logo" className={classes.logo}/>
            </div>
            <div>
              <img src={ItunesLogo} alt="logo" className={classes.itunesLogo}/>
            </div>
          </div>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('appState')(observer(Header)));