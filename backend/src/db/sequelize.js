const Sequelize = require('sequelize');

const sequelize = new Sequelize('b2b-data', 'examen', 'fullExam2020', {
    host: 'fullstack-examen.c6tid4wxmmxn.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
});
sequelize.authenticate().then().catch(err => console.log("err",err));

module.exports = sequelize;
