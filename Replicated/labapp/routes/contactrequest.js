var express = require('express');
var router = express.Router();

var mainController = require('../controllers/mainController');  // подключение контроллера

/*
Привязываем методы контроллера к соответствующим маршрутам
*/
router.get('/', mainController.get_contact_req_all); //http://127.0.0.1:3000/api/contactrequest 
router.get('/author/:firstname', mainController.get_contact_req_by_firstname); //http://127.0.0.1:3000/api/contactrequest/author/Tom 
router.get('/:id', mainController.get_contact_req_by_id); //http://127.0.0.1:3000/api/contactrequest/1 
router.post('/', mainController.create_contact_req); //http://127.0.0.1:3000/api/contactrequest 
router.put('/:id', mainController.update_contact_req_by_id);
router.delete('/:id', mainController.delete_contact_req_by_id);

module.exports = router;