-- CATEGORIES
INSERT INTO categories (name) VALUES ("smarts TVs");
INSERT INTO categories (name) VALUES ("laptops");
INSERT INTO categories (name) VALUES ("keyboards");

-- Insert sample products
INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Philips 32HFL5114', '32HFL5114/12 with MediaSuite features, advanced connectivity and versatile configuration.', 'Philips', 438, 500, '732x179x494 mm', 333, 'https://img.pccomponentes.com/articles/39/391858/1661-philips-32hfl5114-12-32-led-fullhd.jpg', 1);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('ASUS TUF Gaming F15', 'FX506HC-HN004 Intel Core i5-11400H/16GB/512GB SSD/RTX 3050/15.6', 'ASUS', 1039, 2300, '350x250x23 mm', 777, 'https://img.pccomponentes.com/articles/1046/10466208/1836-asus-tuf-gaming-f15-fx506hc-hn004-intel-core-i5-11400h-16gb-512gb-ssd-rtx-3050-156.jpg', 2);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('LG 32L', ' High picture quality and a simple, user-friendly interface complement the HD image.', 'LG', 385, 300, '739x168472mm', 200, 'https://img.pccomponentes.com/articles/40/407902/1896-lg-32lt340c-32-led-hd.jpg', 1);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Logitech K120', ' Keyboard con Cable USB Negro', 'Logitech', 12, 550, '450x155x23.5 mm', 222, 'https://img.pccomponentes.com/articles/4/43015/130-logitech-keyboard-k120-teclado-usb-comprar.jpg', 3);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Lenovo IdeaPad 3', '15ALC6 AMD Ryzen 7 5700U/16 GB/512 GB SSD/15.6', 'Lenovo', 1650, 699, '359x236x19 cm', 80, 'https://img.pccomponentes.com/articles/1063/10639213/1359-lenovo-ideapad-3-15iau7-intel-core-i5-1235u-16gb-512gb-ssd-156.jpg', 2);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Apple Magic Keyboard', ' numeric keypad has an expanded layout, with navigation controls to help you scroll quickly through your documents', 'Apple', 118, 390, '418x114x10 mm', 15, 'https://img.pccomponentes.com/articles/20/201176/1.jpg', 3);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Product 7', 'Description of Product 7', 'Brand 1', 35, 850, '18x8x4 cm', 40, 'image7.jpg', 2);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Razer Huntsman', 'V2 TKL Mechanical Gaming Keyboard RGB Switch Optical Linear Switch Red', 'Razer', 171, 550, '450x155x23 mm', 444, 'https://img.pccomponentes.com/articles/1003/10034697/1729-razer-huntsman-v2-tenkeyless-teclado-mecanico-gaming-rgb-switch-optico-lineal-red.jpg', 3);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Hisense 32A5KQ 32"', 'QLED FullHD', 'Hisense', 276, 3800, '721x179x452 mm', 666, 'https://img.pccomponentes.com/articles/1072/10728623/1379-hisense-32a5kq-32-qled-fullhd.jpg', 1);

INSERT INTO products (name, description, brand, price, weight, volume, stock, image, category_id)
VALUES ('Apple Macbook Pro', 'Apple M2/8GB/256GB SSD/GPU Deca Core/13.3" Silver', 'Apple', 1409, 1400, '156x30x21 mm', 999, 'https://img.pccomponentes.com/articles/1039/10392479/1202-apple-macbook-pro-apple-m2-8gb-256gb-ssd-gpu-deca-core-133-plata.jpg', 2);



-- ROLES
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');