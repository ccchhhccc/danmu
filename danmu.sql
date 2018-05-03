/*
Navicat MySQL Data Transfer

Source Server         : CHC
Source Server Version : 50716
Source Host           : 127.0.0.1:3306
Source Database       : danmu

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2018-05-04 00:34:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '123456', '陈海超');

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `link` varchar(200) DEFAULT NULL,
  `status` int(1) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  `sort` int(2) NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES ('5', '测试1', '12', '0', '1524391180438', '3', 'http://localhost:2255/uploads/banner_1524391180470.jpg');
INSERT INTO `carousel` VALUES ('6', '测试2', 'www.chenhaichao.cn', '0', '1523978544630', '21', 'http://localhost:2255/uploads/banner_1523978544654.jpg');
INSERT INTO `carousel` VALUES ('8', 'chao233', '', '1', '1523979779693', '3', 'http://localhost:2255/uploads/banner_1523979779735.jpg');
INSERT INTO `carousel` VALUES ('9', 'chao', '', '0', '1523979966373', '4', 'http://localhost:2255/uploads/banner_1523979966515.jpg');
INSERT INTO `carousel` VALUES ('10', 'chaochaochao', 'www.chenhaichao.cn', '1', '1523983313170', '5', 'http://localhost:2255/uploads/banner_1523983313223.jpeg');
INSERT INTO `carousel` VALUES ('11', 'hahah', '', '1', '1523983783447', '6', 'http://localhost:2255/uploads/banner_1523983783468.jpg');

-- ----------------------------
-- Table structure for channel
-- ----------------------------
DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `imgurl` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `brief` varchar(300) DEFAULT NULL,
  `addtime` varchar(100) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of channel
-- ----------------------------
INSERT INTO `channel` VALUES ('1', '科技', 'http://localhost:2255/uploads/banner_1523983731832.jpg', '0', '这是生活模块aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '1524391331681', '12');
INSERT INTO `channel` VALUES ('2', 'test', 'http://localhost:2255/uploads/channel_1524390797180.jpg', '1', '2333', '1524391338257', '2');
INSERT INTO `channel` VALUES ('3', 'test3', 'http://localhost:2255/uploads/channel_1524391366014.jpg', '1', 'test3简介', '1524391366035', '1');
INSERT INTO `channel` VALUES ('4', 'test4', 'http://localhost:2255/uploads/channel_1524383349295.jpg', '1', '1\n2\n3', '1524392518830', '4');
INSERT INTO `channel` VALUES ('5', '1', 'http://localhost:2255/uploads/channel_1524383670905.jpg', '1', '', '1524383670925', '5');

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `num` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES ('1', '1', '13', '10');
INSERT INTO `grade` VALUES ('2', '1', '14', '9');
INSERT INTO `grade` VALUES ('3', '2', '13', '5');
INSERT INTO `grade` VALUES ('4', '2', '14', '6');
INSERT INTO `grade` VALUES ('5', '1', '14', '10');
INSERT INTO `grade` VALUES ('6', '3', '13', '7');

-- ----------------------------
-- Table structure for hf
-- ----------------------------
DROP TABLE IF EXISTS `hf`;
CREATE TABLE `hf` (
  `plid` int(11) NOT NULL,
  `hfuserid` int(11) NOT NULL,
  `hfcontent` varchar(200) NOT NULL,
  `time` varchar(20) NOT NULL,
  `pluserid` int(11) NOT NULL,
  `v_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hf
-- ----------------------------
INSERT INTO `hf` VALUES ('1', '13', 'nihao', '20180223', '14', '1');
INSERT INTO `hf` VALUES ('1', '14', '233', '20822568', '13', '1');
INSERT INTO `hf` VALUES ('2', '13', ' 22222222', '2018-5-1 21:05:38', '14', '1');
INSERT INTO `hf` VALUES ('2', '13', ' 222', '2018-5-1 21:07:19', '13', '1');

-- ----------------------------
-- Table structure for irregularity
-- ----------------------------
DROP TABLE IF EXISTS `irregularity`;
CREATE TABLE `irregularity` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `starttime` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL,
  `reason` varchar(100) NOT NULL,
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of irregularity
-- ----------------------------
INSERT INTO `irregularity` VALUES ('1', '19', '1524111048524', '200000', '为所欲为');
INSERT INTO `irregularity` VALUES ('3', '14', '1525364065939', '40000000', 'weisuoyuwei');

-- ----------------------------
-- Table structure for leval
-- ----------------------------
DROP TABLE IF EXISTS `leval`;
CREATE TABLE `leval` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `value` bigint(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of leval
-- ----------------------------
INSERT INTO `leval` VALUES ('2', '铂金', '12345678');
INSERT INTO `leval` VALUES ('5', '黄金', '233');
INSERT INTO `leval` VALUES ('6', '青铜', '122');
INSERT INTO `leval` VALUES ('7', '白银', '123');
INSERT INTO `leval` VALUES ('8', '砖石', '1234567891111111111');

-- ----------------------------
-- Table structure for pl
-- ----------------------------
DROP TABLE IF EXISTS `pl`;
CREATE TABLE `pl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v_id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `content` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pl
-- ----------------------------
INSERT INTO `pl` VALUES ('1', '1', '13', '20180501', '233');
INSERT INTO `pl` VALUES ('2', '1', '14', '20180601', '111');
INSERT INTO `pl` VALUES ('3', '1', '14', '2018-5-1 18:27:51', '233');
INSERT INTO `pl` VALUES ('4', '1', '14', '2018-5-1 19:26:36', '12');

-- ----------------------------
-- Table structure for recommend
-- ----------------------------
DROP TABLE IF EXISTS `recommend`;
CREATE TABLE `recommend` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `v_id` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recommend
-- ----------------------------
INSERT INTO `recommend` VALUES ('2', '2', '1524391331681', '2');
INSERT INTO `recommend` VALUES ('5', '6', '1525191460542', '1');
INSERT INTO `recommend` VALUES ('6', '8', '1525191927847', '1');
INSERT INTO `recommend` VALUES ('7', '1', '1524391331681', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `signname` varchar(200) DEFAULT NULL,
  `brief` varchar(50) DEFAULT NULL,
  `headurl` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `leval` bigint(50) NOT NULL,
  `registertime` varchar(200) NOT NULL,
  `sex` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13', '手机用户17623085842', '17623085842', '12345', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '3', '1524111048524', '1');
INSERT INTO `user` VALUES ('14', 'chc', '1111', '12345', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '2', '3', '1524111222222', '0');
INSERT INTO `user` VALUES ('15', 'testuser', '2222', '12345', null, null, '222', '1', '1', '1524111255555', '1');
INSERT INTO `user` VALUES ('16', 'user1', '333', '12345', null, null, '333', '1', '2', '1521545232321', '1');
INSERT INTO `user` VALUES ('17', 'user2', '444', '123', null, null, '213', '1', '2', '1521545232322', '1');
INSERT INTO `user` VALUES ('18', 'u4', '555', '123', null, null, '21', '1', '5', '1521545232355', '1');
INSERT INTO `user` VALUES ('19', 'u5', '666', '123', null, null, '12', '2', '2352', '1521545232147', '0');

-- ----------------------------
-- Table structure for validatecode
-- ----------------------------
DROP TABLE IF EXISTS `validatecode`;
CREATE TABLE `validatecode` (
  `phone` varchar(20) NOT NULL,
  `code` varchar(10) NOT NULL,
  `time` varchar(20) NOT NULL,
  PRIMARY KEY (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of validatecode
-- ----------------------------
INSERT INTO `validatecode` VALUES ('12345678', '54321', '222');
INSERT INTO `validatecode` VALUES ('17623085842', '12345', '111');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v_name` varchar(50) NOT NULL,
  `v_url` varchar(50) NOT NULL,
  `v_img` varchar(50) NOT NULL,
  `c_id` int(20) NOT NULL,
  `v_status` int(11) NOT NULL,
  `v_time` varchar(50) NOT NULL,
  `u_id` int(20) NOT NULL,
  `v_brief` varchar(200) DEFAULT NULL,
  `v_num` bigint(20) NOT NULL,
  `v_coin` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '1test', 'http://localhost:2255/uploads/c.mp4', 'http://localhost:2255/uploads/defaulturl.jpg', '1', '3', '1524391331681', '13', ' ', '25', '8');
INSERT INTO `video` VALUES ('2', '1233', '111', '111', '4', '1', '12', '13', '233', '20', '9');
INSERT INTO `video` VALUES ('3', '3', '3', '3', '1', '1', '12', '13', '1', '6', '7');
INSERT INTO `video` VALUES ('4', '4', '4', '4', '4', '1', '12', '13', ' ', '8', '1');
INSERT INTO `video` VALUES ('5', '5', '5', '5', '1', '1', '12', '13', '2', '5', '0');
INSERT INTO `video` VALUES ('6', '6', '6', '6', '1', '1', '12', '13', '1', '21', '2');
INSERT INTO `video` VALUES ('7', '7', '7', '7', '1', '1', '12', '13', ' ', '4', '3');
INSERT INTO `video` VALUES ('8', '8', '8', '8', '1', '1', '12', '13', '8', '3', '4');
INSERT INTO `video` VALUES ('9', '9', '9', '9', '4', '1', '9', '13', '9', '8', '10');
INSERT INTO `video` VALUES ('10', '11', '11', '11', '4', '1', '11', '13', '11', '2', '5');
INSERT INTO `video` VALUES ('12', '12', '12', '12', '4', '1', '12', '13', '12', '1', '0');
INSERT INTO `video` VALUES ('13', '13', '13', '13', '1', '1', '12', '13', '13', '0', '6');

-- ----------------------------
-- Table structure for vipvideo
-- ----------------------------
DROP TABLE IF EXISTS `vipvideo`;
CREATE TABLE `vipvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v_id` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vipvideo
-- ----------------------------
INSERT INTO `vipvideo` VALUES ('14', '1', '1525274387975', '1');
