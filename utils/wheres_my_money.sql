-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 10, 2023 at 09:53 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wheres_my_money`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
('0b89b6b5-6e5d-11ee-bc81-24fe9a012734', 'Alkohol and cigarettes'),
('0d81375c-76ae-11ee-8b79-24fe9a012734', 'Playstation games'),
('1d1e2cae-6e5d-11ee-bc81-24fe9a012734', 'Entertainment'),
('2fd906bf-6e5d-11ee-bc81-24fe9a012734', 'Car fuel'),
('34b48510-76ae-11ee-8b79-24fe9a012734', 'Restaurants'),
('5a61d506-7ed5-11ee-81e3-24fe9a012734', 'Home stuff'),
('5f9dd0f9-6e5d-11ee-bc81-24fe9a012734', 'Pets'),
('e1b26fd3-6e5c-11ee-bc81-24fe9a012734', 'Grocery Store'),
('ea689951-6e5c-11ee-bc81-24fe9a012734', 'Bills');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_earnings`
--

CREATE TABLE `users_earnings` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `value` decimal(8,2) NOT NULL,
  `date` date NOT NULL,
  `source` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_earnings`
--

INSERT INTO `users_earnings` (`id`, `value`, `date`, `source`) VALUES
('190a6156-7d9c-4fe9-98e1-efd318b43072', 20.00, '2023-11-07', 'car'),
('5b72f878-92a4-42ef-8b4b-5f9b92056dea', 150.00, '2023-11-06', 'gift'),
('6d3a736a-650a-45ce-812b-27670fe3f1d9', 700.00, '2023-11-04', 'tip'),
('7b8af0ee-5e31-45d5-9fa3-83a26fe6f920', 4000.00, '2023-11-10', 'work');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_expenses`
--

CREATE TABLE `users_expenses` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(99) NOT NULL,
  `date` date NOT NULL,
  `category` varchar(99) NOT NULL,
  `price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_expenses`
--

INSERT INTO `users_expenses` (`id`, `name`, `date`, `category`, `price`) VALUES
('58ad3d60-2511-4576-86ff-05d11d680c35', 'Jack Daniels', '2023-11-09', 'Alkohol and cigarettes', 70.00),
('607988c8-7f68-484b-9f73-53a56f50d328', 'Fuel', '2023-10-30', 'Car fuel', 200.00),
('60fe0a03-29d8-4cb4-8fea-bc6710c26ba5', 'Whiskey in the jar', '2023-11-05', 'Restaurants', 450.00),
('7deab710-eb4e-4939-bd1e-201c6cc71872', 'McDonald', '2023-10-27', 'Restaurants', 50.00),
('b20fc2ca-d7bb-4490-843c-f6398b7096fd', 'Desk', '2023-11-02', 'Home stuff', 400.00);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users_earnings`
--
ALTER TABLE `users_earnings`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users_expenses`
--
ALTER TABLE `users_expenses`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
