/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('re_details', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    RE_NAME: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    RE_SOURCE: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    RE_DEV_CONTENT: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    RE_DEMANDER: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    RE_DOCKING_BA: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    RE_DEVER: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    RE_WORK_TIME: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PROPOSE_TM: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '1970-01-01 00:00:00'
    },
    RE_VERSION: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    RE_UP_TM: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '1970-01-01 00:00:00'
    },
    RE_STATUS: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 're_details'
  })
}
