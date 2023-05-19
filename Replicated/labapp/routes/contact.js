var express = require('express');
var router = express.Router();

// var main_controller = require('../controllers/mainController');
// подключение необходимых ресурсов из контроллера
var { navmenu, sessionCheck } = require('../controllers/mainController');
/* GET users listing. */
router.get('/', sessionCheck, function(req, res, next) {
  res.render('contact', { 
    title: 'contact',
    navmenu: navmenu });
});

// Обработка POST-запроса (принимаем данные, отправленные c помощью AJAX со страницы /contact)
router.post("/ajaxrequest", function (req, res) {
  // console.log(req.body);  // выводим в консоль полученные данные
  if(!req.body) return response.sendStatus(400);
  // Читаем поле firstname из полученного json
  try {
    var msg = req.body.firstname + ", ваш запрос получен!!! !";
  } catch(err) {
    console.error(err)
  }

  res.json({ message: msg }); // отправляем ответ
});

module.exports = router;
