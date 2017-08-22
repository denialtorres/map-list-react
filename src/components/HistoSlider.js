import React from 'react';
import PropTypes from 'prop-types'
//Slider
import Histogram from './Histogram'
import Nouislider from 'react-nouislider';
import filters from '../data/filters';
import { updateQuery } from '../actions';
var d3 = require('d3');


class HistoSlider extends React.Component{
    constructor(props, context){
         super(props, context);
         this.state = filters;
         var starter_nums = []
         props.mountains.map((row, key)=>
          starter_nums.push(row.properties.price)
          )
          this.state.text = starter_nums.join(',');
          this.state.min_value = 0;
          this.state.max_value = Math.max.apply(null, starter_nums);
    }
    componentDidMount(){
    }

    //////////////////////////////////////////////////////////7
    getNumbers(){
      var numbers = this.state.text.split(','),
      data = [];

      numbers.forEach(function(n){
        var num = parseFloat(n);
        if(!isNaN(num)) data.push(num);
      });

      return data;
    }
    ///////////////////////////////////////////////////////
    updateFilter(id, value) {
      console.log('activas')
      console.log(id) //elevation_height
      console.log(value[0]) // 14605
      console.log(value[1])
      let current_filters = this.state.filters;
      current_filters[id] = value;
      this.setState({
        filters: current_filters,
        min_value: value[0],
        max_value: value[1]
      }, () => {
        this.updateStore();
      });
    }
    ///////////////////////////////////////////////////////////
    updateStore() {
      this.context.store.dispatch(
        updateQuery(this.state.query, this.state.show_filters, this.state.filters)
      );
    }
   ///////////////////////////////////////////////////////////////
    render(){
      var data = this.getNumbers();
      var maxvalue = Math.max.apply(null, data);

        return(
          <div className="search-filters">
            <div className="algo">
               <h2>Este es el elemento</h2>
               <Histogram data={data} />
               <div className= "esslider">
                <Nouislider
                  range={
                    {
                     min: [0],
                     max: maxvalue
                   }
                  }
                  start={[this.state.min_value, this.state.max_value]}
                  //onChange={array => {console.log(array)}}
                  onChange={this.updateFilter.bind(this, 'price_value')}
                />
              </div>
              <h2>Valor Minimo: {this.state.min_value}</h2>
              <h2>Valor Maximo: {this.state.max_value}</h2>
            </div>
          </div>
        );
    }
}

HistoSlider.contextTypes = { store: PropTypes.object };

export default HistoSlider;
