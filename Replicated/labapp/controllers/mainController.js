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
exports.get_contact_req_all = function(req, res) {
    dbcontext.query(
        'SELECT * FROM contactrequests', { type: dbcontext.QueryTypes.SELECT }
    )
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred on the server."
      });
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
    // Проверяем полученные данные на наличие обязательных полей (firstname и reqtext)
    if (!req.body.name_user || !req.body.object_user) {
            res.status(400).json({ message: "Data validation error!" });    // если данные не найдены, возвращаем HTTP-код 400
        return;
    }
    // Записываем объект в БД
    var curDateTime = new Date(Date.now());
    console.log(curDateTime);
    dbcontext.query(
        'INSERT INTO contactrequests (`name`,`email`, `objects`, `message`,`cratedAt`,`updatedAt`) VALUES (:name_user, :email_user, :object_user, :message_user, :cratedAt, :updatedAt)',
        {
            replacements: { name_user: req.body.name_user, email_user: req.body.email_user, object_user: req.body.object_user, 
            message_user: req.body.message_user,cratedAt: curDateTime.toISOString(), updatedAt: curDateTime.toISOString() },
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
    // Проверяем полученные данные на наличие обязательного поля reqtext
    if (!req.body.reqtext) {
        res.status(400).json({ message: "Data validation error!" });
    return;
    }
    var curDateTime = new Date(Date.now());
    // Обновляем запись в БД
    dbcontext.query(
        'UPDATE contactrequests SET reqtext = :reqtext, updatedAt = :updatedAt WHERE id = :id',
        {
            replacements: { id: req.params.id, reqtext: req.body.reqtext, updatedAt: curDateTime.toISOString() },
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