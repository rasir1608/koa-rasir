/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('re_users', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    USERNAME: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    NICKNAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TYPE_CODE: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    TYPE_CODE_NAME: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    PWD: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    LEADER_USER: {
      type: DataTypes.STRING(30),
      allowNull: true
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
    tableName: 're_users'
  })
}
