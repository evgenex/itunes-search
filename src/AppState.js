import { extendObservable } from 'mobx';

class AppState {
  constructor() {
    extendObservable(this, {
      currentPage: 'Main',
      search: '',
      tracks: [],
      favTracks: [],
      viewTrackId:'',
      viewTrackDetails:[],
    });
  }

  searchStr(str) {
    this.search = str;
  }

}

export default AppState;
