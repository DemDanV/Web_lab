var express = require('express');
var router = express.Router();

var main_controller = require('../controllers/mainController');

/* GET about us page. */
router.get('/', function(req, res, next) {
  res.render('about', { 
    title: 'Whitesquare',
    pname: 'ABOUT US',
    subjs: [ "SUBJ_1", "SUBJ_2", "SUBJ_3", "SUBJ_4", "SUBJ_5" ],
    imgs: [ "img1.jpg", "img2.jpg" ],
    navmenu: main_controller.navmenu } );
});

module.exports = router;
