import React, { Component } from 'react';
import { updateSelection } from '../actions';
import PropTypes from 'prop-types'
import scrollToComponent from "react-scroll-to-component";



export default class Card extends Component {
  componentDidMount(){

  }

  showInfoWindow(properties, coordinates, event) {
    let position = {
      lat: coordinates[1],
      lng: coordinates[0]
    };
    let showInfoWindow = true;
    this.context.store.dispatch(
      updateSelection(properties.name, position, showInfoWindow)
    );
  }

  hideInfoWindow() {
    let key = null;
    let position = null;
    let showInfoWindow = false;
    this.context.store.dispatch(updateSelection(key, position, showInfoWindow));
  }

  render() {
    let photo = "/photos/" + this.props.data.photo;
    let properties = this.props.data.properties;
    let coordinates = this.props.data.geometry.coordinates;
    return (
      <div
        className="card-container"
        id= {properties.id}
        onMouseEnter={this.showInfoWindow.bind(this, properties, coordinates)}
        onMouseLeave={this.hideInfoWindow.bind(this)}>
        <div className="card">
          <div className="photo-container">
            <img src={photo} alt={properties.name} className="photo" />
          </div>
          <div className="details-container">
            {/* <div className="name">{ properties.name }</div> */}
            <div className="name">{ properties.price }</div>
            <div className="range">{ properties.range }</div>
            <div className="details">
              <ul>
                <li><strong>Elevation</strong> { properties.elevation[0].toLocaleString() } ft, { properties.elevation[1].toLocaleString() } m</li>
                <li><strong>Prominence</strong> { properties.prominence[0].toLocaleString() } ft, { properties.prominence[1].toLocaleString() } m</li>
                <li><strong>Isolation</strong> { properties.isolation[0].toLocaleString() } mi, { properties.isolation[1].toLocaleString() } km</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.contextTypes = { store: PropTypes.object };
