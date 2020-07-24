DROP DATABASE IF EXISTS beergenie_db;
CREATE DATABASE beergenie_db;

USE beergenie_db;

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR (255), 
last_name VARCHAR (255),
beer_id int(21) NOT NULL,
PRIMARY KEY(id)
);


