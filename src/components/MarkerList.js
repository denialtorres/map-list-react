import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import PropTypes from 'prop-types'
import { selectCard } from '../actions';

export default class MarkerList extends Component {

  constructor(props, context) {
  	super(props, context);
    this.state = {
      defaultCenter: {
        lat: 39.113014,
        lng: -105.358887
      },
      windowPosition: null,
      showInfoWindow: false,
      current_name: ''
    }
	}

	componentWillMount() {
		this.context.store.subscribe(() => {
			let state = this.context.store.getState().currentSelections;
      console.log('cambio');
      this.setState({
		 		windowPosition: state.position,
		 		showInfoWindow: state.showInfoWindow,
		 		current_name: state.key
		 	});
		});
	}

  clickMarker(marker_id){
    console.log('diste click');
    console.log(marker_id)
    //this.context.store.dispatch(updateSelection(key, position, showInfoWindow));
    this.context.store.dispatch(
      selectCard(marker_id)
    );
  }



	render() {

		let mountains = this.props.mountains;

		return (
		  <section style={{position: "fixed", height: "100%", width: "40%"}}>
		    <GoogleMapLoader
		      containerElement={
		        <div
		          style={{
		            height: "100%",
		          }}
		        />
		      }
		      googleMapElement={
		        <GoogleMap
		          defaultZoom={7}
		          defaultCenter={this.state.defaultCenter}
		        >
    			    {mountains.map((row, key) => (
    			      <Marker
    			        position={{lat: row.geometry.coordinates[1], lng: row.geometry.coordinates[0]}}
    			        key={row.properties.name}
    			        //onClick={this.toggleInfoWindow.bind(this, row.properties.name)}
                  onClick = {this.clickMarker.bind(this, row.properties.id)}
    			      >

    			      </Marker>

    			    ))}

	            {
	              this.state.showInfoWindow &&
	              <InfoWindow
	                position={this.state.windowPosition}
	                onCloseclick={(e) => { this.setState({ showInfoWindow: false }) }}
	                options={{pixelOffset: new window.google.maps.Size(0,-30)}}
	                >
	              	{this.state.current_name}
	              </InfoWindow>
	            }
		        </GoogleMap>
		      }
		    />
		  </section>
		);
	}
}

MarkerList.contextTypes = { store: PropTypes.object };
