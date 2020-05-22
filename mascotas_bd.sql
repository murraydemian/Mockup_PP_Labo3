-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2019 a las 02:43:27
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mascotas_bd`
--
CREATE DATABASE IF NOT EXISTS `mascotas_bd` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mascotas_bd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perros`
--

CREATE TABLE `perros` (
  `id` int(11) NOT NULL,
  `tamanio` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `path_foto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `perros`
--

INSERT INTO `perros` (`id`, `tamanio`, `edad`, `precio`, `nombre`, `raza`, `path_foto`) VALUES
(1, '123', 12, 54, 'gfd', 'Salchicha', 'gfd.20429.jpg'),
(4, '0', 0, 0, '0', 'Salchicha', '0.21523.jpg'),
(8, '76', 76, 76, '76', 'Chihuahua', '76.22019.jpg'),
(10, '999', 999, 99, '99', 'Pitbull', '99.22123.jpg'),
(12, '87', 87, 87, '87', 'Pitbull', '87.22731.jpg'),
(13, '111', 111, 111, '111', 'Caniche', '111.22913.jpg'),
(14, '0000', 0, 0, '0000', 'Pitbull', '0000.23027.jpg'),
(15, '0000', 0, 0, '0000', 'Pitbull', '0000.23115.jpg'),
(16, '0000', 0, 0, '0000', 'Pitbull', '0000.23126.jpg'),
(17, '0', 111, 0, '0', 'Pitbull', '0.24014.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `perros`
--
ALTER TABLE `perros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `perros`
--
ALTER TABLE `perros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
