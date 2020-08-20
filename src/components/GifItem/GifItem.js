import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


class GifItem extends Component {

  addFavorite = (event) =>{
    this.props.dispatch({type: 'ADD_FAVE', payload:
    {url: this.props.gif.images.downsized.url,
     description: this.props.gif.title,
     category_id: 2 //placeholder 2 = 'cohort'
    }})
  }

// url, description, category_id

  render() {
    return (
      <tr>
        <td>
          <img src={this.props.gif.images.downsized.url} alt={this.props.gif.title} />
        </td>
        <IconButton variant="contained" color="secondary"
        onClick={this.addFavorite}><FavoriteIcon/>
        </IconButton>
      </tr>
    );
  }

}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(GifItem);
