-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Linux (x86_64)
--
-- Host: faure    Database: cs314
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `world`
--

DROP TABLE IF EXISTS `world`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `world` (
  `index` int(11) NOT NULL,
  `id` varchar(30) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `latitude` varchar(1000) DEFAULT NULL,
  `longitude` varchar(1000) DEFAULT NULL,
  `altitude` varchar(1000) DEFAULT NULL,
  `continent` varchar(1000) DEFAULT NULL,
  `iso_country` varchar(1000) DEFAULT NULL,
  `iso_region` varchar(1000) DEFAULT NULL,
  `municipality` varchar(1000) DEFAULT NULL,
  `scheduled_service` varchar(1000) DEFAULT NULL,
  `gps_code` varchar(1000) DEFAULT NULL,
  `iata_code` varchar(1000) DEFAULT NULL,
  `local_code` varchar(1000) DEFAULT NULL,
  `home_link` varchar(1000) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `airports_name_idx` (`name`),
  FULLTEXT KEY `airpots_municipality_idx` (`municipality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `world`
--
-- WHERE:  name like '%Dave%'

LOCK TABLES `world` WRITE;
/*!40000 ALTER TABLE `world` DISABLE KEYS */;
INSERT INTO `world` VALUES (7138,'0CO1','small_airport','Dave\'s Airport','40.0332984924','-105.124000549','5170','NA','US','US-CO','Louisville','no','0CO1',NULL,'0CO1',NULL,NULL,NULL),(8592,'1OK1','small_airport','Dave\'s Place Airport','35.82500076293945','-97.80590057373047','1160','NA','US','US-OK','Kingfisher','no','1OK1',NULL,'1OK1',NULL,NULL,NULL),(12954,'64ME','heliport','Dave Libby Heliport','43.739200592041016','-70.31289672851562','305','NA','US','US-ME','Falmouth','no','64ME',NULL,'64ME',NULL,NULL,NULL),(14080,'7CO1','small_airport','Dave Nash Ranch Airport','38.759700775146484','-105.38400268554688','8400','NA','US','US-CO','Guffey','no','7CO1',NULL,'7CO1',NULL,NULL,NULL),(14294,'7NJ9','small_airport','Dave\'s Aerodrome','39.318199157714844','-75.206298828125','8','NA','US','US-NJ','Cedarville','no','7NJ9',NULL,'7NJ9',NULL,NULL,NULL),(45247,'AA22','small_airport','Delta Daves Airport','64.132858','-145.804494','1070','NA','US','US-AK','Delta Junction','no','AA22',NULL,'AA22',NULL,NULL,NULL),(313790,'AYUD','heliport','Kais-Udave Helicopter landing site','-8.7819','147.2785','3300','OC','PG','PG-CPM',NULL,'no','AYUD',NULL,NULL,NULL,NULL,NULL),(300228,'CDF3','small_airport','Englehart (Dave\'s Field)','47.809722223','-79.8111111111','700','NA','CA','CA-ON','Englehart','no','CDF3',NULL,'CDF3',NULL,NULL,NULL),(302135,'IN-0080','closed','Pandaveswar Airfield','23.641300520900003','87.348690033',NULL,'AS','IN','IN-WB',NULL,'no',NULL,NULL,NULL,NULL,'http://en.wikipedia.org/wiki/Pandaveswar_Airfield',NULL),(18971,'K68S','small_airport','Davenport Airport','47.65359878540039','-118.16799926757812','2421','NA','US','US-WA','Davenport','no','K68S',NULL,'68S',NULL,NULL,NULL),(19669,'KDVN','small_airport','Davenport Municipal Airport','41.61029816','-90.58830261','751','NA','US','US-IA','Davenport','no','KDVN','DVN','DVN','http://www.cityofdavenportiowa.com/department/?fDD=47-0','http://en.wikipedia.org/wiki/Davenport_Municipal_Airport_(Iowa)',NULL),(22487,'MT92','seaplane_base','Dave\'s Landing Seaplane Base','47.590301513671875','-115.33699798583984','2395','NA','US','US-MT','Thompson Falls','no','MT92',NULL,'MT92',NULL,NULL,NULL),(23257,'NM39','small_airport','Davenport Airport','36.6328010559082','-108.31099700927734','5720','NA','US','US-NM','Farmington','no','NM39',NULL,'NM39',NULL,NULL,NULL),(23654,'OH91','small_airport','Dave Rice Ultralightport','40.70009995','-84.23439789','775','NA','US','US-OH','Lima','no','OH91',NULL,'OH91',NULL,NULL,NULL),(27526,'YDPD','small_airport','Davenport Downs Airport','-24.149999618530273','141.10800170898438','95','OC','AU','AU-QLD',NULL,'no','YDPD','DVP',NULL,NULL,NULL,NULL),(301103,'YFDF','small_airport','Fortescue - Dave Forrest Aerodrome','-22.290754','119.437143','1555','OC','AU','AU-WA','Cloudbreak Village','no','YFDF','KFE',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `world` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-24 12:29:53
