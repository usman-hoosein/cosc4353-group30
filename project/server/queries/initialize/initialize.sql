DROP TABLE IF EXISTS FuelQuote;
DROP TABLE IF EXISTS ClientInformation;
DROP TABLE IF EXISTS UserCredentials;

CREATE TABLE UserCredentials(
    username    VARCHAR(20) NOT NULL PRIMARY KEY,
    pass        VARCHAR(100) NOT NULL
);

CREATE TABLE ClientInformation(
    username    VARCHAR(20) NOT NULL PRIMARY KEY,
    full_name   VARCHAR(30) NOT NULL,
    addr1       VARCHAR(20) NOT NULL,
    addr2       VARCHAR(20),
    city        VARCHAR(20) NOT NULL,
    us_state    VARCHAR(20) NOT NULL,
    zipcode     INTEGER NOT NULL,
    CONSTRAINT fk_user_con FOREIGN KEY(username) REFERENCES UserCredentials(username) 
        ON DELETE CASCADE
);

CREATE TABLE FuelQuote(
    quote_id            SERIAL PRIMARY KEY,
    username            VARCHAR(20) NOT NULL,
    date_requested      DATE NOT NULL,
    date_delivered      DATE NOT NULL,
    address                VARCHAR(90) NOT NULL,
    gallons_requested   INTEGER NOT NULL,
    price_per_gallon    MONEY NOT NULL,
    total_paid          MONEY NOT NULL,
    CONSTRAINT fk_username_con FOREIGN KEY(username) REFERENCES UserCredentials(username)
        ON DELETE CASCADE
);

INSERT INTO UserCredentials(username, pass) VALUES ('mooncoast_services', 'c64d0c34f1aab92d579ebe3de95859fa:fb001eb775cfa3ddeba361c038b468dbbfbc718e44a6ebec82d152fbdbe58948');     /*password: luv2drill*/
INSERT INTO UserCredentials(username, pass) VALUES ('spongegod69', 'f86620eed1c2007a238236899027ba23:22ec7f0b902212adad33891a76a84e40cb9ca27b7e649e56df116565264dd16b');         /*password: sandyscheeks*/
INSERT INTO UserCredentials(username, pass) VALUES ('edp445', '2562ae863a2bce67c10e1723bb57c31d:a4fd0340977796a8ede723a1412527e1b30a7e4c23de67978326da3dfc1b4caf');                  /*password: cupcakes*/

INSERT INTO ClientInformation(username, full_name, addr1, addr2, city, us_state, zipcode) VALUES ('mooncoast_services', 'Alec Brakes', '111 Good Ln', 'Apt 22', 'Houston', 'TX', 77077);
INSERT INTO ClientInformation(username, full_name, addr1, addr2, city, us_state, zipcode) VALUES ('spongegod69', 'Spongebob Squarepants', '123 Conch St', NULL, 'Bikini Bottom', 'TX', 42069);
INSERT INTO ClientInformation(username, full_name, addr1, addr2, city, us_state, zipcode) VALUES ('edp445', 'Bryant Moreland', '445 Eagle St', NULL, 'Philadelphia', 'PA', 19019);

-- INSERT INTO FuelQuote(username, date_requested, date_delivered, address, gallons_requested, price_per_gallon, total_paid) VALUES ('mooncoast_services', '2020-12-31', '2021-01-07', 100, '$3.00', '$300.00');
-- INSERT INTO FuelQuote(username, date_requested, date_delivered, address, gallons_requested, price_per_gallon, total_paid) VALUES ('spongegod69', '2021-02-14', '2022-02-15', 100, '$3.00', '$300.00');
-- INSERT INTO FuelQuote(username, date_requested, date_delivered, address, gallons_requested, price_per_gallon, total_paid) VALUES ('mooncoast_services', '2021-03-30', '2021-04-07', 100, '$3.00', '$300.00');
-- INSERT INTO FuelQuote(username, date_requested, date_delivered, address, gallons_requested, price_per_gallon, total_paid) VALUES ('spongegod69', '2021-12-31', '2022-01-07', 100, '$3.00', '$300.00');
-- INSERT INTO FuelQuote(username, date_requested, date_delivered, address, gallons_requested, price_per_gallon, total_paid) VALUES ('edp445', '2022-01-30', '2022-02-03', 100, '$3.00', '$300.00');
