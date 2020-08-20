const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();

router.get('/:query', (req, res) => {

    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.query}&rating=pg-13&limit=100`)
    .then( (response) => {
        console.log( 'Successfully got search results' );
        res.send(response.data);
    })
    .catch( (err) => {
        console.log('An error occured while searching for a gif:', err);
        res.sendStatus(500);
    })

})

module.exports = router;