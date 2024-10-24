-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Oct 24, 2024 at 03:59 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ts_pick_up`
--

-- --------------------------------------------------------

--
-- Table structure for table `rentals`
--

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `unitId` int(11) NOT NULL,
  `rent_start` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `rent_end` datetime(3) DEFAULT NULL,
  `due_date` datetime(3) NOT NULL,
  `fine_per_day` int(11) NOT NULL DEFAULT 50000,
  `total_fine` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rentals`
--

INSERT INTO `rentals` (`id`, `userId`, `unitId`, `rent_start`, `rent_end`, `due_date`, `fine_per_day`, `total_fine`) VALUES
(1, 4, 3, '2024-10-23 02:53:07.589', '2024-10-24 13:29:50.589', '2024-10-24 00:00:00.000', 50000, 50000),
(2, 4, 3, '2024-10-23 02:54:53.911', '2024-10-24 13:29:52.061', '2024-10-25 00:00:00.000', 50000, 0),
(3, 4, 3, '2024-10-23 03:10:29.076', '2024-10-23 03:14:56.456', '2024-10-20 00:00:00.000', 50000, 200000),
(6, 4, 3, '2024-10-23 03:17:52.947', '2024-10-23 03:22:47.033', '2024-10-19 00:00:00.000', 50000, 250000),
(7, 4, 3, '2024-10-23 03:18:18.405', '2024-10-23 03:22:23.400', '2024-10-19 00:00:00.000', 50000, 250000),
(8, 4, 3, '2024-10-23 03:29:21.397', '2024-10-23 03:37:42.717', '2024-10-19 00:00:00.000', 50000, 250000),
(9, 4, 3, '2024-10-23 03:30:01.147', '2024-10-23 03:38:29.045', '2024-10-19 00:00:00.000', 50000, 250000),
(11, 4, 3, '2024-10-24 06:21:05.912', '2024-10-24 13:29:47.417', '2024-10-19 00:00:00.000', 50000, 300000),
(12, 4, 3, '2024-10-24 06:21:10.051', '2024-10-24 13:29:46.321', '2024-10-19 00:00:00.000', 50000, 300000),
(13, 4, 3, '2024-10-24 08:11:38.892', '2024-10-24 13:29:44.537', '2024-10-24 00:00:00.000', 50000, 50000),
(14, 4, 3, '2024-10-24 08:43:28.282', '2024-10-24 13:29:42.570', '2024-10-30 00:00:00.000', 50000, 0),
(15, 4, 3, '2024-10-24 08:43:34.674', '2024-10-24 13:26:14.916', '2024-10-31 00:00:00.000', 50000, 0),
(16, 4, 4, '2024-10-24 13:06:47.050', '2024-10-24 13:25:48.984', '2024-10-25 00:00:00.000', 50000, 0),
(17, 4, 3, '2024-10-24 13:06:53.259', '2024-10-24 13:24:36.509', '2024-10-26 00:00:00.000', 50000, 0),
(18, 4, 3, '2024-10-24 13:36:00.941', '2024-10-24 13:40:16.289', '2024-10-25 00:00:00.000', 50000, 0),
(19, 4, 4, '2024-10-24 13:36:09.920', '2024-10-24 13:40:21.504', '2024-10-23 00:00:00.000', 50000, 100000);

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `categories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`categories`)),
  `multiple_by` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `categories`, `multiple_by`, `price`) VALUES
(3, 'Toyota', '[{\"category\":\"Kuat\"},{\"category\":\"Irit\"}]', NULL, 100000),
(4, 'Honda', '[{\"category\":\"kuat\"},{\"category\":\"hemat\"}]', NULL, 2000000),
(5, 'Suzuki', '[{\"category\":\"Besar\"},{\"category\":\"Irit\"}]', NULL, 3000000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `histories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`histories`)),
  `rent_number` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `refresh_token`, `histories`, `rent_number`) VALUES
(3, 'safirs@gmail.com', 'safirs', '$2b$10$wJthPhBdm0tKjwG/VmI7zeP2rHvULGjZUy2XDWDB5VVcpLlLotTta', 'Admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FmaXJzIiwiZW1haWwiOiJzYWZpcnNAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzI5Nzc3MDE4LCJleHAiOjE3Mjk4NjM0MTh9.bOj_3seuuLE8Me6cxRJGZSWiW3ZMsngJU3yk8ZkfBrg', NULL, 0),
(4, 'eri@gmail.com', 'eri', '$2b$10$B46cl20/G37s1TavWKpr3uTBZrABA4MrGizlQTdRAf3n1pJb8rxGG', 'Anggota', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXJpIiwiZW1haWwiOiJlcmlAZ21haWwuY29tIiwicm9sZSI6IkFuZ2dvdGEiLCJpYXQiOjE3Mjk3NzY5MjgsImV4cCI6MTcyOTg2MzMyOH0.566Jw1NseJL8A-TVvd2lVDrZcnA6aMvrJt-8lcGF6k4', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0443e72d-2971-4530-acd9-6b7579d0ce67', 'a388641677bc4b815d14dcd7a4a2ae75ecdfa4d32ffa626fd16e5f8e2390a9df', '2024-10-22 08:33:15.182', '20241022083315_change_user_model', NULL, NULL, '2024-10-22 08:33:15.172', 1),
('1863d15f-3e3d-4960-8d88-5d86b01fc4f0', 'dac5948d6bea9d2f8ead7e6f7051fc150d34aa7bddff3ebab860b4305fc0eda7', '2024-10-22 08:30:31.081', '20241022064138_add_user_model', NULL, NULL, '2024-10-22 08:30:31.064', 1),
('70ca6eee-3d8e-4b43-ba7a-c2eb34610004', 'f0f176010fd597db3f6f58c56d71dfc39435622fe6894310e22381454c217f44', '2024-10-22 08:30:31.214', '20241022065009_add_user_model', NULL, NULL, '2024-10-22 08:30:31.204', 1),
('8bc8f496-ea62-45d7-98a4-17c12af548fa', '9002b2956c84fd4337f97920986911f762aa10a61b62213863801ecc7f8407c0', '2024-10-22 08:30:31.202', '20241022064457_add_unitonuser_model', NULL, NULL, '2024-10-22 08:30:31.102', 1),
('8dba93f1-51a7-4c77-906e-532e06838ead', '71fcc6c2ef861f67d91df1eed99d86d77b0397ed28f8666f35c4dc315d86c39b', '2024-10-22 08:30:55.240', '20241022083055_change_unitonuser_to_rental', NULL, NULL, '2024-10-22 08:30:55.046', 1),
('ba1d2095-2113-431c-87ad-34ca3cb90552', '04c2755951573b579c6609c8ea53f52d31dcd47314114e856814633ed4d478e3', '2024-10-22 08:45:16.205', '20241022084516_update_unit_model', NULL, NULL, '2024-10-22 08:45:16.174', 1),
('c3ebd0a3-588a-48c0-8ef2-e4933ba89679', '7ed72222431d05e2e769e245dcf8183aa672803e51fba03c0bf902febc85ae6b', '2024-10-22 08:30:31.100', '20241022064230_add_unit_model', NULL, NULL, '2024-10-22 08:30:31.084', 1),
('cb9fd3d3-40c3-4e80-8d70-2e2f37ef2a96', 'b1d4bcee576be8c8f9bdd7613f5c0c3cf344b271b0a41d30629239a058597372', '2024-10-22 15:16:26.952', '20241022151626_update_user_model', NULL, NULL, '2024-10-22 15:16:26.930', 1),
('f1c5bdb9-4193-4fea-8363-3a0329745db3', '21d6205ab71741e0b3d27181716980f2bb2e3bc9dcb40b7420869496fe3e5a42', '2024-10-22 08:30:31.239', '20241022070559_update_user_model', NULL, NULL, '2024-10-22 08:30:31.216', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rentals_userId_fkey` (`userId`),
  ADD KEY `rentals_unitId_fkey` (`unitId`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `rentals_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `rentals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
