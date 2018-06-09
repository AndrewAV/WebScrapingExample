DROP DATABASE IF EXISTS webScrapingApartments;
CREATE DATABASE webScrapingApartments;

CREATE TABLE aparts (
    ID SERIAL PRIMARY KEY,
    title VARCHAR,
    ubication  VARCHAR,
    descrip VARCHAR,
    price VARCHAR, 
    timee VARCHAR,
    rooms VARCHAR
);
