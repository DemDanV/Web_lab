var express = require('express');
var router = express.Router();


var mainController = require('../controllers/mainController');  // подключение контроллера


/*
Привязываем методы контроллера к соответствующим маршрутам
*/

router.get('/', mainController.getAllLogin);
module.exports = router;