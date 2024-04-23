CREATE DATABASE  IF NOT EXISTS `contabilidad` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `contabilidad`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: contabilidad
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Pastelería Miranda'),(2,'Cafetería Miranda'),(3,'Cafetería Kevin');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `id` int NOT NULL,
  `nombre_negocio` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Cafetería Kevin'),(2,'Cafetería Miranda'),(3,'Pastelería Miranda Mezquita'),(4,'Pastelería Miranda Carlos III'),(5,'Gerencia');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entradas`
--

DROP TABLE IF EXISTS `entradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entradas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `concepto` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cierre_contado` double DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `apertura_contado` double DEFAULT NULL,
  `tarjeta` double DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `pagos` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
INSERT INTO `entradas` VALUES (95,'Cierre Pastelería Miranda Carlos III',1195.68,'2024-03-29',4,700,321.15,3,NULL),(96,'Cierre Pastelería Miranda Carlos III',602.7,'2024-03-30',4,700,152.75,3,NULL),(97,'Cierre Pastelería Miranda Carlos III',731.38,'2024-03-28',4,462.02,282.68,3,NULL),(98,'Cierre Pastelería Miranda Carlos III',426.02,'2024-03-27',4,908.77,123.25,3,NULL),(99,'Cierre Pastelería Miranda Carlos III',208.77,'2024-03-26',4,223.73,135.8,3,NULL),(100,'Cierre Pastelería Miranda Carlos III',1292.65,'2024-03-24',4,590.71,331.05,3,NULL),(101,'Cierre Pastelería Miranda Carlos III',590.71,'2024-03-23',4,438.24,184.55,3,NULL),(102,'Cierre Pastelería Miranda Carlos III',438.24,'2024-03-22',4,409.65,200.95,3,NULL),(103,'Cierre Pastelería Miranda Carlos III',279.65,'2024-03-21',4,541.9,208.5,3,NULL),(104,'Cierre Pastelería Miranda Carlos III',256.36,'2024-03-20',4,365.83,88.1,3,NULL),(105,'Cierre Pastelería Miranda Carlos III',223.34,'2024-03-01',4,528.39,129.37,3,NULL),(106,'Cierre Pastelería Miranda Carlos III',303.62,'2024-03-02',4,223.34,169.25,3,NULL),(107,'Cierre Pastelería Miranda Carlos III',1118.64,'2024-03-03',4,303.62,300.4,3,NULL),(108,'Cierre Pastelería Miranda Carlos III',266.56,'2024-03-05',4,1000,108.92,3,NULL),(109,'Cierre Pastelería Miranda Carlos III',403.83,'2024-03-06',4,366.56,154.61,3,NULL),(110,'Cierre Pastelería Miranda Carlos III',369.15,'2024-03-07',4,403.83,148.2,3,NULL),(111,'Cierre Pastelería Miranda Carlos III',395.05,'2024-03-08',4,519.15,207.95,3,NULL),(112,'Cierre Pastelería Miranda Carlos III',302.63,'2024-03-09',4,395.05,148,3,NULL),(113,'Cierre Pastelería Miranda Carlos III',1470.91,'2024-03-10',4,302.63,378.94,3,NULL),(114,'Cierre Pastelería Miranda Carlos III',298.5,'2024-03-12',4,1040,111,3,NULL),(115,'Cierre Pastelería Miranda Carlos III',271.83,'2024-03-13',4,298.5,144.22,3,NULL),(116,'Cierre Pastelería Miranda Carlos III',320.81,'2024-03-14',4,821.83,79.4,3,NULL),(117,'Cierre Pastelería Miranda Carlos III',221.91,'2024-03-15',4,370.81,181.65,3,NULL),(118,'Cierre Pastelería Miranda Carlos III',265.83,'2024-03-19',4,701.95,186.55,3,NULL),(120,'Cierre Cafetería Miranda',470.2,'2024-01-02',2,500,70.3,3,468.08),(121,'Cierre Cafetería Miranda',739.69,'2024-01-03',2,470.2,94.6,3,89.4),(122,'Cierre Cafetería Miranda',949.6,'2024-01-01',2,500,252.85,3,153),(123,'Cierre Cafetería Miranda',684.3,'2024-01-04',2,500,84.25,3,116.18),(124,'Cierre Cafetería Miranda',400.8,'2024-01-05',2,500,186,3,458.1),(125,'Cierre Cafetería Miranda',704.9,'2024-01-06',2,400.8,79.35,3,78),(126,'Cierre Cafetería Miranda',725.8,'2024-01-07',2,500,136.85,3,60),(128,'Cierre Cafetería Miranda',678.2,'2024-01-08',2,500,106,3,202.88),(129,'Cierre Cafetería Miranda',419.2,'2024-01-09',2,500,68.5,3,456.37),(130,'Cierre Cafetería Miranda',502.4,'2024-02-01',2,409.4,111.9,10,50),(131,'Cierre Cafetería Miranda',457.3,'2024-02-02',2,502.4,100.7,10,444.46),(132,'Cierre Cafetería Miranda',753.8,'2024-02-03',2,457.3,107.9,10,96.53),(133,'Cierre Cafetería Miranda',1055.2,'2024-02-04',2,600,90.8,10,30),(135,'Cierre Cafetería Miranda',1054.6,'2024-02-05',2,500,112.1,10,30),(136,'Cierre Cafetería Miranda',697.48,'2024-02-06',2,500,113.35,10,341.66),(137,'Cierre Cafetería Miranda',556,'2024-02-07',2,500,90.9,10,275.53),(138,'Cierre Cafetería Miranda',675,'2024-02-08',2,500,148.05,10,224.72),(139,'Cierre Cafetería Miranda',499.2,'2024-02-09',2,500,169.95,10,354.98),(140,'Cierre Cafetería Miranda',383.5,'2024-02-10',2,499.2,171.3,10,79.8),(141,'Cierre Cafetería Miranda',952.5,'2024-02-11',2,533.7,129.45,10,60),(142,'Cierre Cafetería Miranda',798.28,'2024-01-10',2,419.2,104.7,3,40.4),(143,'Cierre Cafetería Miranda',971.69,'2024-02-12',2,500,107.55,10,60),(144,'Cierre Cafetería Miranda',700.7,'2024-01-11',2,500,88.85,3,139.88),(145,'Cierre Cafetería Miranda',502.2,'2024-01-12',2,500,74.3,3,285.68),(146,'Cierre Cafetería Miranda',453.4,'2024-02-13',2,500,124.1,10,399.62),(147,'Cierre Cafetería Miranda',682.6,'2024-01-13',2,502.6,122.39,3,110),(148,'Cierre Cafetería Miranda',593.9,'2024-02-14',2,453.4,83.45,10,152.22),(149,'Cierre Cafetería Miranda',860.8,'2024-01-14',2,500,133.3,3,60),(150,'Cierre Cafetería Miranda',698.57,'2024-01-15',2,500,81.15,3,30),(151,'Cierre Cafetería Miranda',557.6,'2024-02-15',2,450,85.85,10,215.1),(152,'Cierre Cafetería Miranda',585.9,'2024-02-16',2,500,160.9,10,333.99),(153,'Cierre Cafetería Miranda',748.9,'2024-02-17',2,457,192,10,60),(154,'Cierre Cafetería Miranda',982.5,'2024-02-18',2,500,137.4,10,80),(156,'Cierre Cafetería Miranda',890.6,'2024-02-19',2,500,61.4,10,75.84),(157,'Cierre Cafetería Miranda',639.7,'2024-02-20',2,500,114.15,10,88.87),(158,'Cierre Cafetería Miranda',671.48,'2024-02-21',2,500,78.7,10,281.16),(159,'Cierre Cafetería Miranda',608,'2024-02-22',2,500,70,10,260.3),(160,'Cierre Cafetería Miranda',449.4,'2024-02-23',2,500,171.2,10,385.73),(161,'Cierre Cafetería Miranda',842.7,'2024-02-24',2,449.4,76.3,10,111.45),(162,'Cierre Cafetería Miranda',920.6,'2024-02-25',2,500,141.41,10,60),(163,'Cierre Cafetería Miranda',891.5,'2024-02-26',2,500,94,10,90),(164,'Cierre Cafetería Miranda',429,'2024-02-27',2,500,96.35,10,471.54),(166,'Cierre Cafetería Miranda',392.9,'2024-01-16',2,500,70.5,3,356.76),(167,'Cierre Cafetería Miranda',663.7,'2024-02-28',2,529,137.15,10,67.99),(168,'Cierre Cafetería Miranda',462.1,'2024-01-18',2,392.2,104.25,3,297.41),(169,'Cierre Cafetería Miranda',276.2,'2024-01-19',2,462.1,131.6,3,342.15),(170,'Cierre Cafetería Miranda',491.2,'2024-01-20',2,276.2,96.1,3,79),(171,'Cierre Cafetería Miranda',788.4,'2024-02-29',2,500,138.55,10,120),(172,'Cierre Cafetería Miranda',1117.2,'2024-01-21',2,491.2,217.45,3,60),(173,'Cierre Cafetería Miranda',600.92,'2024-03-01',2,500,106.35,10,370.14),(174,'Cierre Cafetería Miranda',878.9,'2024-01-22',2,500,116.9,3,30);
/*!40000 ALTER TABLE `entradas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'CEO'),(2,'Administrador'),(3,'Empleado');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id_idx` (`role_id`),
  KEY `designation_id_idx` (`designation_id`),
  CONSTRAINT `designation_id` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'a@a.aa','$2b$10$WiGtFcQVGjIxeMSMFk2dZe.xfhyjRaB69CACNkxzBIG0oOFPnhdda','a','a',3,2),(3,'kevinwnb@gmail.com','$2b$10$nY.qTqU8mSLKq.uoSDTYnOm1gyovLNZF7Ce4OEu20OcJAsLs6m/H6','Kevin','Wegener',1,5),(4,'milagros@cafekevin.es','$2b$10$5N022Pt1zYPNIXvFh3VRMeFqRhCiinqMSU/nPV4YdfRkf3UTX4oFm','Milagros','Paoli',2,1),(10,'encarniantolinez@gmail.com','$2b$10$g3J2XwKaLnNF.QNh2Uzom.Vu8k12i66cgnzLVibC6R84QaK/oCgfK','Encarna','Antolinez Miranda',1,5);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-11 20:40:24
