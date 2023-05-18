create table contactrequests (
 id integer PRIMARY KEY autoincrement,
 name varchar(255) NOT NULL,
 email varchar(255),
 objects varchar(255),
 message varchar(255),
 cratedAt datetime,
 updatedAt datetime
);
