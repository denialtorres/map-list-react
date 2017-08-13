import React from 'react';
import Card from './Card';
import scrollToComponent from "react-scroll-to-component";
import scrollToElement from "scroll-to-element";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

class CardList extends React.Component{
    constructor(props){
         // call the React.Component constructor (the super class, the one you are extending)
         super(props);
         console.log('estas en constructor')
         console.log(props.mountains)
    }
    componentDidMount(){
      this.context.store.subscribe(() => {
        let state = this.context.store.getState().selectCard;
        console.log(state.id_property);
        let selectedItem = document.getElementById(state.id_property);
        scrollToComponent(selectedItem);
      });
    }

    render(){
        return(
          <div id="search-results" className="flex three">
            {this.props.mountains.map((row, key) =>
            	<Card data={row} key={key} />
            )}
            <div ref={(section) => { this.algo = section; }}>pussi</div>
          </div>
        );
    }
}

CardList.contextTypes = { store: PropTypes.object };

export default CardList;
