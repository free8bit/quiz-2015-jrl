var path = require('path');

// Cargar modulo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: "quiz.sqlite"
});

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar definicion de tabla Quiz
exports.Quiz = Quiz;

// Sequielize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function () {
            // succes(...) ejecuta el manejador una vez creada la tabla
            Quiz.count().success(function (count) {
                    if (count === 0) { // La tabla solo se inicializa si esta vacia
                        Quiz.create({
                                pregunta: 'Capital de Italia',
                                respuesta: 'Roma'
                            })
                            .success(function () {
                                console.log('Base de Datos inicializada')
                            });
                    };
                });
});
