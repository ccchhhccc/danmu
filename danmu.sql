/*
Navicat MySQL Data Transfer

Source Server         : CHC
Source Server Version : 50716
Source Host           : 127.0.0.1:3306
Source Database       : danmu

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2018-05-12 05:17:06
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
  `setting` int(1) NOT NULL,
  `video` int(1) NOT NULL,
  `vip` int(1) NOT NULL,
  `user` int(1) NOT NULL,
  `management` int(1) NOT NULL,
  `height` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '123456', '陈海超', '1', '1', '1', '1', '1', '1');
INSERT INTO `admin` VALUES ('2', 'chc', '123456', '小明', '0', '1', '1', '1', '0', '0');
INSERT INTO `admin` VALUES ('5', 'test', '123', '小白', '1', '0', '0', '0', '1', '0');
INSERT INTO `admin` VALUES ('6', 'xiaochen', '123', '小陈', '0', '0', '0', '1', '0', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES ('9', 'chao', '', '0', '1523979966373', '4', 'http://localhost:2255/uploads/banner_1523979966515.jpg');
INSERT INTO `carousel` VALUES ('12', '55', '', '0', '1525508651308', '3', 'http://localhost:2255/uploads/banner_1525508651338.jpg');
INSERT INTO `carousel` VALUES ('13', '轮播图1', 'http://www.baidu.com', '1', '1525525507680', '1', 'http://localhost:2255/uploads/banner_1525525507706.jpg');
INSERT INTO `carousel` VALUES ('14', '轮播图2', 'http://www.baidu.com', '1', '1525525521867', '2', 'http://localhost:2255/uploads/banner_1525525521893.jpg');
INSERT INTO `carousel` VALUES ('15', '轮播图3', 'http://www.baidu.com', '1', '1525525532385', '3', 'http://localhost:2255/uploads/banner_1525525532391.jpeg');
INSERT INTO `carousel` VALUES ('16', '轮播图4', 'http://www.baidu.com', '1', '1525525541387', '4', 'http://localhost:2255/uploads/banner_1525525541396.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of channel
-- ----------------------------
INSERT INTO `channel` VALUES ('1', '科技', 'http://localhost:2255/uploads/banner_1523983731832.jpg', '0', '这是生活模块aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '1524391331681', '12');
INSERT INTO `channel` VALUES ('2', '科幻', 'http://localhost:2255/uploads/channel_1524390797180.jpg', '1', '2333', '1525616640727', '9');
INSERT INTO `channel` VALUES ('3', '搞笑', 'http://localhost:2255/uploads/channel_1524391366014.jpg', '1', 'test3简介', '1525616323321', '3');
INSERT INTO `channel` VALUES ('4', '音乐', 'http://localhost:2255/uploads/channel_1525617019907.jpg', '1', '1\n2\n3', '1525617019967', '10');
INSERT INTO `channel` VALUES ('5', '剧情', 'http://localhost:2255/uploads/channel_1524383670905.jpg', '1', '', '1525616572334', '7');
INSERT INTO `channel` VALUES ('6', '创意', 'http://localhost:2255/uploads/channel_1525616099855.jpg', '1', '', '1525616099896', '1');
INSERT INTO `channel` VALUES ('7', '励志', 'http://localhost:2255/uploads/channel_1525616136014.jpg', '1', '', '1525616136028', '2');
INSERT INTO `channel` VALUES ('8', '广告', 'http://localhost:2255/uploads/channel_1525616352029.jpg', '1', '', '1525616352055', '4');
INSERT INTO `channel` VALUES ('9', '旅行', 'http://localhost:2255/uploads/channel_1525616389463.jpg', '1', '', '1525616389526', '5');
INSERT INTO `channel` VALUES ('10', '爱情', 'http://localhost:2255/uploads/channel_1525616416356.jpg', '1', '', '1525616416368', '6');
INSERT INTO `channel` VALUES ('12', '运动', 'http://localhost:2255/uploads/channel_1525616604568.jpg', '1', '', '1525616604579', '8');

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `collectiontime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('26', '2', '14', '1526070840355');
INSERT INTO `collection` VALUES ('27', '1', '14', '1526070841687');

-- ----------------------------
-- Table structure for dandan
-- ----------------------------
DROP TABLE IF EXISTS `dandan`;
CREATE TABLE `dandan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `danmu` varchar(255) NOT NULL,
  `v_id` int(11) NOT NULL,
  `addtime` varchar(255) NOT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dandan
-- ----------------------------
INSERT INTO `dandan` VALUES ('1', '{ \"text\":\"是打算\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":16}', '1', '111111', '13');
INSERT INTO `dandan` VALUES ('2', '{\"text\":\"sdf\",\"color\":\"#0e2536\",\"size\":\"1\",\"position\":\"2\",\"time\":30}', '1', '2222222222', '13');
INSERT INTO `dandan` VALUES ('3', '{ \"text\":\"test dandan\",\"color\":\"#591d59\",\"size\":\"1\",\"position\":\"0\",\"time\":210}', '1', '1525940756093', '13');
INSERT INTO `dandan` VALUES ('4', '{ \"text\":\"弹幕弹幕\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":325}', '1', '1525941294012', '13');
INSERT INTO `dandan` VALUES ('5', '{ \"text\":\"做毕设好烦啊\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":405}', '1', '1525941304784', '13');
INSERT INTO `dandan` VALUES ('6', '{ \"text\":\"这是基佬紫\",\"color\":\"#805980\",\"size\":\"1\",\"position\":\"2\",\"time\":584}', '1', '1525941322724', '13');
INSERT INTO `dandan` VALUES ('7', '{ \"text\":\"很好看很好看\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":180}', '1', '1525941346411', '13');
INSERT INTO `dandan` VALUES ('8', '{ \"text\":\"假装很好看\",\"color\":\"#2e4bbf\",\"size\":\"1\",\"position\":\"0\",\"time\":293}', '1', '1525941357822', '13');
INSERT INTO `dandan` VALUES ('9', '{ \"text\":\"jilaozi\",\"color\":\"#a624a6\",\"size\":\"1\",\"position\":\"0\",\"time\":303}', '1', '1525968315565', '14');
INSERT INTO `dandan` VALUES ('10', '{ \"text\":\"1111111\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":3}', '1', '1526056288028', '14');
INSERT INTO `dandan` VALUES ('11', '{ \"text\":\"第一第一\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":3}', '1', '1526056301827', '14');
INSERT INTO `dandan` VALUES ('12', '{ \"text\":\"第二第二\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":15}', '1', '1526056332478', '14');
INSERT INTO `dandan` VALUES ('13', '{ \"text\":\"好烦啊\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":3}', '1', '1526062231905', '21');
INSERT INTO `dandan` VALUES ('14', '{ \"text\":\"好烦啊\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":3}', '2', '1526062231905', '14');
INSERT INTO `dandan` VALUES ('15', '{ \"text\":\"好烦啊\",\"color\":\"#ffffff\",\"size\":\"1\",\"position\":\"0\",\"time\":3}', '3', '1526062231905', '21');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES ('1', '1', '13', '8');
INSERT INTO `grade` VALUES ('3', '2', '13', '5');
INSERT INTO `grade` VALUES ('4', '2', '14', '6');
INSERT INTO `grade` VALUES ('6', '3', '13', '7');
INSERT INTO `grade` VALUES ('12', '1', '14', '8');
INSERT INTO `grade` VALUES ('13', '1', '15', '6.3');
INSERT INTO `grade` VALUES ('14', '1', '21', '8.2');

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
INSERT INTO `hf` VALUES ('8', '14', ' 23333', '2018-5-12 0:50:30', '14', '1');
INSERT INTO `hf` VALUES ('1', '14', ' ceshi', '2018-5-12 0:51:17', '13', '1');
INSERT INTO `hf` VALUES ('1', '20', ' 你好你好', '2018-5-12 1:03:31', '13', '1');
INSERT INTO `hf` VALUES ('9', '20', ' 自己回复自己', '2018-5-12 1:07:09', '20', '1');

-- ----------------------------
-- Table structure for inform
-- ----------------------------
DROP TABLE IF EXISTS `inform`;
CREATE TABLE `inform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `informer` int(11) NOT NULL,
  `reason` varchar(200) NOT NULL,
  `content` varchar(200) NOT NULL,
  `time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of inform
-- ----------------------------
INSERT INTO `inform` VALUES ('3', '13', '14', '色情', '2333黄色内容', '1524391331681');
INSERT INTO `inform` VALUES ('4', '14', '21', '测试', '111', '1526062104366');
INSERT INTO `inform` VALUES ('5', '20', '21', '测试', ' 你好你好', '1526062146290');
INSERT INTO `inform` VALUES ('6', '14', '21', '222', '测试回复', '1526062195802');

-- ----------------------------
-- Table structure for irregularity
-- ----------------------------
DROP TABLE IF EXISTS `irregularity`;
CREATE TABLE `irregularity` (
  `i_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `starttime` bigint(20) NOT NULL,
  `time` bigint(20) NOT NULL,
  `reason` varchar(100) NOT NULL,
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of irregularity
-- ----------------------------
INSERT INTO `irregularity` VALUES ('1', '19', '1524111048524', '200000', '为所欲为');
INSERT INTO `irregularity` VALUES ('3', '14', '1525429830775', '86400000', '233');
INSERT INTO `irregularity` VALUES ('5', '16', '1525419472012', '25920000000', '11111111111111');

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
-- Table structure for likers
-- ----------------------------
DROP TABLE IF EXISTS `likers`;
CREATE TABLE `likers` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `liketime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of likers
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pl
-- ----------------------------
INSERT INTO `pl` VALUES ('1', '1', '13', '20180501', '233');
INSERT INTO `pl` VALUES ('2', '1', '14', '20180601', '111');
INSERT INTO `pl` VALUES ('3', '1', '14', '2018-5-1 18:27:51', '233');
INSERT INTO `pl` VALUES ('4', '1', '14', '2018-5-1 19:26:36', '12');
INSERT INTO `pl` VALUES ('5', '1', '14', '2018-5-12 0:42:31', '测试回复');
INSERT INTO `pl` VALUES ('6', '1', '14', '2018-5-12 0:47:07', '再次则是');
INSERT INTO `pl` VALUES ('7', '1', '14', '2018-5-12 0:47:50', 'test');
INSERT INTO `pl` VALUES ('8', '1', '14', '2018-5-12 0:49:20', 'test');
INSERT INTO `pl` VALUES ('9', '1', '20', '2018-5-12 1:06:15', '嘤嘤嘤');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

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
  `coinnum` int(11) NOT NULL,
  `centerurl` varchar(100) NOT NULL,
  `signday` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13', '手机用户17623085842', '17623085842', '12345', '大家好，我是渣渣辉', null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '234', '1524111048524', '1', '1', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '1526066541529');
INSERT INTO `user` VALUES ('14', 'chc', '1111', '12345', '大家好，我是渣渣辉', null, 'http://localhost:2255/uploads/channel_1524391366014.jpg', '2', '234', '1524111222222', '0', '-2', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '1526065919588');
INSERT INTO `user` VALUES ('15', 'testuser', '2222', '12345', null, null, '222', '1', '1', '1524111255555', '1', '-1', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('16', 'user1', '333', '12345', null, null, '333', '2', '2', '1521545232321', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('17', 'user2', '444', '123', null, null, '213', '1', '2', '1521545232322', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('18', 'u4', '555', '123', null, null, '21', '1', '5', '1521545232355', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('19', 'u5', '666', '123', null, null, '12', '2', '2352', '1521545232147', '0', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('20', '手机用户13977953711', '13977953711', '213546', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1525602055776', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('21', '手机用户13977956973', '13977956973', '123', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1525602129178', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');
INSERT INTO `user` VALUES ('22', '手机用户17623086440', '17623086440', '12345678', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1526063753768', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '功夫熊猫', 'http://localhost:2255/uploads/c.mp4', 'http://localhost:2255/uploads/defaulturl.jpg', '1', '3', '1524391331681', '13', ' zhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjie', '25', '45');
INSERT INTO `video` VALUES ('2', '1233', '111', '111', '4', '1', '12', '13', '233', '20', '9');
INSERT INTO `video` VALUES ('3', '3', '3', '3', '1', '1', '12', '13', '1', '6', '7');
INSERT INTO `video` VALUES ('4', '4', '4', '4', '4', '1', '12', '13', ' ', '8', '1');
INSERT INTO `video` VALUES ('5', '5', '5', '5', '1', '1', '12', '13', '2', '5', '0');
INSERT INTO `video` VALUES ('6', '6', '6', '6', '1', '1', '12', '13', '1', '21', '2');
INSERT INTO `video` VALUES ('7', '7', '7', '7', '1', '1', '12', '13', ' ', '4', '3');
INSERT INTO `video` VALUES ('8', '8', '8', '8', '1', '1', '12', '13', '8', '3', '4');
INSERT INTO `video` VALUES ('9', '9', '9', '9', '4', '1', '9', '13', '9', '8', '10');
INSERT INTO `video` VALUES ('10', '11', '11', '11', '4', '0', '11', '13', '11', '2', '5');
INSERT INTO `video` VALUES ('12', '12', '12', '12', '4', '1', '12', '13', '12', '1', '0');
INSERT INTO `video` VALUES ('13', '13', '13', '13', '1', '1', '12', '13', '13', '0', '6');
INSERT INTO `video` VALUES ('14', '14', 'http://localhost:2255/uploads/c.mp4', 'http://localhost:2255/uploads/defaulturl.jpg', '1', '0', '1524391888888', '14', '13', '0', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vipvideo
-- ----------------------------
INSERT INTO `vipvideo` VALUES ('14', '1', '1525274387975', '1');
