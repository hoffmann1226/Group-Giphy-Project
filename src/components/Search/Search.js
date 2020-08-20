import React, { Component } from 'react';
import { connect } from 'react-redux';
import GifList from '../GifList/GifList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Search extends Component {

  // initialize the state
  state = {
    searchText: '',
  }

  // dispatch search string to server
  gifSearch = (event) => {
    event.preventDefault();
    console.log('in gifSearch searching for:', this.state.searchText)
    this.props.dispatch({type: 'SET_SEARCH', payload: this.state.searchText})
  }

  // textbox change handler
  changeHandle = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }


  render() {
    return (
      <div>
        <form onSubmit={this.gifSearch}>
          <TextField type="text" onChange={this.changeHandle}  value={this.state.searchText}/>
          <Button type='submit' color='primary' variant = 'contained'>Search</Button>
        </form>
        <GifList/>
      </div>
    );
  }

}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Search);
