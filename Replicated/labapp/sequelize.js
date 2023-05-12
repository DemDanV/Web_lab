const Sequelize = require('sequelize'); // подключаем пакет sequalize
// Подключение к БД SQLite
const dbcontext = new Sequelize({ 
	dialect: "sqlite", 
	storage: "dataBases/appqb.sqlite"
}); 
// Экспорт подключения к БД для использования в других модулях
module.exports = { 
	dbcontext 
} 	