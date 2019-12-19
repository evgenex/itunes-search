import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: { main: blue[800] }, 
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
