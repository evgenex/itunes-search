import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class About extends Component {
  render() {
    const {appState} = this.props;
    return (
      <div className="App">
        <h1>This is About</h1>
        <p>this stored number {appState.count}</p>
      </div>
    );
  }
}

export default inject('appState')(observer(About));