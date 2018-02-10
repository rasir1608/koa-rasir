/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('re_version', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    VERSION: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    ACTIVE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RE_UP_TM: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '1970-01-01 00:00:00'
    }
  }, {
    tableName: 're_version'
  })
}
