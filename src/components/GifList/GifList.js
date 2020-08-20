import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0) 100%',

  },
  gridList: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'space-around',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class GifList extends Component {

  addFavorite = (index) =>{
    // set the url, description and category_id vars
    const url = this.props.reduxState.gifList[index].images.fixed_height.url;
    const description = this.props.reduxState.gifList[index].title;
    const category_id = 2;

    // dispatch the url, description and category_id vars as a payload.
    this.props.dispatch({type: 'ADD_FAVE', payload:
    {url: url,
     description: description,
     category_id: category_id //placeholder 2 = 'cohort'
    }})
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={0}>
          {this.props.reduxState.gifList.map((tile, index) => (
            <GridListTile key={tile.id} cols={tile.cols || 1}>
              <img src={tile.images.fixed_height.url} alt={tile.title} />
              <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton variant="contained" color="secondary"
                onClick={()=>this.addFavorite(index)}><FavoriteIcon/>
                </IconButton>
              }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );

  }

}

GifList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default withStyles(styles)(connect(mapStateToProps)(GifList));


// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: 500,
//     height: 450,
//   },
// });

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
// function ImageGridList(props) {
//   const { classes } = this.props;

//   return (
//     <div className={classes.root}>
//       <GridList cellHeight={160} className={classes.gridList} cols={3}>
//         {tileData.map(tile => (
//           <GridListTile key={tile.img} cols={tile.cols || 1}>
//             <img src={tile.img} alt={tile.title} />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }



// export default withStyles(styles)(ImageGridList);