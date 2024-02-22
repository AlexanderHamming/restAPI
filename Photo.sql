-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 22 feb 2024 kl 11:41
-- Serverversion: 5.7.39
-- PHP-version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fed23photos`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `Photo`
--

CREATE TABLE `Photo` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Photo`
--

INSERT INTO `Photo` (`id`, `title`, `url`, `comment`, `userId`) VALUES
(1, 'When life gives you confetti, celebrate', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Yolo', 2),
(2, 'hola hola #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff', 'hello!', 2),
(3, 'hallå där', 'https://images.unsplash.com/photo-1492684223066-81342ee5fsad', 'blöh!', 2);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `Photo`
--
ALTER TABLE `Photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_userId_fkey` (`userId`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `Photo`
--
ALTER TABLE `Photo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `Photo`
--
ALTER TABLE `Photo`
  ADD CONSTRAINT `Photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
