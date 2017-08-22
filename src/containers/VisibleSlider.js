import { connect } from 'react-redux';
import React, { Component } from 'react';
import HistoSlider from '../components/HistoSlider';

import getVisibleMountains from '../helpers/getVisibleMountains';

import mountains from '../data/mountains';

const mapStateToProps = (state) => {
  return {
    mountains: getVisibleMountains(
      mountains,
      state.search.query,
      state.search.filters
    )
  }
}

const VisibleSlider = connect(
  mapStateToProps
)(HistoSlider);

export default VisibleSlider
