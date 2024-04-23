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
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
INSERT INTO `entradas` VALUES (120,'Cierre Cafetería Miranda',470.2,'2024-01-02',2,500,70.3,3,468.08),(121,'Cierre Cafetería Miranda',739.69,'2024-01-03',2,470.2,94.6,3,89.4),(122,'Cierre Cafetería Miranda',949.6,'2024-01-01',2,500,252.85,3,153),(123,'Cierre Cafetería Miranda',684.3,'2024-01-04',2,500,84.25,3,116.18),(124,'Cierre Cafetería Miranda',400.8,'2024-01-05',2,500,186,3,458.1),(125,'Cierre Cafetería Miranda',704.9,'2024-01-06',2,400.8,79.35,3,78),(126,'Cierre Cafetería Miranda',725.8,'2024-01-07',2,500,136.85,3,60),(128,'Cierre Cafetería Miranda',678.2,'2024-01-08',2,500,106,3,202.88),(129,'Cierre Cafetería Miranda',419.2,'2024-01-09',2,500,68.5,3,456.37),(130,'Cierre Cafetería Miranda',502.4,'2024-02-01',2,409.4,111.9,10,50),(131,'Cierre Cafetería Miranda',457.3,'2024-02-02',2,502.4,100.7,10,444.46),(132,'Cierre Cafetería Miranda',753.8,'2024-02-03',2,457.3,107.9,10,96.53),(133,'Cierre Cafetería Miranda',1055.2,'2024-02-04',2,600,90.8,10,30),(135,'Cierre Cafetería Miranda',1054.6,'2024-02-05',2,500,112.1,10,30),(136,'Cierre Cafetería Miranda',697.48,'2024-02-06',2,500,113.35,10,341.66),(137,'Cierre Cafetería Miranda',556,'2024-02-07',2,500,90.9,10,275.53),(138,'Cierre Cafetería Miranda',675,'2024-02-08',2,500,148.05,10,224.72),(139,'Cierre Cafetería Miranda',499.2,'2024-02-09',2,500,169.95,10,354.98),(140,'Cierre Cafetería Miranda',383.5,'2024-02-10',2,499.2,171.3,10,79.8),(141,'Cierre Cafetería Miranda',952.5,'2024-02-11',2,533.7,129.45,10,60),(142,'Cierre Cafetería Miranda',798.28,'2024-01-10',2,419.2,104.7,3,40.4),(143,'Cierre Cafetería Miranda',971.69,'2024-02-12',2,500,107.55,10,60),(144,'Cierre Cafetería Miranda',700.7,'2024-01-11',2,500,88.85,3,139.88),(145,'Cierre Cafetería Miranda',502.2,'2024-01-12',2,500,74.3,3,285.68),(146,'Cierre Cafetería Miranda',453.4,'2024-02-13',2,500,124.1,10,399.62),(147,'Cierre Cafetería Miranda',682.6,'2024-01-13',2,502.6,122.39,3,110),(148,'Cierre Cafetería Miranda',593.9,'2024-02-14',2,453.4,83.45,10,152.22),(149,'Cierre Cafetería Miranda',860.8,'2024-01-14',2,500,133.3,3,60),(150,'Cierre Cafetería Miranda',698.57,'2024-01-15',2,500,81.15,3,30),(151,'Cierre Cafetería Miranda',557.6,'2024-02-15',2,450,85.85,10,215.1),(152,'Cierre Cafetería Miranda',585.9,'2024-02-16',2,500,160.9,10,333.99),(153,'Cierre Cafetería Miranda',748.9,'2024-02-17',2,457,192,10,60),(154,'Cierre Cafetería Miranda',982.5,'2024-02-18',2,500,137.4,10,80),(156,'Cierre Cafetería Miranda',890.6,'2024-02-19',2,500,61.4,10,75.84),(157,'Cierre Cafetería Miranda',639.7,'2024-02-20',2,500,114.15,10,88.87),(158,'Cierre Cafetería Miranda',671.48,'2024-02-21',2,500,78.7,10,281.16),(159,'Cierre Cafetería Miranda',608,'2024-02-22',2,500,70,10,260.3),(160,'Cierre Cafetería Miranda',449.4,'2024-02-23',2,500,171.2,10,385.73),(161,'Cierre Cafetería Miranda',842.7,'2024-02-24',2,449.4,76.3,10,111.45),(162,'Cierre Cafetería Miranda',920.6,'2024-02-25',2,500,141.41,10,60),(163,'Cierre Cafetería Miranda',891.5,'2024-02-26',2,500,94,10,90),(164,'Cierre Cafetería Miranda',429,'2024-02-27',2,500,96.35,10,471.54),(167,'Cierre Cafetería Miranda',663.7,'2024-02-28',2,529,137.15,10,67.99),(168,'Cierre Cafetería Miranda',462.1,'2024-01-18',2,392.2,104.25,3,297.41),(169,'Cierre Cafetería Miranda',276.2,'2024-01-19',2,462.1,131.6,3,342.15),(170,'Cierre Cafetería Miranda',491.2,'2024-01-20',2,276.2,96.1,3,79),(171,'Cierre Cafetería Miranda',788.4,'2024-02-29',2,500,138.55,10,120),(172,'Cierre Cafetería Miranda',1117.2,'2024-01-21',2,491.2,217.45,3,60),(173,'Cierre Cafetería Miranda',600.92,'2024-03-01',2,500,106.35,10,370.14),(174,'Cierre Cafetería Miranda',878.9,'2024-01-22',2,500,116.9,3,30),(175,'Cierre Cafetería Miranda',571.2,'2024-03-02',2,483.62,130,10,106.18),(176,'Cierre Cafetería Miranda',1062.9,'2024-03-03',2,500,128.3,10,106.18),(177,'Cierre Cafetería Miranda',662.37,'2024-03-04',2,500,137.3,10,234.81),(178,'Cierre Cafetería Miranda',425.6,'2024-03-05',2,400,90.25,10,424.91),(181,'Cierre Cafetería Miranda',685.8,'2024-03-06',2,425.6,169.25,10,60),(182,'Cierre Cafetería Miranda',503.1,'2024-03-07',2,500,92.3,10,305.37),(183,'Cierre Cafetería Miranda',603.5,'2024-03-08',2,503.1,123.2,10,444.48),(184,'Cierre Cafetería Miranda',451.4,'2024-01-23',2,500,91.75,3,462.82),(185,'Cierre Cafetería Miranda',473.7,'2024-01-24',2,451.4,130.9,3,304.86),(186,'Cierre Cafetería Miranda',589.7,'2024-01-25',2,473.7,165.3,3,226.6),(187,'Cierre Cafetería Miranda',577.3,'2024-01-26',2,500,108.5,3,207.58),(188,'Cierre Cafetería Miranda',634.3,'2024-01-27',2,478.4,130.4,3,142),(189,'Cierre Cafetería Miranda',1285.8,'2024-01-28',2,500,235.25,3,60),(190,'Cierre Cafetería Miranda',654.2,'2024-03-09',2,500,63.7,10,123.92),(191,'Cierre Cafetería Miranda',876.1,'2024-01-29',2,500,66.6,3,30),(192,'Cierre Cafetería Miranda',445.4,'2024-01-30',2,500,61.85,3,362.4),(193,'Cierre Cafetería Miranda',867,'2024-03-10',2,500,228.65,10,60),(194,'Cierre Cafetería Miranda',409.4,'2024-01-31',2,445.4,133.33,3,247.36),(195,'Cierre Cafetería Miranda',910.9,'2024-03-11',2,500,123.65,10,112.35),(196,'Cierre Cafetería Miranda',558.9,'2024-03-12',2,500,161.9,10,309.08),(197,'Cierre Cafetería Miranda',651.51,'2024-03-13',2,500,94.1,10,188.1),(198,'Cierre Cafetería Miranda',606.8,'2024-03-14',2,500,126.5,10,304.91),(199,'Cierre Cafetería Miranda',376.1,'2024-03-15',2,450,177,10,376.2),(201,'Cierre Cafetería Miranda',779,'2024-03-17',2,500,159.3,10,60),(202,'Cierre Cafetería Miranda',876.61,'2024-03-18',2,500,132.15,10,82.17),(203,'Cierre Cafetería Miranda',588.09,'2024-03-19',2,500,207.69,10,292.34),(204,'Cierre Cafetería Miranda',896.35,'2024-03-20',2,500,112.6,10,97.54),(205,'Cierre Cafetería Miranda',575.6,'2024-03-21',2,500,96.8,10,177.3),(206,'Cierre Cafetería Miranda',618.45,'2024-03-22',2,500,119.65,10,243.89),(208,'Cierre Cafetería Miranda',771.01,'2024-03-23',2,489.6,133.1,10,95),(209,'Cierre Pastelería Miranda Carlos III',682.73,'2024-01-02',4,700,151.4,3,629.73),(210,'Cierre Cafetería Miranda',777.59,'2024-03-24',2,500,174.25,10,60),(211,'Cierre Pastelería Miranda Carlos III',453.27,'2024-01-03',4,682.73,48.35,3,674.81),(212,'Cierre Cafetería Miranda',665,'2024-03-25',2,500,155.55,10,245.1),(213,'Cierre Pastelería Miranda Carlos III',383.55,'2024-01-04',4,453.27,119.35,3,674.46),(218,'Cierre Cafetería Miranda',381.2,'2024-03-26',2,500,124.05,10,392.87),(224,'Cierre Cafetería Miranda',423.3,'2024-03-27',2,381.2,129.3,10,370.08),(225,'Cierre Pastelería Miranda Carlos III',284.46,'2024-01-12',4,882.48,127.78,3,1035.36),(226,'Cierre Cafetería Miranda',632.6,'2024-03-28',2,423.3,125.7,10,142),(227,'Cierre Cafetería Miranda',847.5,'2024-03-29',2,500,159.4,10,74),(228,'Cierre Cafetería Miranda',811.9,'2024-03-30',2,500,115.05,10,95),(231,'Cierre Cafetería Miranda',595.3,'2024-03-31',2,650,109.8,10,400),(232,'Cierre Pastelería Miranda Carlos III',377.98,'2024-02-01',4,523.69,179.8,10,730.97),(233,'Cierre Pastelería Miranda Carlos III',347.87,'2024-02-02',4,677.98,148.62,10,792.05),(235,'Cierre Pastelería Miranda Carlos III',304.87,'2024-02-03',4,347.87,178.54,10,528.03),(238,'Cierre Pastelería Miranda Carlos III',804.91,'2024-02-04',4,304.85,298.37,10,468.25),(239,'Cierre Pastelería Miranda Carlos III',869.1,'2024-02-05',4,700,79.29,10,293.85),(241,'Cierre Pastelería Miranda Carlos III',332.57,'2024-02-06',4,700,46.6,10,867.12),(242,'Cierre Pastelería Miranda Carlos III',158.19,'2024-02-07',4,482.57,70.7,10,655.62),(243,'Cierre Pastelería Miranda Carlos III',328.37,'2024-02-08',4,158.19,126.5,10,265.93),(244,'Cierre Pastelería Miranda Carlos III',305.48,'2024-02-09',4,428.37,147.69,10,525.02),(245,'Cierre Pastelería Miranda Carlos III',243.06,'2024-02-10',4,555.48,227.9,10,716.04),(246,'Cierre Pastelería Miranda Carlos III',690.24,'2024-02-11',4,243.06,286.25,10,399.5),(247,'Cierre Pastelería Miranda Carlos III',721.74,'2024-02-12',4,690.24,144.88,10,430.32),(248,'Cierre Pastelería Miranda Carlos III',350.62,'2024-02-13',4,700,96.65,10,847.25),(249,'Cierre Pastelería Miranda Carlos III',421.73,'2024-02-14',4,350.62,152.1,10,465.03),(250,'Cierre Pastelería Miranda Carlos III',348.18,'2024-02-15',4,421.73,70.89,10,546.85),(252,'Cierre Pastelería Miranda Carlos III',455.66,'2024-01-16',4,700,102.85,3,755.04),(253,'Cierre Pastelería Miranda Carlos III',526.44,'2024-01-17',4,455.66,100.97,3,393.07),(254,'Cierre Pastelería Miranda Carlos III',549.67,'2024-02-16',4,648.18,155.3,10,592.94),(255,'Cierre Pastelería Miranda Carlos III',448.44,'2024-01-18',4,526.44,73.65,3,609.39),(256,'Cierre Pastelería Miranda Carlos III',437,'2024-02-17',4,579.01,152.94,10,643.78),(257,'Cierre Pastelería Miranda Carlos III',282.33,'2024-01-19',4,448.44,76.94,3,648.63),(258,'Cierre Pastelería Miranda Carlos III',700,'2024-02-18',4,437,269.02,10,728.15),(259,'Cierre Pastelería Miranda Carlos III',987.61,'2024-02-19',4,700,112.33,10,232.61),(260,'Cierre Pastelería Miranda Carlos III',448.58,'2024-01-20',4,282.03,173.6,3,492.53),(261,'Cierre Pastelería Miranda Carlos III',243.35,'2024-02-20',4,800,172.85,10,987.89),(263,'Cierre Pastelería Miranda Carlos III',295.82,'2024-02-21',4,343.35,108.85,10,505.3),(264,'Cierre Pastelería Miranda Carlos III',758.97,'2024-01-22',4,700,70.18,3,360.68),(266,'Cierre Pastelería Miranda Carlos III',296.07,'2024-02-22',4,365.82,61.65,10,529.09),(267,'Cierre Pastelería Miranda Carlos III',414.26,'2024-02-23',4,996.07,131.89,10,920.9),(268,'Cierre Pastelería Miranda Carlos III',450.22,'2024-02-24',4,414.26,149.1,10,479.98),(269,'Cierre Pastelería Miranda Carlos III',700,'2024-02-25',4,450.22,401.55,10,757.8),(270,'Cierre Pastelería Miranda Carlos III',717.48,'2024-02-26',4,700,103.6,10,407.41),(271,'Cierre Pastelería Miranda Carlos III',234.21,'2024-02-27',4,700,85.25,10,923.34),(272,'Cierre Pastelería Miranda Carlos III',700,'2024-02-28',4,234.21,319.1,10,537.21),(273,'Cierre Pastelería Miranda Carlos III',528.39,'2024-02-29',4,700,92.04,10,711.95),(274,'Cierre Pastelería Miranda Carlos III',223.34,'2024-03-01',4,528.39,129.37,10,799.53),(275,'Cierre Pastelería Miranda Carlos III',303.62,'2024-03-02',4,423.34,169.25,10,580.68),(276,'Cierre Pastelería Miranda Carlos III',700,'2024-03-03',4,303.62,300.4,10,583.89),(277,'Cierre Pastelería Miranda Carlos III',801.46,'2024-03-04',4,700,123.13,10,359),(278,'Cierre Pastelería Miranda Carlos III',266.56,'2024-03-05',4,1000,108.92,10,1205.88),(279,'Cierre Pastelería Miranda Carlos III',403.83,'2024-03-06',4,266.56,154.61,10,414.3),(280,'Cierre Pastelería Miranda Carlos III',369.15,'2024-03-07',4,403.83,148.2,10,597.04),(281,'Cierre Pastelería Miranda Carlos III',395.05,'2024-03-08',4,519.15,207.95,10,574),(282,'Cierre Pastelería Miranda Carlos III',302.63,'2024-03-09',4,395.05,148,10,475.98),(283,'Cierre Pastelería Miranda Carlos III',700,'2024-03-10',4,302.63,378.94,10,874.91),(285,'Cierre Pastelería Miranda Carlos III',700,'2024-03-11',4,792.91,125.35,10,422.76),(286,'Cierre Pastelería Miranda Carlos III',298.5,'2024-03-12',4,1040,111,10,1179.42),(287,'Cierre Pastelería Miranda Carlos III',271.83,'2024-03-13',4,298.5,144.22,10,532.77),(288,'Cierre Pastelería Miranda Carlos III',320.81,'2024-03-14',4,821.83,79.4,10,881.75),(289,'Cierre Pastelería Miranda Carlos III',221.91,'2024-03-15',4,320.81,191.75,10,471.4),(290,'Cierre Cafetería Miranda',758.75,'2024-03-16',2,376.2,104.8,3,60),(291,'Cierre Pastelería Miranda Carlos III',360.56,'2024-03-16',4,271.91,216.35,10,444.82),(292,'Cierre Pastelería Miranda Carlos III',619.96,'2024-03-17',4,360.56,330.89,10,104),(293,'Cierre Pastelería Miranda Carlos III',501.95,'2024-03-18',4,619.96,114.88,10,422.24),(294,'Cierre Pastelería Miranda Carlos III',265.83,'2024-03-19',4,701.95,186.55,10,908.33),(295,'Cierre Pastelería Miranda Carlos III',256.36,'2024-03-20',4,365.83,88.1,10,544.44),(296,'Cierre Pastelería Miranda Carlos III',279.65,'2024-03-21',4,541.9,208.5,10,741.54),(297,'Cierre Pastelería Miranda Carlos III',438.24,'2024-03-22',4,409.65,209.95,10,378.38),(298,'Cierre Pastelería Miranda Carlos III',590.71,'2024-03-23',4,438.24,184.55,10,360.42),(299,'Cierre Pastelería Miranda Carlos III',700,'2024-03-24',4,590.71,331.05,10,756.65),(300,'Cierre Pastelería Miranda Carlos III',223.73,'2024-03-25',4,750,197.54,10,1076.47),(301,'Cierre Pastelería Miranda Carlos III',208.77,'2024-03-26',4,223.73,135.8,10,645.47),(302,'Cierre Pastelería Miranda Carlos III',426.02,'2024-03-27',4,908.77,123.25,10,1041.98),(304,'Cierre Pastelería Miranda Carlos III',731.38,'2024-03-28',4,426.02,282.68,10,381.85),(305,'Cierre Pastelería Miranda Carlos III',700,'2024-03-29',4,700,321.15,10,1022.56),(306,'Cierre Pastelería Miranda Carlos III',602.7,'2024-03-30',4,700,152.75,10,641.94),(307,'Cierre Pastelería Miranda Carlos III',700,'2024-03-31',4,602.7,286.71,10,752.2),(308,'Cierre Pastelería Miranda Carlos III',700,'2024-01-01',4,645,196.52,10,818.31),(309,'Cierre Pastelería Miranda Carlos III',700,'2024-01-05',4,483.55,467.7,10,529.37),(310,'Cierre Pastelería Miranda Carlos III',700,'2024-01-06',4,700,387.73,10,994.49),(311,'Cierre Pastelería Miranda Carlos III',700,'2024-01-07',4,700,286,10,799.47),(312,'Cierre Pastelería Miranda Carlos III',487.97,'2024-01-08',4,900,31.94,10,842.93),(313,'Cierre Pastelería Miranda Carlos III',273.49,'2024-01-09',4,637.97,64.35,10,793.27),(314,'Cierre Pastelería Miranda Carlos III',319.3,'2024-01-10',4,373.49,60.2,10,478.83),(315,'Cierre Pastelería Miranda Carlos III',282.48,'2024-01-11',4,519.3,135.9,10,673.76),(316,'Cierre Pastelería Miranda Carlos III',323.55,'2024-01-13',4,434.46,118.42,10,540.51),(317,'Cierre Pastelería Miranda Carlos III',545.95,'2024-01-14',4,323.65,261,10,545.95),(319,'Cierre Pastelería Miranda Carlos III',332.41,'2024-01-15',4,760.58,63.73,10,332.41),(320,'Cierre Pastelería Miranda Carlos III',700,'2024-01-21',4,448.58,325.84,10,739.27),(322,'Cierre Pastelería Miranda Carlos III',384.67,'2024-01-25',4,469.7,131.85,10,738.24),(323,'Cierre Pastelería Miranda Carlos III',355.23,'2024-01-26',4,465.68,122.63,10,562.64),(324,'Cierre Pastelería Miranda Carlos III',450.71,'2024-01-24',4,306.75,215.45,10,443.54),(325,'Cierre Pastelería Miranda Carlos III',306.75,'2024-01-23',4,700,53.56,10,1031.11),(326,'Cierre Pastelería Miranda Carlos III',436.29,'2024-01-27',4,355.23,94.45,10,526.59),(327,'Cierre Pastelería Miranda Carlos III',700,'2024-01-28',4,436.29,270.93,10,661.38),(328,'Cierre Pastelería Miranda Carlos III',582.19,'2024-01-29',4,700,79,10,524.17),(329,'Cierre Pastelería Miranda Carlos III',258.35,'2024-01-30',4,682.19,96.3,10,822.34),(330,'Cierre Pastelería Miranda Carlos III',523.69,'2024-01-31',4,258.35,117.11,10,288.68),(331,'Cierre Cafetería Miranda',560.1,'2024-01-16',2,461.47,64.6,10,337.53),(332,'Cierre Cafetería Miranda',392.9,'2024-01-17',2,500,70.5,10,356.76),(334,'Cierre Pastelería Miranda Mezquita',457.96,'2024-01-01',3,301.1,156.9,10,600),(335,'Cierre Pastelería Miranda Mezquita',389.06,'2024-01-02',3,457.96,91.8,10,423.58),(336,'Cierre Pastelería Miranda Mezquita',389.52,'2024-01-03',3,389.06,42.25,10,309.6),(337,'Cierre Pastelería Miranda Mezquita',155.88,'2024-01-04',3,389.52,55.55,10,517.64),(338,'Cierre Pastelería Miranda Mezquita',666.35,'2024-01-05',3,155.88,474.55,10,211.86),(339,'Cierre Pastelería Miranda Mezquita',903.07,'2024-01-06',3,500,109.7,10,181),(340,'Cierre Pastelería Miranda Mezquita',687,'2024-01-07',3,500,114.42,10,286.51),(341,'Cierre Pastelería Miranda Mezquita',420,'2024-01-08',3,500,40,10,530.7),(342,'Cierre Pastelería Miranda Mezquita',206.31,'2024-01-09',3,420.47,58.13,10,484.55),(343,'Cierre Pastelería Miranda Mezquita',291.26,'2024-01-10',3,206.31,32.6,10,198.27),(344,'Cierre Pastelería Miranda Mezquita',209.92,'2024-01-11',3,291.26,98.78,10,348.26),(345,'Cierre Pastelería Miranda Mezquita',181.87,'2024-01-12',3,209.92,52.75,10,261.34),(346,'Cierre Pastelería Miranda Mezquita',215.09,'2024-01-13',3,181.87,40.5,10,468.59),(347,'Cierre Pastelería Miranda Mezquita',279.59,'2024-01-14',3,215.09,82.9,10,506.57),(348,'Cierre Pastelería Miranda Mezquita',373.38,'2024-01-15',3,279.55,60.35,10,341.09),(349,'Cierre Pastelería Miranda Mezquita',249.69,'2024-01-16',3,373.38,23.66,10,553.32),(350,'Cierre Pastelería Miranda Mezquita',163.88,'2024-01-17',3,249.69,32.65,10,264.36),(351,'Cierre Pastelería Miranda Mezquita',258.02,'2024-01-18',3,166.88,68.2,10,264.74),(352,'Cierre Pastelería Miranda Mezquita',173.08,'2024-01-19',3,258.02,54.05,10,367.84),(354,'Cierre Pastelería Miranda Mezquita',332.95,'2024-01-21',3,226.88,84.15,10,462.2),(355,'Cierre Pastelería Miranda Mezquita',427.58,'2024-01-22',3,332.95,75.1,10,281.61),(356,'Cierre Pastelería Miranda Mezquita',358.6,'2024-01-23',3,427.58,54.09,10,376.83),(358,'Cierre Pastelería Miranda Mezquita',279.9,'2024-01-24',3,358.6,37.25,10,338.67),(359,'Cierre Pastelería Miranda Mezquita',145.1,'2024-01-25',3,319.9,42.35,10,488.67),(360,'Cierre Pastelería Miranda Mezquita',214.35,'2024-01-26',3,145.1,77.3,10,246.71),(361,'Cierre Pastelería Miranda Mezquita',245.35,'2024-01-27',3,214.35,109.45,10,339.35),(362,'Cierre Pastelería Miranda Mezquita',540.92,'2024-01-28',3,245.35,143.7,10,261),(363,'Cierre Pastelería Miranda Mezquita',418.38,'2024-01-29',3,500,81.75,10,448.89),(364,'Cierre Pastelería Miranda Mezquita',264.65,'2024-01-30',3,418.38,67.7,10,388.75),(365,'Cierre Pastelería Miranda Mezquita',393.57,'2024-01-31',3,264.65,21.5,10,199.5),(366,'Cierre Pastelería Miranda Mezquita',176.03,'2024-02-01',3,513.57,36.25,10,718.54),(367,'Cierre Pastelería Miranda Mezquita',195.18,'2024-02-02',3,176.03,27.75,10,402.58),(368,'Cierre Pastelería Miranda Mezquita',230.76,'2024-02-03',3,195.18,88.82,10,277.32),(369,'Cierre Pastelería Miranda Mezquita',309.88,'2024-02-04',3,510.76,143.59,10,443),(370,'Cierre Pastelería Miranda Mezquita',437.89,'2024-02-05',3,309.88,94.15,10,276.35),(371,'Cierre Pastelería Miranda Mezquita',232.18,'2024-02-06',3,437.84,71,10,394.59),(372,'Cierre Pastelería Miranda Mezquita',194.08,'2024-02-07',3,232.18,37.95,10,262.91),(373,'Cierre Pastelería Miranda Mezquita',175.56,'2024-02-08',3,394.08,77.3,10,493.21),(374,'Cierre Pastelería Miranda Mezquita',180.71,'2024-02-09',3,213.11,30.9,10,358.15),(376,'Cierre Pastelería Miranda Mezquita',268.83,'2024-02-10',3,180.71,109.65,10,301.29),(377,'Cierre Pastelería Miranda Mezquita',434.74,'2024-02-11',3,559.75,156.89,10,454.17),(378,'Cierre Pastelería Miranda Mezquita',469.68,'2024-02-12',3,434.74,89.2,10,325.07),(379,'Cierre Pastelería Miranda Mezquita',182.34,'2024-02-13',3,569.68,85.96,10,652.35),(380,'Cierre Pastelería Miranda Mezquita',308.95,'2024-02-14',3,182.34,57.2,10,236.76),(381,'Cierre Pastelería Miranda Mezquita',204.45,'2024-02-15',3,308.95,51.63,10,350.6),(382,'Cierre Pastelería Miranda Mezquita',143.12,'2024-02-16',3,204.45,62.3,10,407.83),(383,'Cierre Pastelería Miranda Mezquita',166.23,'2024-02-17',3,323.12,49.38,10,434.04),(385,'Cierre Pastelería Miranda Mezquita',298.89,'2024-02-18',3,566.23,83.49,10,538.75),(386,'Cierre Pastelería Miranda Mezquita',594.53,'2024-02-19',3,298.89,40.45,10,149.45),(387,'Cierre Pastelería Miranda Mezquita',552.04,'2024-02-20',3,500,66.6,10,364.63),(388,'Cierre Pastelería Miranda Mezquita',397.16,'2024-02-21',3,500,67.8,10,463.14),(389,'Cierre Pastelería Miranda Mezquita',249.74,'2024-02-22',3,397.16,58.75,10,382.26),(390,'Cierre Pastelería Miranda Mezquita',235.14,'2024-02-23',3,299.74,82.5,10,466.62),(393,'Cierre Pastelería Miranda Mezquita',320.53,'2024-02-24',3,235,83.05,10,279.45),(394,'Cierre Pastelería Miranda Mezquita',656.24,'2024-02-25',3,320.53,149.88,10,296.25),(395,'Cierre Pastelería Miranda Mezquita',556.46,'2024-02-26',3,500,139.25,10,383.48),(396,'Cierre Pastelería Miranda Mezquita',451.89,'2024-02-28',3,193.57,215.9,10,250.68),(397,'Cierre Pastelería Miranda Mezquita',193.57,'2024-02-27',3,500,74.25,10,632.77),(398,'Cierre Pastelería Miranda Mezquita',200.65,'2024-02-29',3,451.89,52.5,10,548.86),(399,'Cierre Pastelería Miranda Mezquita',188.19,'2024-03-01',3,200.65,39.85,10,331.69),(400,'Cierre Pastelería Miranda Mezquita',147.7,'2024-03-02',3,188.19,160.62,10,296.24),(401,'Cierre Pastelería Miranda Mezquita',237.81,'2024-03-03',3,147.7,146.45,10,519.53),(402,'Cierre Pastelería Miranda Mezquita',226.88,'2024-01-20',3,173.08,152.7,10,225.84),(403,'Cierre Pastelería Miranda Mezquita',323.62,'2024-03-04',3,237.81,31.9,10,255.17),(404,'Cierre Pastelería Miranda Mezquita',125.53,'2024-03-05',3,323.62,34.15,10,640.66),(405,'Cierre Pastelería Miranda Mezquita',78.77,'2024-03-06',3,165.53,13.25,10,297.94),(406,'Cierre Pastelería Miranda Mezquita',212.73,'2024-03-07',3,108.77,19.5,10,220.27),(407,'Cierre Pastelería Miranda Mezquita',198.9,'2024-03-08',3,212.73,38.6,10,214.17),(408,'Cierre Pastelería Miranda Mezquita',197.37,'2024-03-09',3,198.9,200.37,10,320.64),(409,'Cierre Pastelería Miranda Mezquita',430.09,'2024-03-10',3,197.37,92.45,10,110),(410,'Cierre Pastelería Miranda Mezquita',480.21,'2024-03-11',3,430.09,75.2,10,405.22),(411,'Cierre Pastelería Miranda Mezquita',309.92,'2024-03-12',3,480.21,23.95,10,464.21),(412,'Cierre Pastelería Miranda Mezquita',313.61,'2024-03-13',3,309.92,49.22,10,298.92),(413,'Cierre Pastelería Miranda Mezquita',191.35,'2024-03-14',3,483.61,31.35,10,609.71),(414,'Cierre Pastelería Miranda Mezquita',186.79,'2024-03-15',3,191.35,87.15,10,365.8),(415,'Cierre Pastelería Miranda Mezquita',155.62,'2024-03-16',3,186.79,90,10,288.88),(416,'Cierre Pastelería Miranda Mezquita',341.99,'2024-03-17',3,155.62,233.65,10,358),(417,'Cierre Pastelería Miranda Mezquita',435.4,'2024-03-18',3,341.99,116,10,367.68),(418,'Cierre Pastelería Miranda Mezquita',257.05,'2024-03-19',3,435.4,258.55,10,515.81),(419,'Cierre Pastelería Miranda Mezquita',118.2,'2024-03-20',3,407.05,36.7,10,557.15),(420,'Cierre Pastelería Miranda Mezquita',161.14,'2024-03-21',3,118.2,79.45,10,327.25),(421,'Cierre Pastelería Miranda Mezquita',239.63,'2024-03-22',3,161.14,68.05,10,301.88),(422,'Cierre Pastelería Miranda Mezquita',164.88,'2024-03-23',3,239.63,66.05,10,486.15),(423,'Cierre Pastelería Miranda Mezquita',298.97,'2024-03-24',3,164.88,84.63,10,401),(424,'Cierre Pastelería Miranda Mezquita',233.2,'2024-03-25',3,298.97,189.88,10,554.42),(425,'Cierre Pastelería Miranda Mezquita',132.34,'2024-03-26',3,333.2,45.6,10,371.8),(426,'Cierre Pastelería Miranda Mezquita',232.83,'2024-03-27',3,282.34,158.92,10,310.52),(427,'Cierre Pastelería Miranda Mezquita',273.9,'2024-03-28',3,232.83,207.46,10,321.13),(428,'Cierre Pastelería Miranda Mezquita',607,'2024-03-29',3,273.9,132.45,10,129),(429,'Cierre Pastelería Miranda Mezquita',408.21,'2024-03-30',3,500,49.12,10,435.32),(430,'Cierre Pastelería Miranda Mezquita',416.99,'2024-03-31',3,408.21,93.65,10,74);
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

-- Dump completed on 2024-04-23 22:44:48
