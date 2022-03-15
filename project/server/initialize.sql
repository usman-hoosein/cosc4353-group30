DROP TABLE IF EXISTS FuelQuote;
DROP TABLE IF EXISTS ClientInformation;
DROP TABLE IF EXISTS UserCredentials;

CREATE TABLE UserCredentials(
    username    VARCHAR(20) NOT NULL PRIMARY KEY,
    pass        VARCHAR(20) NOT NULL
);

CREATE TABLE ClientInformation(
    client_id   INTEGER NOT NULL PRIMARY KEY,
    full_name   VARCHAR(30) NOT NULL,
    addr1       VARCHAR(20) NOT NULL,
    addr2       VARCHAR(20),
    city        VARCHAR(20) NOT NULL,
    us_state    VARCHAR(20) NOT NULL,
    zipcode     INTEGER NOT NULL,
    username    VARCHAR(20) NOT NULL,
    CONSTRAINT fk_user_con FOREIGN KEY(username) REFERENCES UserCredentials(username)
);

CREATE TABLE FuelQuote(
    quote_id            INTEGER NOT NULL PRIMARY KEY,
    client_id           INTEGER NOT NULL,
    date_requested      DATE NOT NULL,
    date_delivered      DATE NOT NULL,
    gallons_requested   INTEGER NOT NULL,
    price_per_gallon    MONEY NOT NULL,
    total_paid          MONEY NOT NULL,
    CONSTRAINT fk_client_id_con FOREIGN KEY(client_id) REFERENCES ClientInformation(client_id)
);

INSERT INTO UserCredentials(username, pass) VALUES ('mooncoast_services', 'luv2drill');
INSERT INTO UserCredentials(username, pass) VALUES ('spongegod69', 'sandyscheeks');
INSERT INTO UserCredentials(username, pass) VALUES ('edp445', 'cupcakes');

INSERT INTO ClientInformation(client_id, full_name, addr1, addr2, city, us_state, zipcode, username) VALUES (10000, 'Alec Brakes', '111 Good Ln', 'Apt 22', 'Houston', 'TX', 77077, 'mooncoast_services');
INSERT INTO ClientInformation(client_id, full_name, addr1, addr2, city, us_state, zipcode, username) VALUES (10001, 'Spongebob Squarepants', '123 Conch St', NULL, 'Bikini Bottom', 'TX', 42069, 'spongegod69');
INSERT INTO ClientInformation(client_id, full_name, addr1, addr2, city, us_state, zipcode, username) VALUES (10002, 'Bryant Moreland', '445 Eagle St', NULL, 'Philadelphia', 'PA', 19019, 'edp445');

INSERT INTO FuelQuote(quote_id, client_id, date_requested, date_delivered, gallons_requested, price_per_gallon, total_paid) VALUES (20000, 10000, '2020-12-31', '2021-01-07', 100, '$3.00', '$300.00');
INSERT INTO FuelQuote(quote_id, client_id, date_requested, date_delivered, gallons_requested, price_per_gallon, total_paid) VALUES (20001, 10001, '2021-02-14', '2022-02-15', 100, '$3.00', '$300.00');
INSERT INTO FuelQuote(quote_id, client_id, date_requested, date_delivered, gallons_requested, price_per_gallon, total_paid) VALUES (20002, 10000, '2021-03-30', '2021-04-07', 100, '$3.00', '$300.00');
INSERT INTO FuelQuote(quote_id, client_id, date_requested, date_delivered, gallons_requested, price_per_gallon, total_paid) VALUES (20003, 10001, '2021-12-31', '2022-01-07', 100, '$3.00', '$300.00');
INSERT INTO FuelQuote(quote_id, client_id, date_requested, date_delivered, gallons_requested, price_per_gallon, total_paid) VALUES (20004, 10002, '2022-01-30', '2022-02-03', 100, '$3.00', '$300.00');
