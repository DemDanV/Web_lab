var express = require('express');
var router = express.Router();

var main_controller = require('../controllers/mainController');

/* GET about us page. */
router.get('/', function(req, res, next) {
  res.render('android', { 
    title: 'android',
    navmenu: main_controller.navmenu } );
});

module.exports = router;
