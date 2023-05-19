const { dbcontext } = require('../sequelize');     // подключаем объект модели БД из модуля инициализации sequelize.js
const bcrypt = require('bcrypt');       // подключаем крипто-библиотеку для валидации пароля
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
      res.json(data);
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
        'SELECT * FROM contactrequests WHERE "name" = :firstname',
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
        'UPDATE contactrequests SET message  = :reqtext , updatedAt = :updatedAt WHERE id = :id',
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

// Функция для проверки авторизации пользователя
exports.sessionCheck = (req, res, next) => {
    // Если не установлен параметр сессии user или значение cookie 'AuthToken' не равно логину пользователя
    if (!req.session.user || req.cookies['AuthToken'] != req.session.user) {
        // переадресуем на страницу /login
        res.redirect('/login');
    } else {
        // иначе исполняем следующую функцию обработчика
        next();
    }    
};


// Валидация пользователя по логину и паролю
exports.login_user = function(req, res) {
    // Получаем логин и пароль из данных формы
    var login = req.body.loginField;
    var password = req.body.passField;
    // Ищем пользователя в БД
    dbcontext.query(
        'SELECT * FROM logins WHERE "username" = :username',
        {
            replacements: { username: login },
            type: dbcontext.QueryTypes.SELECT
        }
    ).then(data => {
        var user = data[0]
        // если пользователь не найден переадресуем на страницу /login
        if (!user) {
            res.redirect('/login');
        // если пользователь найден, проверяем пароль
        } else if (!bcrypt.compareSync(password, user.password)) {
            // если пароль не прошел проверку, переадресуем на страницу /login
            res.redirect('/login');
        } else {
            // иначе регистрируем сессию пользователя (записываем логин пользователя в параметр user)
            req.session.user = user.username;
            req.session.userId = user.id;
            // высылаем сессионную cookie AuthToken с логином
            res.cookie('AuthToken', user.username);
            res.redirect('/');
        }
    })
    .catch(err => {
        // в случае исключения возвращаем код 500 + json-ответ с ошибкой
        res.status(500).json({ message: err.message });
    });
}

// Создание нового аккаунта
exports.register_user = function(req, res) {
    // Проверяем полученные данные на наличие обязательных полей
    if (!req.body.loginField || !req.body.emailField || !req.body.passField) {
        res.status(400).json({ message: "The data entered are not correct!" });    // если данные не найдены, возвращаем HTTP-код 400
    return;
    }
    // Создаем хеш пароля с солью
    const salt = bcrypt.genSaltSync();
    var hashed = bcrypt.hashSync(req.body.passField, salt);
    // Создаем пользователя в БД
    dbcontext.query(
        'INSERT INTO logins (`username`, `password`, `email`) VALUES (:username, :password, :email)',
        {
            replacements: { username: req.body.loginField, password: hashed, email: req.body.emailField },
            type: dbcontext.QueryTypes.INSERT
        }
    )
    .then(result => {
        console.log(`Registered as ${req.body.loginField}`);
        // в случае успешной записи переадресуем пользователя на страницу авторизации
        res.redirect('/login');
    })
    .catch(err => {
        // в случае исключения возвращаем код 500 + json-ответ с ошибкой
        res.status(500).json({ message: err.message });
    });
};

exports.getAllLogin = function(req, res) {
    dbcontext.query(
		'SELECT * FROM logins', { type: dbcontext.QueryTypes.SELECT }
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