const express = require('express');
const router = express.Router();



const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBQ3j5i4f-wFcLvWEaKRmE6P1xId2zD4z4'
  });

// Geocode an address.
googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function(err, response) {
    if (!err) {
      console.log(response.json.results);
    }
  });

router.get('/', function(req, res){
    res.render('bondis')
});

module.exports = router
