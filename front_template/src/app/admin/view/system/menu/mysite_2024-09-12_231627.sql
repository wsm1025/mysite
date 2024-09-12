-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (arm64)
--
-- Host: 127.0.0.1    Database: mysite
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `common`
--

DROP TABLE IF EXISTS `common`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common` (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(255) DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) NOT NULL,
  `type` varchar(30) NOT NULL COMMENT '操作类型',
  `info` json NOT NULL COMMENT '信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common`
--

/*!40000 ALTER TABLE `common` DISABLE KEYS */;
INSERT INTO `common` VALUES ('2024-09-12 15:14:06.022389','2024-09-12 15:14:06.022389','wsm','wsm','e5ac5d32-b1d2-498d-8dfc-12bdb52cdd42','uploadFile','{\"size\": 200269, \"filename\": \"af275a7e-7034-455b-97cc-7b315c0c449c1726154046011.jpeg\", \"mimetype\": \"image/jpeg\", \"originalname\": \"8A2CED60-975B-4168-B09D-04D10F032FF7.jpeg\"}');
/*!40000 ALTER TABLE `common` ENABLE KEYS */;

--
-- Table structure for table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dictionary` (
  `id` varchar(36) NOT NULL,
  `dictionary_desc` varchar(50) DEFAULT NULL COMMENT '字典描述',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(255) DEFAULT NULL COMMENT '更新人',
  `is_delete` varchar(255) NOT NULL DEFAULT '0' COMMENT '删除标志',
  `parent_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '0' COMMENT '状态  0:启用 1:禁用',
  `parent_type` varchar(255) NOT NULL DEFAULT '0' COMMENT '0:子类 1:父类',
  `dictionary_name` varchar(20) NOT NULL COMMENT '字典名称',
  `dictionary_value` varchar(30) NOT NULL COMMENT '字典值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dictionary`
--

/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
INSERT INTO `dictionary` VALUES ('01bab86f-05e9-4fb0-9cdf-ea5d34019bf2',NULL,'2024-09-08 09:36:16.531074','2024-09-09 15:44:15.000000','wsm','wsm','1','a00e0fc0-407f-438b-8ceb-aab51432bd3b','1','0','12','1'),('0c472c13-3f93-4809-aa60-81ebc35541e2',NULL,'2024-09-08 09:06:14.321228','2024-09-08 09:06:32.000000','wsm','wsm','0','bc4d0224-e55b-40e3-8900-83b45b8fc6d8','0','0','用户','ROLE_USER'),('111c2f67-47c6-41e0-9a22-52619c14c141',NULL,'2024-09-08 09:20:15.082622','2024-09-08 09:29:06.000000','wsm','wsm','1',NULL,'0','0','22','22'),('1abc3df1-550c-4026-bdbc-8ddd9826b834','','2024-09-01 11:20:07.038372','2024-09-01 11:20:07.038372','wsm','wsm','0','fa516729-3255-451b-b450-8f01a33e4d35','0','0','',''),('1b973028-ae59-4458-b5ae-c0eddb52a213',NULL,'2024-09-08 09:33:14.642155','2024-09-08 09:33:38.000000','wsm','wsm','1',NULL,'0','0','1','1'),('2d57ad14-cc31-4c7d-901b-ca0edad55e1f',NULL,'2024-09-08 09:32:26.641183','2024-09-08 09:33:09.000000','wsm','wsm','1',NULL,'0','0','qq','qq'),('2ebf76c8-2447-43f6-a0c3-af990b9084e1',NULL,'2024-09-08 09:29:44.598831','2024-09-08 09:32:20.000000','wsm','wsm','1',NULL,'0','0','1','11'),('303927c3-f2a4-4970-965e-246541ed3825','','2024-09-01 09:32:41.165414','2024-09-04 16:31:46.000000','wsm','wsm','0','4a31a0bc-8ed3-46d0-badb-22b9af6c24d7','1','0','',''),('3272a32a-7cfc-41d9-8d7c-80574a8bc01e',NULL,'2024-09-08 10:01:42.656488','2024-09-09 15:44:15.000000','wsm','wsm','1','a00e0fc0-407f-438b-8ceb-aab51432bd3b','1','0','我的','我的'),('3d429112-66ab-4f4c-b455-4e7aff4db1c3',NULL,'2024-09-08 10:04:03.070271','2024-09-08 10:05:47.000000','wsm','wsm','1',NULL,'0','1','1','1'),('7829f0d7-ea5e-42be-8f60-393143bd0043',NULL,'2024-09-08 09:15:30.250652','2024-09-08 09:29:08.000000','wsm','wsm','1',NULL,'0','0','阿克索德','2131'),('7da2a2e8-8ea7-4e21-adb6-a4c66f406efa',NULL,'2024-09-08 09:29:25.219727','2024-09-08 09:29:38.000000','wsm','wsm','1',NULL,'0','0','11','111'),('823efd19-797d-489b-b472-62266a6c31e0','性别女','2024-09-01 09:31:48.192284','2024-09-08 09:04:39.652800','wsm','wsm','0','ba9f469c-d85d-4612-9f77-14a86b71e18e','0','0','女','SEX_WOMAN'),('892bab0c-ebfa-47de-8d40-b93309f3a384','性别男','2024-09-01 09:28:41.765657','2024-09-08 09:04:39.654165','wsm','wsm','0','ba9f469c-d85d-4612-9f77-14a86b71e18e','0','0','男','SEX_MAN'),('94c50dc8-0850-4df7-adb5-9adb91620433',NULL,'2024-09-08 09:34:41.491631','2024-09-08 09:34:50.000000','wsm','wsm','1',NULL,'0','0','123','123'),('96126a2a-900e-4c30-a621-08350bb55a57',NULL,'2024-09-08 09:07:47.509256','2024-09-08 09:07:57.000000','wsm','wsm','0','bc4d0224-e55b-40e3-8900-83b45b8fc6d8','0','0','管理员','ROLE_ADMIN'),('a00e0fc0-407f-438b-8ceb-aab51432bd3b',NULL,'2024-09-08 09:03:13.577092','2024-09-09 15:44:19.000000','wsm','wsm','0',NULL,'0','1','操作权限','OPRERATION'),('a21e3935-eb51-446a-998f-a3afc7067ef7',NULL,'2024-09-08 09:34:57.114700','2024-09-08 09:35:46.000000','wsm','wsm','1',NULL,'0','0','31','1'),('aa9ef4cf-fa9f-4626-9288-f4821e606aa5',NULL,'2024-09-08 10:02:36.094253','2024-09-08 10:02:41.000000','wsm','wsm','1',NULL,'0','1','1','1'),('b71c5ebc-92f2-4c8a-9357-5ec7541ffe7e',NULL,'2024-09-08 09:19:07.466764','2024-09-08 09:29:10.000000','wsm','wsm','1',NULL,'0','0','1','1'),('ba9f469c-d85d-4612-9f77-14a86b71e18e','性别','2024-09-01 09:27:51.321326','2024-09-08 09:04:39.654887','wsm','wsm','0',NULL,'0','1','性别','SEX'),('bc4d0224-e55b-40e3-8900-83b45b8fc6d8',NULL,'2024-09-08 09:05:33.953289','2024-09-08 09:07:08.064174','wsm','wsm','0',NULL,'0','1','用户权限','ROLE'),('cf0371d2-3757-4d19-af42-8d4f4f80a81e',NULL,'2024-09-08 09:33:43.539506','2024-09-08 09:34:35.000000','wsm','wsm','1',NULL,'0','0','1','1'),('de4509a3-b5bf-47a6-b874-96b866b0bc80','','2024-09-01 09:32:24.781495','2024-09-04 16:31:46.000000','wsm','wsm','0','4a31a0bc-8ed3-46d0-badb-22b9af6c24d7','1','0','',''),('e14008e6-ad80-414c-9628-51f6518c97f2',NULL,'2024-09-08 09:56:13.389948','2024-09-08 09:56:18.000000','wsm','wsm','1',NULL,'0','1','1','1'),('eedd6e47-468e-42af-ba1d-90351d1a46b1',NULL,'2024-09-08 09:56:25.239451','2024-09-08 09:56:58.000000','wsm','wsm','1',NULL,'0','0','22','22');
/*!40000 ALTER TABLE `dictionary` ENABLE KEYS */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `title` varchar(20) NOT NULL,
  `isIframe` tinyint DEFAULT '0',
  `url` varchar(255) DEFAULT '',
  `shows` tinyint DEFAULT '1',
  `keepAlive` tinyint NOT NULL DEFAULT '0',
  `tabFix` tinyint NOT NULL DEFAULT '0',
  `tabHidden` tinyint NOT NULL DEFAULT '0',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(255) DEFAULT NULL COMMENT '更新人',
  `order` int NOT NULL DEFAULT '0',
  `id` varchar(36) NOT NULL,
  `pid` varchar(255) DEFAULT '',
  `path` varchar(60) DEFAULT NULL,
  `file` varchar(60) DEFAULT NULL,
  `icon` varchar(60) DEFAULT NULL,
  `permission` varchar(20) DEFAULT NULL,
  `is_delete` varchar(255) NOT NULL DEFAULT '0' COMMENT '删除标志',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES ('首页',0,'',1,1,1,1,'2024-09-03 14:35:07.078578','2024-09-08 10:28:54.000000','wsm','wsm',1,'029eb932-6d8b-48cd-a1d7-1f11b0ce1848','','/home','/view/home/index.vue','HomeOutline','ROLE_USER','0'),('字典管理',0,'https://www.baidu.com',1,1,0,1,'2024-09-03 14:56:03.336550','2024-09-09 15:10:56.000000','wsm','wsm',0,'4dda9def-3669-4924-a701-500402c47440','feb7a093-64b8-4d37-9693-e42fbe693f8e','/system/dictionary','/view/system/dictionary/index.vue','ReadOutlined','ROLE_ADMIN','0'),('用户管理',0,'',1,1,0,1,'2024-09-03 14:35:07.086058','2024-09-09 15:11:15.000000','wsm','wsm',201,'89fa53fe-0c15-4a65-96ad-8e7b9dbb67a7','feb7a093-64b8-4d37-9693-e42fbe693f8e','/system/member','/view/system/member/index.vue','TeamOutlined','ROLE_USER,ROLE_ADMIN','0'),('菜单管理',0,'',1,1,0,0,'2024-09-03 14:35:07.085772','2024-09-08 10:24:41.244096','wsm','wsm',204,'d9da8005-ba25-4bfb-85f1-51d83c8dd887','feb7a093-64b8-4d37-9693-e42fbe693f8e','/system/menu','/view/system/menu/index.vue','MenuOutlined','ROLE_USER','0'),('系统设置',0,'',1,1,1,1,'2024-09-03 14:35:07.083189','2024-09-08 10:19:16.947414','wsm','wsm',200,'feb7a093-64b8-4d37-9693-e42fbe693f8e','','','','NotificationsOutline','ROLE_USER','0');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

--
-- Table structure for table `menu1`
--

DROP TABLE IF EXISTS `menu1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu1` (
  `title` varchar(20) NOT NULL,
  `isIframe` tinyint DEFAULT '0',
  `url` varchar(255) DEFAULT '',
  `shows` tinyint DEFAULT '1',
  `keepAlive` tinyint NOT NULL DEFAULT '0',
  `tabFix` tinyint NOT NULL DEFAULT '0',
  `tabHidden` tinyint NOT NULL DEFAULT '0',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(255) DEFAULT NULL COMMENT '更新人',
  `order` int NOT NULL DEFAULT '0',
  `id` varchar(36) NOT NULL,
  `pid` varchar(255) DEFAULT '',
  `path` varchar(60) DEFAULT NULL,
  `file` varchar(60) DEFAULT NULL,
  `icon` varchar(60) DEFAULT NULL,
  `permission` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu1`
--

/*!40000 ALTER TABLE `menu1` DISABLE KEYS */;
INSERT INTO `menu1` VALUES ('首页',0,'',1,1,1,0,'2024-09-03 14:35:07.078578','2024-09-03 14:35:07.078578',NULL,NULL,100,'029eb932-6d8b-48cd-a1d7-1f11b0ce1848','','/home','/view/home/index.vue','HomeOutline',''),('字典管理',0,'',1,0,0,1,'2024-09-03 14:56:03.336550','2024-09-03 14:56:03.336550',NULL,NULL,0,'4dda9def-3669-4924-a701-500402c47440','feb7a093-64b8-4d37-9693-e42fbe693f8e','/system/dictionary','/view/system/dictionary/index.vue','ReadOutlined',NULL),('用户管理',0,'',1,0,0,0,'2024-09-03 14:35:07.086058','2024-09-03 14:43:38.642739',NULL,NULL,201,'89fa53fe-0c15-4a65-96ad-8e7b9dbb67a7','feb7a093-64b8-4d37-9693-e42fbe693f8e','/system/member','/view/system/member/index.vue','TeamOutlined',''),('菜单管理',0,'',1,0,0,0,'2024-09-03 14:35:07.085772','2024-09-03 14:43:38.644506',NULL,NULL,204,'d9da8005-ba25-4bfb-85f1-51d83c8dd887','feb7a093-64b8-4d37-9693-e42fbe693f8e','/system/menu','/view/system/menu/index.vue','MenuOutlined',''),('系统设置',0,'',1,0,0,0,'2024-09-03 14:35:07.083189','2024-09-03 14:35:07.083189',NULL,NULL,200,'feb7a093-64b8-4d37-9693-e42fbe693f8e','','','','SettingsOutline','');
/*!40000 ALTER TABLE `menu1` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` varchar(36) NOT NULL,
  `user_name` varchar(10) NOT NULL COMMENT '用户名',
  `nick_name` varchar(10) NOT NULL COMMENT '昵称',
  `passWord` varchar(100) NOT NULL COMMENT '密码',
  `email` varchar(20) DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) DEFAULT '/static/171327345267698499643.jpeg' COMMENT '头像',
  `role` enum('ROLE_USER','ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_USER' COMMENT '角色',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `is_delete` varchar(255) NOT NULL DEFAULT '0' COMMENT '删除标志',
  `operationList` varchar(255) NOT NULL DEFAULT 'user_add,user_edit,user_delete,user_list,user_one,dictionary_add,dictionary_edit,dictionary_delete,dictionary_list,menu_add,menu_edit,menu_delete,menu_list' COMMENT '操作权限',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('fafbaf56-d3ba-430e-8d49-b70f841806ec','wsm','wsm','$2a$10$caxF6yTXPjBjmLaoMwuiDuAwZaFPPPoR4Ifc5xQTqP3PrmiM514hi',NULL,'http://localhost:3000/public/af275a7e-7034-455b-97cc-7b315c0c449c1726154046011.jpeg','ROLE_USER','2024-09-10 15:44:14.013691','2024-09-12 15:14:09.000000','0','user_add,user_edit,user_delete,user_list,user_one,dictionary_add,dictionary_edit,dictionary_delete,dictionary_list,menu_add,menu_edit,menu_delete,menu_list');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Dumping routines for database 'mysite'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-12 23:16:34
