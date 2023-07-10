create database Book_Tb;

use Book_Tb;

create table Book (
    id INTEGER PRIMARY KEY ,
    b_name VARCHAR(50),
    author VARCHAR(50),
    book_type VARCHAR(50),
    price FLOAT,
    publishedDate DATE,
    langyage VARCHAR(50)
);

insert into Book  Values(1,"HarryPotter","J.K.Rowlings","fiction",90,'7/09/2023',"English");