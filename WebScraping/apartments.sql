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


/*INSERT INTO aparts (name, breed, age, sex)
  VALUES ('Tyler', 'Retrieved', 3, 'M');*/