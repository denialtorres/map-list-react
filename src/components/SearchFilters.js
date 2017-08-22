import React, { Component } from 'react';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types'




import '../../node_modules/react-input-range/lib/bundle/react-input-range.css';

import filters from '../data/filters';
import { updateQuery } from '../actions';

//Slider
import Histogram from './Histogram'
import Nouislider from 'react-nouislider';
var d3 = require('d3');
///////////////////////////////

class SearchFilters extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = filters;
    console.log(this.context)

    console.log('ESSSTAS EN constructor')
    console.log(this.state.filters.elevation_height)
    var starter_nums = [
    0,1,1,2,3,3,3,3,4,4,4,4,4,5,5,15,15,15,
    5,5,5,5,6,6,6,6,6,7,8,7,8,8,9,12,12,0,11,19
    ]
    this.state.text = starter_nums.join(',');
    this.state.min_value = 0;
    this.state.max_value = 100;
    console.log(filters)
    console.log(props)
  }

  componentDidMount(){
    console.log("JOHN CENA")
    this.context.store.subscribe(() => {
      console.log("componentDidMount")
    });
    console.log(this.state)
    console.log(this.context)
  }

  getNumbers(){
    var numbers = this.state.text.split(','),
    data = [];

    numbers.forEach(function(n){
      var num = parseFloat(n);
      if(!isNaN(num)) data.push(num);
    });

    return data;
  }

  getValues(e){
    this.setState({
       min_value: e[0],
       max_value: e[1]
     })
     this.updateFilter.bind(this, 'elevation_height')
  }



  updateStore() {
    this.context.store.dispatch(
      updateQuery(this.state.query, this.state.show_filters, this.state.filters)
    );
  }

  onQueryChange(event) {
    this.setState({
      query: event.target.value.toLowerCase()
    }, () => {
      this.updateStore();
    });
  }

  toggleFilters(event) {
    var show_filters = !this.state.show_filters;
    this.setState({
      show_filters
    });
  }

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

  render() {
    var data = this.getNumbers();
    var maxvalue = Math.max.apply(null, data);
    return (
      <div className="search-filters">
        <div className="query-container">
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

        <div className={this.state.show_filters ? '' : 'hidden'}>
          <ul className="ranges">
            <li>
              <div className="label-text">Elevation</div>
              <div className="flex two">
                <div className="range-container">
                  <InputRange
                    maxValue={15000}
                    minValue={10000}
                    value={this.state.filters.elevation_height}
                    labelSuffix=" ft"
                    onChange={ this.updateFilter.bind(this, 'elevation_height')}
                  />
                </div>
                <div className="range-container">
                  <InputRange
                    maxValue={5000}
                    minValue={2000}
                    value={this.state.filters.elevation_distance}
                    labelSuffix=" m"
                    onChange={this.updateFilter.bind(this, 'elevation_distance')}
                  />
                </div>
              </div>
            </li>

            <li>
              <div className="label-text">Prominence</div>
              <div className="flex two">
                <div className="range-container">
                  <InputRange
                    maxValue={5000}
                    minValue={300}
                    value={this.state.filters.prominence_height}
                    labelSuffix=" ft"
                    onChange={this.updateFilter.bind(this, 'prominence_height')}
                  />
                </div>
                <div className="range-container">
                  <InputRange
                    maxValue={3000}
                    minValue={90}
                    value={this.state.filters.prominence_distance}
                    labelSuffix=" m"
                    onChange={this.updateFilter.bind(this, 'prominence_distance')}
                  />
                </div>
              </div>
            </li>

            <li>
              <div className="label-text">Isolation</div>
              <div className="flex two">
                <div className="range-container">
                  <InputRange
                    maxValue={700}
                    minValue={1}
                    value={this.state.filters.isolation_height}
                    labelSuffix=" mi"
                    onChange={this.updateFilter.bind(this, 'isolation_height')}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}


SearchFilters.contextTypes = { store: PropTypes.object };
export default SearchFilters;
