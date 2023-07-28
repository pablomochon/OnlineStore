-- CATEGORIES
INSERT INTO categories (name) VALUES ("test");
INSERT INTO categories (name) VALUES ("laptops");
INSERT INTO categories (name) VALUES ("keyboards");

-- Insert sample products
INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 1', 'Description of Product 1', 'Brand 1', 19.99, 500, '10x5x2 cm', 100, 'image1.jpg', 1);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 2', 'Description of Product 2', 'Brand 2', 29.99, 750, '15x8x3 cm', 50, 'image2.jpg', 2);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 3', 'Description of Product 3', 'Brand 3', 9.99, 300, '8x4x1.5 cm', 200, 'image3.jpg', 1);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 4', 'Description of Product 4', 'Brand 1', 39.99, 1000, '20x10x5 cm', 30, 'image4.jpg', 3);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 5', 'Description of Product 5', 'Brand 2', 14.99, 600, '12x6x3 cm', 80, 'image5.jpg', 2);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 6', 'Description of Product 6', 'Brand 3', 49.99, 1200, '25x12x6 cm', 15, 'image6.jpg', 3);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 7', 'Description of Product 7', 'Brand 1', 34.99, 850, '18x8x4 cm', 40, 'image7.jpg', 2);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 8', 'Description of Product 8', 'Brand 2', 64.99, 1800, '30x15x8 cm', 10, 'image8.jpg', 3);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 9', 'Description of Product 9', 'Brand 3', 27.99, 700, '14x7x3.5 cm', 60, 'image9.jpg', 1);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 10', 'Description of Product 10', 'Brand 1', 22.99, 550, '11x6x2.5 cm', 90, 'image10.jpg', 2);



-- ROLES
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');