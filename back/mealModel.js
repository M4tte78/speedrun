const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('fouduplat', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Meal = sequelize.define('Meal', {
  idMeal: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  strMeal: DataTypes.STRING,
  strMealThumb: DataTypes.STRING,
  strInstructions: DataTypes.TEXT
}, {
  timestamps: false
});

module.exports = Meal;