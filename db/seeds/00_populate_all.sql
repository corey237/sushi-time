
INSERT INTO users (name, email, password, phone_number, is_admin)
VALUES

('Bob Mckenzie', 'bmckenzie@gmail.com', 'P@ssw0rd123', '16472345678', FALSE)
('Alice Smith', 'asmith@yahoo.com', 'P@ssw0rd123', '14161234567', FALSE)
('Alex Johnson', 'ajohnson@hotmail.com', 'P@ssw0rd123', '14371634567', FALSE);


INSERT INTO items (item_name, price, item_category, item_img)
VALUES
('Miso Soup', 5, 'Appetizer', '/img/miso-soup.jpg'),
('Onigiri (Japenese Riceballs)', 7, 'Appetizer', '/img/onigiri.jpg'),
('Japenese Chilled Tofu', 8, 'Appetizer', '/img/chilled_tofu.jpg'),
('Salted Adamame', 8, 'Appetizer', '/img/chilled_tofu.jpg'),
('California Rolls', 15, 'Main', '/img/california_rolls.jpg'),
('Chicken Teriyaki', 20, 'Main', '/img/chicken_teriyaki.jpg'),
('Shrimp Tempura', 16, 'Main', '/img/shrimp_tempura.jpg'),
('Cucumber Rolls', 15, 'Main', '/img/cucumber_roll.jpg'),
('Ice Cream', 5, 'Dessert', '/img/ice_cream.jpg'),
('Dorayaki', 8, 'Dessert', '/img/dorayaki.jpg'),
('Souffle Pancakes', 7, 'Dessert', '/img/souffle_pancakes.jpg'),
('Japenese Cheesecake', 11, 'Dessert', '/img/cheesecake.jpg');

INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);
