var express = require('express');
var router = express.Router();

var main_controller = require('../controllers/mainController');

/* GET about us page. */
router.get('/', function(req, res, next) {
  res.render('unity', { 
    title: 'Whitesquare',
    pname: 'UNITY',
    subjs: [ "SUBJ_1", "SUBJ_2", "SUBJ_3", "SUBJ_4", "SUBJ_5" ],
    imgs: [ "img1.jpg", "img2.jpg" ],
    navmenu: main_controller.navmenu } );
});

module.exports = router;

$(window).load(function () {
  //new WOW().init();
  // initialize isotope
  var $container = $('.portfolio_container');
  $container.isotope({
      filter: '*',
  });

  $('.portfolio_filter a').click(function () {
      $('.portfolio_filter .active').removeClass('active');
      $(this).addClass('active');

      var selector = $(this).attr('data-filter');
      $container.isotope({
          filter: selector,
          animationOptions: {
              duration: 500,
              animationEngine: "jquery"
          }
      });
      return false;
  });
})