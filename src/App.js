import React, { Component } from 'react';

import '../node_modules/picnic/releases/picnic.min.css';

import VisibleCards from './containers/VisibleCards';
import VisibleMarkers from './containers/VisibleMarkers';
import SearchFilters from './components/SearchFilters';

class App extends Component {

  render() {
    return (
      <div className="App flex two">
        <VisibleMarkers />
        <VisibleCards />
      </div>
    );
  }
}

export default App;
