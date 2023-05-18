var express = require('express');
var router = express.Router();

// Подключение контроллера с переменной, содержащей структуру навигационного меню
var main_controller = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'index',
    navmenu: main_controller.navmenu } );
});

module.exports = router;
