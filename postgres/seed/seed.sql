BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2020-05-01');
INSERT INTO login (hash, email) values ('$2a$10$U/E0yx7qHALVsvpm5TEJrurxSfUtI0Z6bQquPyWAnpCQ51on3x4/G', 'jessie@gmail.com');

COMMIT;