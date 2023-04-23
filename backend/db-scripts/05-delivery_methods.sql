USE `full-stack-ecommerce`;

SET foreign_key_checks = 0;

--
-- Table structure for table `delivery_methods`
--

DROP TABLE IF EXISTS `delivery_methods`;

CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`delivery_methods` (
  `id` smallint unsigned NOT NULL,
  `short_name` varchar(4) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `delivery_time` varchar(255) DEFAULT NULL,
  `price` decimal(13,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Data for table `country`
--

INSERT INTO `delivery_methods` VALUES 
(1,'UPS1','Fatest delivery time', '1-2 Days', 10),
(2,'UPS2','Get it within 5 days', '2-5 Days', 5),
(3,'UPS3','Slower but cheap', '5-10 Days', 2),
(4,'FREE','Free! You get what you pay for', '1-2 Weeks', 0);

SET FOREIGN_KEY_CHECKS=1;
