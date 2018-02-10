/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('re_time', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    SOURCE: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    VERSION: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    WORK_TIME: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 're_time'
  })
}
