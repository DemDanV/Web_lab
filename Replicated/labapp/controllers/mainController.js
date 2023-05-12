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

// const Sequelize = require('sequelize'); // подключаем пакет sequalize
// // Подключение к БД SQLite
// const dbcontext = new Sequelize({
// dialect: "sqlite",
// storage: "appdb.sqlite"
// });
// // Экспорт подключения к БД для использования в других модулях
// module.exports = {
//   bcontext
// };

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