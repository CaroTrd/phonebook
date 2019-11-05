-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 05, 2019 at 07:28 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `phonebook`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE contact (
  contact_id int(11) NOT NULL AUTO_INCREMENT,
  firstname varchar(150) NOT NULL,
  last_name varchar(150) NOT NULL,
  phone varchar(14) NOT NULL,
  PRIMARY KEY (contact_id)
); 
