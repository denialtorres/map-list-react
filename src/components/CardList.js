import React from 'react';
import Card from './Card';
import scrollToComponent from "react-scroll-to-component";
import scrollToElement from "scroll-to-element";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

class CardList extends React.Component{
    constructor(props){
         super(props);
    }
    componentDidMount(){
      this.context.store.subscribe(() => {
        console.log("componentDidMount")
        let state = this.context.store.getState().selectCard;
        console.log(state.id_property);
        //let selectedItem = document.getElementById(state.id_property);
        //scrollToComponent(selectedItem);


         this.setState({
           id_property: state.id_property
         });
      });
    }
    componentDidUpdate(prevProps, prevState) {
      console.log("ESTAS EN COMPONENTE DID UPDATE")
      console.log(prevState)
      console.log(this.state)
      if(this.state !== prevState && prevState !== null)
      { console.log("SON DIFERENTES")
        if(document.getElementById(prevState.id_property)){
          console.log("ELEMENTO EXISTE")
          let oldItem = document.getElementById(prevState.id_property)
          let selectedItem = document.getElementById(this.state.id_property);
          oldItem.style.border = null
          selectedItem.style.border = "3px solid black"
          scrollToComponent(selectedItem)
        }


      }
      console.log(prevProps)
    }

    render(){
        return(
          <div id="search-results" className="flex three">
            {this.props.mountains.map((row, key) =>
            	<Card data={row} key={key} />
            )}
          </div>
        );
    }
}

CardList.contextTypes = { store: PropTypes.object };

export default CardList;
