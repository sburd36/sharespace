create table if not exists users (
    id int not null auto_increment primary key,
    email varchar(128) not null unique,
    passHash binary(60) not null,
    userName varchar(255) not null unique,
    firstName varchar(64) not null,
    lastName varchar(128) not null,
    orgID  int not null unique, 
    title varchar(50) not NULL
);

create table if not exists organization (
    id int not null auto_increment primary key, 
    orgName varchar(500) not null,
    orgCity varchar(50) not null, 
    orgAddress varchar(500) not null, 
    orgZip int not null,
    pointOfContactName varchar(500),
    pointOfContactEmail varchar(500) not null,
    pointOfContactPhone varchar(50)
);

-- create table if not exists tags (
--     id int not null auto_increment primary key, 
--     tagName varchar(500) not null, 
--     tagTypeID int 
-- );

-- create table if not exists tagType (
--     id int not null auto_increment primary key,
--     tagType varchar(500)
-- );
create table if not exists userSignIn (
    id int not null auto_increment primary key,
    userID int not null,
    dateTime datetime not null,
    clientIP varchar(500) not null


);
