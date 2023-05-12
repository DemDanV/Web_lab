var express = require('express');
var router = express.Router();

var main_controller = require('../controllers/mainController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact',
    pname: 'CONTACT',
    navmenu: main_controller.navmenu });
});

module.exports = router;
