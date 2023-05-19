var express = require('express');
var router = express.Router();


var mainController = require('../controllers/mainController');  // подключение контроллера


/*
Привязываем методы контроллера к соответствующим маршрутам
*/

router.get('/', mainController.getAllLogin);
// router.post('/', mainController.createLogin);
// router.delete('/', mainController.deleteAllLogin);
// router.post('/enter/', mainController.loginCheck);
module.exports = router;