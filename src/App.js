import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Favs from './Components/Favs';
import AppState from './AppState';
import NavBar from './Components/NavBar';
import ViewTrack from './Components/ViewTrack';


class App extends Component {
  render() {
    
    return (
      <Provider appState={new AppState()}>
        <Router>
          <div>
            <NavBar/>

            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/viewtrack" component={ViewTrack}/>
            <Route path="/favs" component={Favs}/>
          </div>
      </Router>
    </Provider>
    );
  }
}

export default observer(App);
