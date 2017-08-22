import React, { Component } from 'react';

import '../node_modules/picnic/releases/picnic.min.css';

import VisibleCards from './containers/VisibleCards';
import VisibleMarkers from './containers/VisibleMarkers';
import VisibleSlider from './containers/VisibleSlider';

class App extends Component {

  render() {
    return (
      <div className="App flex two">
        <VisibleSlider />
        <VisibleMarkers />
        <VisibleCards />
      </div>
    );
  }
}

export default App;
