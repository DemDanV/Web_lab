// В модулях-контроллерах реализуются методы (бизнес-логика) для работы с объектами БД.
const { dbcontext } = require('../sequelize');     // подключаем объект модели БД из модуля инициализации sequelize.js

exports.navmenu = [
    {
        name: 'HOME',
        addr: '/'
    },
    {
        name: 'ABOUT US',
        addr: '/about'
    },
    {
        name: 'UNITY',
        addr: '/unity'
    },
    {
        name: 'ANDROID',
        addr: '/android'
    },
    {
        name: 'BLOG',
        addr: '/blog'
    },
    {
        name: 'CONTACT',
        addr: '/contact'
    }
];

// Показать запрос по id (primary key).
exports.get_contact_req_by_id = function(req, res) {
    dbcontext.query(
    'SELECT * FROM contactrequests WHERE id = :id',
    {
    replacements: { id: req.params.id },
    type: dbcontext.QueryTypes.SELECT
    }
    )
    .then(data => {
    res.json(data[0]);
    })
    .catch(err => {
    res.status(500).json({ message: err.message });
    });
};
// Показать список всех запросов.



const { dbcontext } = require('../sequelize');

	


exports.get_contact_req_all = function(req, res) {
    dbcontext.query(
		'SELECT * FROM contactrequests', { type: dbcontext.QueryTypes.SELECT }
    )
    .then(data => {
		res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred on the server."
      });
    });
};
  
// Показать запрос по id (primary key).
exports.get_contact_req_by_id = function(req, res) {
    dbcontext.query(
        'SELECT * FROM contactrequests WHERE id = :id',
        {
            replacements: { id: req.params.id },
            type: dbcontext.QueryTypes.SELECT
        }
    )
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};
  
// Показать запрос по имени автора.
exports.get_contact_req_by_firstname = function(req, res) {
    dbcontext.query(
        'SELECT * FROM contactrequests WHERE "firstname" = :firstname',
        {
            replacements: { firstname: req.params.firstname },
            type: dbcontext.QueryTypes.SELECT
        }
    )
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
};
  
// Создать новый запрос.
exports.create_contact_req = function(req, res) {
    // Проверяем полученные данные на наличие обязательных полей (firstname и reqMessage)
	console.log("Enter Post");
	
	//firstname
	//lastname
	//email	
	//reqMessage	
	//reqObject
	console.log(req.body.firstname);
	console.log(req.body.lastname);
	console.log(req.body.email);
	console.log(req.body.reqMessage);
	console.log(req.body.reqObject);


    if (!req.body.firstname || !req.body.reqMessage) {
            res.status(400).json({ message: "Data validation error!" });    // если данные не найдены, возвращаем HTTP-код 400
        return;
    }
    // Записываем объект в БД
    var curDateTime = new Date(Date.now());
    dbcontext.query(
        'INSERT INTO contactrequests (`firstname`,`lastname`,`email`,`reqMessage`,`reqObject`,`createdAt`,`updatedAt`) VALUES (:firstname, :lastname, :email, :reqMessage, :reqObject, :createdAt, :updatedAt)',
        {
            replacements: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, 
                reqMessage: req.body.reqMessage, reqObject: req.body.reqObject, createdAt: curDateTime.toISOString(), updatedAt: curDateTime.toISOString() },
            type: dbcontext.QueryTypes.INSERT
        }
    )
    .then(data => {
        res.json({ message: "ContactRequest Created!" });
      })
      .catch(err => {
          res.status(500).json({ message: err.message });
    });
};
  
// Удалить запрос по id из таблицы
exports.delete_contact_req_by_id = function(req, res) {
    dbcontext.query(
        'DELETE FROM contactrequests WHERE id = :id',
        {
            replacements: { id: req.params.id },
            type: dbcontext.QueryTypes.DELETE
        }
    )
    .then(data => {
      res.json({ message: "ContactRequest Deleted!" });
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
};
  
// Обновить текст запроса по id в таблице
exports.update_contact_req_by_id = function(req, res) {
    // Проверяем полученные данные на наличие обязательного поля reqMessage
    if (!req.body.reqMessage) {
        res.status(400).json({ message: "Data validation error!" });
    return;
    }
    var curDateTime = new Date(Date.now());
    // Обновляем запись в БД
    dbcontext.query(
        'UPDATE contactrequests SET reqMessage = :reqMessage, updatedAt = :updatedAt WHERE id = :id',
        {
            replacements: { id: req.params.id, reqMessage: req.body.reqMessage, updatedAt: curDateTime.toISOString() },
            type: dbcontext.QueryTypes.UPDATE
        }
    )
    .then(data => {
      res.json({ message: "ContactRequest Updated!" });
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
};