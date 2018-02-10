/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : report

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-01-17 18:41:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for re_users
-- ----------------------------
DROP TABLE IF EXISTS `re_users`;
CREATE TABLE `re_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `USERNAME` varchar(50) NOT NULL COMMENT '登录名/账号',
  `NICKNAME` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `TYPE_CODE` varchar(32) DEFAULT NULL,
  `TYPE_CODE_NAME` varchar(32) DEFAULT NULL,
  `PWD` varchar(100) DEFAULT NULL COMMENT '密码，仅在自己校验是保存密码',
  `LEADER_USER` varchar(30) DEFAULT NULL COMMENT '创建者用户账号',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `USERNAME` (`USERNAME`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of re_users
-- ----------------------------
INSERT INTO `re_users` VALUES ('2', '80002755', '开发', '1', null, '123', '', '2017-09-05 11:03:08', '2017-09-05 11:03:08');
INSERT INTO `re_users` VALUES ('25', '88889999', '5555555777', '2,0,1', 'BA,管理员,开发', '666666', null, '2017-09-08 03:53:58', '2017-09-13 03:04:10');
INSERT INTO `re_users` VALUES ('29', 'admin', '管理员', '0,1,2', '管理员,开发,BA', 'admin', null, '2017-09-08 12:14:10', '2017-09-08 12:14:10');
INSERT INTO `re_users` VALUES ('50', 'dev', '胡亚东', '', null, '123', null, null, null);
