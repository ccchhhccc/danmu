/*
Navicat MySQL Data Transfer

Source Server         : CHC
Source Server Version : 50716
Source Host           : 127.0.0.1:3306
Source Database       : danmu

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2018-05-15 01:13:21
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
INSERT INTO `channel` VALUES ('1', '科技', 'http://localhost:2255/uploads/banner_1523983731832.jpg', '1', '这是生活模块aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '1524391331681', '12');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('26', '1', '14', '1526070840355');
INSERT INTO `collection` VALUES ('30', '14', '13', '1526111862435');
INSERT INTO `collection` VALUES ('31', '1', '20', '1526150170951');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of likers
-- ----------------------------
INSERT INTO `likers` VALUES ('7', '20', '13', '123');
INSERT INTO `likers` VALUES ('11', '21', '13', '134');
INSERT INTO `likers` VALUES ('13', '13', '14', '1526141329553');
INSERT INTO `likers` VALUES ('14', '13', '20', '122');
INSERT INTO `likers` VALUES ('15', '20', '14', '1526145794350');
INSERT INTO `likers` VALUES ('16', '14', '20', '1526150213632');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recommend
-- ----------------------------
INSERT INTO `recommend` VALUES ('2', '2', '1524391331681', '2');
INSERT INTO `recommend` VALUES ('7', '1', '1524391331681', '1');
INSERT INTO `recommend` VALUES ('8', '53', '1526313766874', '1');
INSERT INTO `recommend` VALUES ('9', '19', '1526313768895', '1');
INSERT INTO `recommend` VALUES ('10', '36', '1526313770767', '1');
INSERT INTO `recommend` VALUES ('11', '45', '1526313784535', '1');
INSERT INTO `recommend` VALUES ('12', '44', '1526313787539', '1');
INSERT INTO `recommend` VALUES ('13', '61', '1526313789508', '1');

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
  `video` int(11) NOT NULL,
  `liker` int(11) NOT NULL,
  `fans` int(11) NOT NULL,
  `collection` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13', '陨落星际', '17623085842', '12345', '这不是个性签名', null, 'http://localhost:2255/uploads/head_1526131239597.jpg', '1', '234', '1524111048524', '1', '2', 'http://localhost:2255/uploads/bg_1526132587269.jpg', '1526145998500', '1', '0', '0', '0');
INSERT INTO `user` VALUES ('14', 'chc', '1111', '12345', '大家好，我是渣渣辉', null, 'http://localhost:2255/uploads/channel_1524391366014.jpg', '2', '234', '1524111222222', '0', '1', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '1526145929983', '0', '0', '0', '1');
INSERT INTO `user` VALUES ('15', 'testuser', '2222', '12345', null, null, '222', '1', '1', '1524111255555', '1', '-1', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('16', 'user1', '333', '12345', null, null, '333', '2', '2', '1521545232321', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('17', 'user2', '444', '123', null, null, '213', '1', '2', '1521545232322', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('18', 'u4', '555', '123', null, null, '21', '1', '5', '1521545232355', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('19', 'u5', '666', '123', null, null, '12', '2', '2352', '1521545232147', '0', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('20', '手机用户13977953711', '13977953711', '213546', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1525602055776', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('21', '手机用户13977956973', '13977956973', '123', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1525602129178', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');
INSERT INTO `user` VALUES ('22', '手机用户17623086440', '17623086440', '12345678', null, null, 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1526063753768', '1', '0', 'http://localhost:2255/uploads/usercenter.png@100Q.webp', '', '0', '0', '0', '0');

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
  `v_url` varchar(100) NOT NULL,
  `v_img` varchar(100) NOT NULL,
  `c_id` int(20) NOT NULL,
  `v_status` int(11) NOT NULL,
  `v_time` varchar(50) NOT NULL,
  `u_id` int(20) NOT NULL,
  `v_brief` varchar(200) DEFAULT NULL,
  `v_num` bigint(20) NOT NULL,
  `v_coin` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '功夫熊猫', 'http://localhost:2255/uploads/c.mp4', 'http://localhost:2255/uploads/defaulturl.jpg', '1', '3', '1524391331681', '13', ' zhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjiezhelishijianjie', '25', '45');
INSERT INTO `video` VALUES ('2', '1233', '111', '111', '1', '1', '12', '13', '233', '20', '9');
INSERT INTO `video` VALUES ('3', '3', '3', '3', '1', '1', '12', '13', '1', '6', '7');
INSERT INTO `video` VALUES ('4', '4', '4', '4', '4', '1', '12', '13', ' ', '8', '1');
INSERT INTO `video` VALUES ('5', '5', '5', '5', '1', '1', '12', '13', '2', '5', '0');
INSERT INTO `video` VALUES ('6', '6', '6', '6', '1', '1', '12', '13', '1', '21', '2');
INSERT INTO `video` VALUES ('7', '7', '7', '7', '1', '1', '12', '13', ' ', '4', '3');
INSERT INTO `video` VALUES ('8', '8', '8', '8', '1', '1', '12', '13', '8', '3', '4');
INSERT INTO `video` VALUES ('9', '9', '9', '9', '4', '1', '9', '13', '9', '8', '10');
INSERT INTO `video` VALUES ('10', '11', '11', '11', '4', '0', '11', '13', '11', '2', '5');
INSERT INTO `video` VALUES ('12', '12', '12', '12', '1', '1', '12', '13', '12', '1', '0');
INSERT INTO `video` VALUES ('13', '13', '13', '13', '1', '3', '12', '13', '13', '0', '6');
INSERT INTO `video` VALUES ('14', '14', 'http://localhost:2255/uploads/c.mp4', 'http://localhost:2255/uploads/defaulturl.jpg', '1', '1', '1524391888888', '14', '13', '0', '2');
INSERT INTO `video` VALUES ('15', '小熊喵', 'http://localhost:2255/uploads/videofile_1526304294315.mp4', 'http://localhost:2255/uploads/videohead_1526304294886.jpg', '3', '1', '1526304295241', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('16', '小熊喵2', 'http://localhost:2255/uploads/videofile_1526304734034.mp4', 'http://localhost:2255/uploads/videohead_1526304736221.jpg', '3', '1', '1526304736250', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('17', '小熊喵3', 'http://localhost:2255/uploads/videofile_1526304740516.mp4', 'http://localhost:2255/uploads/videohead_1526304741271.jpg', '3', '1', '1526304741294', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('18', '小熊喵4', 'http://localhost:2255/uploads/videofile_1526304745343.mp4', 'http://localhost:2255/uploads/videohead_1526304745765.jpg', '3', '1', '1526304745776', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('19', '小熊喵5', 'http://localhost:2255/uploads/videofile_1526304750312.mp4', 'http://localhost:2255/uploads/videohead_1526304750883.jpg', '3', '1', '1526304750904', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('20', '小熊喵6', 'http://localhost:2255/uploads/videofile_1526304754413.mp4', 'http://localhost:2255/uploads/videohead_1526304754716.jpg', '3', '1', '1526304754724', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('21', '小熊喵7', 'http://localhost:2255/uploads/videofile_1526304759066.mp4', 'http://localhost:2255/uploads/videohead_1526304759697.jpg', '3', '1', '1526304759713', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('22', '小熊喵8', 'http://localhost:2255/uploads/videofile_1526304764315.mp4', 'http://localhost:2255/uploads/videohead_1526304764815.jpg', '3', '1', '1526304764828', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('23', '小熊喵9', 'http://localhost:2255/uploads/videofile_1526304768394.mp4', 'http://localhost:2255/uploads/videohead_1526304768791.jpg', '3', '0', '1526304768802', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('24', '小熊喵10', 'http://localhost:2255/uploads/videofile_1526304773585.mp4', 'http://localhost:2255/uploads/videohead_1526304774006.jpg', '3', '1', '1526304774032', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('25', '小熊喵11', 'http://localhost:2255/uploads/videofile_1526304777852.mp4', 'http://localhost:2255/uploads/videohead_1526304778242.jpg', '3', '1', '1526304778252', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('26', '小熊喵12', 'http://localhost:2255/uploads/videofile_1526304781255.mp4', 'http://localhost:2255/uploads/videohead_1526304781611.jpg', '3', '1', '1526304781663', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('27', '小熊喵13', 'http://localhost:2255/uploads/videofile_1526304785470.mp4', 'http://localhost:2255/uploads/videohead_1526304786021.jpg', '3', '1', '1526304786032', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('28', '小熊喵14', 'http://localhost:2255/uploads/videofile_1526304789457.mp4', 'http://localhost:2255/uploads/videohead_1526304789939.jpg', '3', '1', '1526304789997', '20', '这是一部搞笑片，希望大家喜欢', '0', '0');
INSERT INTO `video` VALUES ('29', '广告1', 'http://localhost:2255/uploads/videofile_1526304849696.mp4', 'http://localhost:2255/uploads/videohead_1526304849995.jpg', '8', '1', '1526304850009', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('30', '广告2', 'http://localhost:2255/uploads/videofile_1526304857423.mp4', 'http://localhost:2255/uploads/videohead_1526304857702.jpg', '8', '1', '1526304857760', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('31', '广告3', 'http://localhost:2255/uploads/videofile_1526304861450.mp4', 'http://localhost:2255/uploads/videohead_1526304861755.jpg', '8', '1', '1526304861776', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('32', '广告4', 'http://localhost:2255/uploads/videofile_1526304865047.mp4', 'http://localhost:2255/uploads/videohead_1526304865370.jpg', '8', '1', '1526304865383', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('33', '广告5', 'http://localhost:2255/uploads/videofile_1526304868698.mp4', 'http://localhost:2255/uploads/videohead_1526304869024.jpg', '8', '1', '1526304869037', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('34', '广告6', 'http://localhost:2255/uploads/videofile_1526304872304.mp4', 'http://localhost:2255/uploads/videohead_1526304872583.jpg', '8', '1', '1526304872614', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('35', '广告7', 'http://localhost:2255/uploads/videofile_1526304875735.mp4', 'http://localhost:2255/uploads/videohead_1526304876063.jpg', '8', '1', '1526304876092', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('36', '广告8', 'http://localhost:2255/uploads/videofile_1526304879333.mp4', 'http://localhost:2255/uploads/videohead_1526304879671.jpg', '8', '1', '1526304879696', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('37', '广告9', 'http://localhost:2255/uploads/videofile_1526304884338.mp4', 'http://localhost:2255/uploads/videohead_1526304884587.jpg', '8', '3', '1526304884600', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('38', '广告10', 'http://localhost:2255/uploads/videofile_1526304889891.mp4', 'http://localhost:2255/uploads/videohead_1526304890255.jpg', '8', '1', '1526304890332', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('39', '广告11', 'http://localhost:2255/uploads/videofile_1526304895273.mp4', 'http://localhost:2255/uploads/videohead_1526304895521.jpg', '8', '3', '1526304895532', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('40', '广告12', 'http://localhost:2255/uploads/videofile_1526304899031.mp4', 'http://localhost:2255/uploads/videohead_1526304899359.jpg', '8', '1', '1526304899407', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('41', '广告13', 'http://localhost:2255/uploads/videofile_1526304902101.mp4', 'http://localhost:2255/uploads/videohead_1526304902612.jpg', '8', '1', '1526304902629', '20', '这是广告2333', '0', '0');
INSERT INTO `video` VALUES ('42', '科幻视频', 'http://localhost:2255/uploads/videofile_1526304983884.mp4', 'http://localhost:2255/uploads/videohead_1526304983913.jpg', '2', '1', '1526304983978', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('43', '科幻视频2', 'http://localhost:2255/uploads/videofile_1526304990412.mp4', 'http://localhost:2255/uploads/videohead_1526304990443.jpg', '2', '1', '1526304990471', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('44', '科幻视频3', 'http://localhost:2255/uploads/videofile_1526304995564.mp4', 'http://localhost:2255/uploads/videohead_1526304995584.jpg', '2', '1', '1526304995633', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('45', '科幻视频4', 'http://localhost:2255/uploads/videofile_1526304999442.mp4', 'http://localhost:2255/uploads/videohead_1526304999493.jpg', '2', '1', '1526304999507', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('46', '科幻视频5', 'http://localhost:2255/uploads/videofile_1526305004229.mp4', 'http://localhost:2255/uploads/videohead_1526305004268.jpg', '2', '1', '1526305004281', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('47', '科幻视频6', 'http://localhost:2255/uploads/videofile_1526305008508.mp4', 'http://localhost:2255/uploads/videohead_1526305008530.jpg', '2', '1', '1526305008540', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('48', '科幻视频7', 'http://localhost:2255/uploads/videofile_1526305012582.mp4', 'http://localhost:2255/uploads/videohead_1526305012620.jpg', '2', '1', '1526305012642', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('49', '科幻视频8', 'http://localhost:2255/uploads/videofile_1526305017066.mp4', 'http://localhost:2255/uploads/videohead_1526305017101.jpg', '2', '1', '1526305017109', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('50', '科幻视频9', 'http://localhost:2255/uploads/videofile_1526305020757.mp4', 'http://localhost:2255/uploads/videohead_1526305020797.jpg', '2', '1', '1526305020825', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('51', '科幻视频10', 'http://localhost:2255/uploads/videofile_1526305025894.mp4', 'http://localhost:2255/uploads/videohead_1526305025926.jpg', '2', '1', '1526305025947', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('52', '科幻视频11', 'http://localhost:2255/uploads/videofile_1526305028857.mp4', 'http://localhost:2255/uploads/videohead_1526305028877.jpg', '2', '1', '1526305028913', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('53', '科幻视频12', 'http://localhost:2255/uploads/videofile_1526305033864.mp4', 'http://localhost:2255/uploads/videohead_1526305033899.jpg', '2', '3', '1526305033928', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('54', '科幻视频13', 'http://localhost:2255/uploads/videofile_1526305038041.mp4', 'http://localhost:2255/uploads/videohead_1526305038076.jpg', '2', '3', '1526305038094', '20', '假装这是科幻大片', '0', '0');
INSERT INTO `video` VALUES ('55', '励志', 'http://localhost:2255/uploads/videofile_1526310868578.mp4', 'http://localhost:2255/uploads/videohead_1526310876420.jpg', '7', '3', '1526310876432', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('56', '励志2', 'http://localhost:2255/uploads/videofile_1526310884550.mp4', 'http://localhost:2255/uploads/videohead_1526310887403.jpg', '7', '1', '1526310887477', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('57', '励志3', 'http://localhost:2255/uploads/videofile_1526310891151.mp4', 'http://localhost:2255/uploads/videohead_1526310892999.jpg', '7', '1', '1526310893027', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('58', '励志4', 'http://localhost:2255/uploads/videofile_1526310897122.mp4', 'http://localhost:2255/uploads/videohead_1526310900064.jpg', '7', '1', '1526310900105', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('59', '励志5', 'http://localhost:2255/uploads/videofile_1526310903591.mp4', 'http://localhost:2255/uploads/videohead_1526310905987.jpg', '7', '1', '1526310906030', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('60', '励志6', 'http://localhost:2255/uploads/videofile_1526310911616.mp4', 'http://localhost:2255/uploads/videohead_1526310914135.jpg', '7', '1', '1526310914148', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('61', '励志7', 'http://localhost:2255/uploads/videofile_1526310917769.mp4', 'http://localhost:2255/uploads/videohead_1526310920632.jpg', '7', '1', '1526310920646', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('62', '励志8', 'http://localhost:2255/uploads/videofile_1526310924879.mp4', 'http://localhost:2255/uploads/videohead_1526310926854.jpg', '7', '3', '1526310926867', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('63', '励志9', 'http://localhost:2255/uploads/videofile_1526310930967.mp4', 'http://localhost:2255/uploads/videohead_1526310933442.jpg', '7', '1', '1526310933453', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('64', '励志10', 'http://localhost:2255/uploads/videofile_1526310938880.mp4', 'http://localhost:2255/uploads/videohead_1526310940604.jpg', '7', '1', '1526310940624', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('65', '励志11', 'http://localhost:2255/uploads/videofile_1526310946023.mp4', 'http://localhost:2255/uploads/videohead_1526310948000.jpg', '7', '1', '1526310948032', '20', '假装这是励志片', '0', '0');
INSERT INTO `video` VALUES ('66', '音乐', 'http://localhost:2255/uploads/videofile_1526311064642.mp4', 'http://localhost:2255/uploads/videohead_1526311068897.jpg', '4', '0', '1526311068920', '20', '假装这是音乐大片', '0', '0');
INSERT INTO `video` VALUES ('67', '音乐2', 'http://localhost:2255/uploads/videofile_1526311072357.mp4', 'http://localhost:2255/uploads/videohead_1526311074538.jpg', '4', '0', '1526311074555', '20', '假装这是音乐大片', '0', '0');
INSERT INTO `video` VALUES ('68', '音乐3', 'http://localhost:2255/uploads/videofile_1526311078210.mp4', 'http://localhost:2255/uploads/videohead_1526311079956.jpg', '4', '1', '1526311079979', '20', '假装这是音乐大片', '0', '0');
INSERT INTO `video` VALUES ('69', '音乐4', 'http://localhost:2255/uploads/videofile_1526311083539.mp4', 'http://localhost:2255/uploads/videohead_1526311085556.jpg', '4', '1', '1526311085629', '20', '假装这是音乐大片', '0', '0');
INSERT INTO `video` VALUES ('70', '音乐5', 'http://localhost:2255/uploads/videofile_1526311089184.mp4', 'http://localhost:2255/uploads/videohead_1526311091492.jpg', '4', '1', '1526311091507', '20', '假装这是音乐大片', '0', '0');
INSERT INTO `video` VALUES ('71', '音乐6', 'http://localhost:2255/uploads/videofile_1526311094895.mp4', 'http://localhost:2255/uploads/videohead_1526311096672.jpg', '4', '3', '1526311096771', '20', '假装这是音乐大片', '0', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vipvideo
-- ----------------------------
INSERT INTO `vipvideo` VALUES ('14', '1', '1525274387975', '1');
INSERT INTO `vipvideo` VALUES ('15', '54', '1526305114511', '1');
INSERT INTO `vipvideo` VALUES ('18', '39', '1526313814538', '1');
INSERT INTO `vipvideo` VALUES ('19', '55', '1526313816381', '1');
INSERT INTO `vipvideo` VALUES ('20', '62', '1526313820403', '1');
INSERT INTO `vipvideo` VALUES ('21', '37', '1526313822116', '1');
INSERT INTO `vipvideo` VALUES ('22', '53', '1526313825103', '1');
INSERT INTO `vipvideo` VALUES ('23', '71', '1526313826899', '1');
