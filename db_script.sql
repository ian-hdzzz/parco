CREATE DATABASE ParcoDB;
USE ParcoDB;

-- Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- QR Codes Table
CREATE TABLE QRcodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid DATETIME DEFAULT NULL -- NULL until paid, then set to payment time
);

-- UsersQR Table (Tracks QR Code Usage)
CREATE TABLE UsersQR (
    userId INT,
    qrcodeId INT,
    status ENUM('closed', 'open', 'paid') NOT NULL DEFAULT 'open',
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (qrcodeId) REFERENCES QRcodes(id) ON DELETE CASCADE
);

-- Parking Lots Table
CREATE TABLE ParkingLots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Malls Table
CREATE TABLE Malls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
);

INSERT INTO Malls (name, city)
VALUES ("Crisobal Plaza", "Chi"),
	("Pachuca Palace", "Hid"),
	("Antea Lifestyle Center", "Qro"),
	("Plaza del Parque", "Qro"),
	("Plaza SKY CENTER", "Qro"),
	("Plaza el Foro", "Qro"),
	("DowntownCenter", "CDMX");