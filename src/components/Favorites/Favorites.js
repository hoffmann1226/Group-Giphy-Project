import React, { Component } from 'react';
import { connect } from 'react-redux';
import './favorites.css'
import FavItem from '../FavItem/FavItem.js';

class Favorites extends Component {

  state = {
    gif_id: '',
    category_id: ''
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_FAVE'})
    this.props.dispatch({type: 'FETCH_CATEGORY'});
  }

  handleClick=(event)=>{
    console.log('state =', this.state);
    //dispatch state to put saga
    this.props.dispatch({type: 'PUT_CATEGORY', payload: this.state})
  }

  handleChange =(gif)=>(event) =>{
    this.setState({
      gif_id: gif,
      category_id: Number(event.target.value)
    })
  }//end handleChange


  render() {
    return (
      <div>
        <h1>In favorites</h1>
       {/*{JSON.stringify(this.props.reduxState.categoryList)}*/}
        <ul className = "fave">
            {this.props.reduxState.faveList.map (gif =>
                <FavItem gif={gif}/>)}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Favorites);
