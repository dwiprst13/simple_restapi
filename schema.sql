CREATE DATABASE bertanidb;

\c bertanidb;

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_fullname varchar(150),
    user_nickname varchar(25),
    user_username varchar(16),
    user_email varchar(50),
    user_phone varchar(16)
);