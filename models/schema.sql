DROP DATABASE IF EXISTS beergenie_db;
CREATE DATABASE beergenie_db;

USE beergenie_db;

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR (255), 
last_name VARCHAR (255),
age int(21) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE favorites(
beer_id 
user_id AUTO_INCREMENT
)


