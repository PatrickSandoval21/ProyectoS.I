-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2021 a las 15:54:08
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurant`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`patrick`@`%` PROCEDURE `ActivateDiscount` (IN `dish_id` INT)  BEGIN
  UPDATE discount SET active = 1 WHERE id_dish = dish_id;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `addCategory` (IN `nameCat` VARCHAR(20))  BEGIN
   INSERT INTO categories( category_name ) values (nameCat  );
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `addNewDishStock` (IN `dish_id` INT, IN `initialStock` INT)  BEGIN
    INSERT INTO dish_inventory(id_dish, quantity)  VALUES (dish_id, initialStock) ;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `addPurchase` (IN `Inputid_dish` INT, IN `Inputid_customer` INT, IN `Inputquantity` INT, IN `InputpreviousPrice` DECIMAL(10,2))  BEGIN
   INSERT INTO order_dish(id_dish, id_customer , quantity , previousPrice) values (Inputid_dish, Inputid_customer , Inputquantity, InputpreviousPrice  );
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `ADMgetAllOrders` ()  BEGIN
    SELECT 
    	items.order_id,
    	items.id_customer,
 	client. first_name,
 	client.address ,
 	client.cellphone ,
	items.final_price,
	items.satisfaction,
	items.state_purchase
  FROM 
	  purchase_order as items,
	  customer as client
  WHERE
  	items.id_customer = client.customer_id ;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `ADMgetListPurchases` ()  BEGIN
    SELECT 
    	items.order_dishes_id,
    	di.dish_id,
 	di.dish_name,
 	client.customer_id,
	items.quantity,
	items.previousPrice
  FROM 
	  dish as di,
	  order_dish as items,
	  customer as client
  WHERE
  	items.id_dish = di.dish_id AND items.id_customer = client.customer_id;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `ADM_getAllDishes` ()  BEGIN
  SELECT 
	  d.dish_id,
	  d.dish_name,
	  d.description,
	  d.price,
	  cat.category_name,
	  d.active
  FROM 
	  dish as d,
	  categories as cat
  WHERE
  	d.id_category = cat.category_id;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `ADM_getDiscounts` ()  BEGIN
 SELECT 
	  d.discount_id,
	  di.dish_name,
	  d.name,
	  d.description,
	  d.discount_percent,
	  d.active,
	  d.time_created,
	  d.time_modified
  FROM 
	  discount as d,
	  dish as di
  WHERE
  	d.id_dish = di.dish_id;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `ADM_getStocks` ()  BEGIN
 SELECT 
 	stock.dish_inventory_id,
	di.dish_name,
	di.dish_id,
	stock.quantity,
	stock.time_created,
	stock.time_modified
  FROM 
	  dish_inventory as stock,
	  dish as di
  WHERE
  	stock.id_dish = di.dish_id;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `createNewCustomer` (IN `Inp_email` VARCHAR(100), IN `Inp_customer_password` VARCHAR(100), IN `Inp_first_name` VARCHAR(100), IN `Inp_last_name` VARCHAR(100), IN `Inp_cellphone` INT(9), IN `Inp_address` VARCHAR(200))  BEGIN
    INSERT INTO customer (email, customer_password, first_name, last_name, cellphone, address) VALUES (Inp_email, Inp_customer_password, Inp_first_name, Inp_last_name, Inp_cellphone, Inp_address);   
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `CreateNewDiscount` (IN `id_dish` INT, IN `name` VARCHAR(200), IN `description` TEXT, IN `discount_percent` DECIMAL(5,2))  BEGIN
   INSERT INTO discount (id_dish, name, description, discount_percent) values (id_dish, name, description, discount_percent);
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `createNewDish` (IN `id` INT, IN `name` VARCHAR(150), IN `descrip` VARCHAR(200), IN `addprice` DOUBLE(5,2))  BEGIN
    	CALL InsertNewDish(name , descrip ,  addprice , id );
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `DeleteDiscount` (IN `dish_id` INT)  BEGIN
  DELETE FROM discount WHERE id_dish = dish_id;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `DeleteDish` (IN `id_dish` INT)  BEGIN
   DELETE FROM dish WHERE dish_id = id_dish;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `deleteItemsPurchases` (IN `Inputid_customer` INT, IN `Inputid_dish` INT)  BEGIN
   delete from order_dish where id_dish = Inputid_dish and id_customer = Inputid_customer;   
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `DesactivateDiscount` (IN `dish_id` INT)  BEGIN
  UPDATE discount SET active = 0 WHERE id_dish = dish_id;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `desactivateDish` (IN `id` INT, IN `state_activate` INT)  BEGIN
    UPDATE dish
	SET  active = state_activate 
	WHERE dish_id  = id;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `DishHaveDiscount` (IN `dish_id` INT)  BEGIN
  SELECT discount_percent from discount where id_dish = dish_id;
 END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `generateOrder` (IN `Inputid_customer` INT, IN `FinalPrice` INT, IN `satis` INT)  BEGIN
   INSERT INTO purchase_order(id_customer, final_price, satisfaction ) values (Inputid_customer , FinalPrice  , satis );
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `getAllDishes` ()  BEGIN
    SELECT dish_id, dish_name, description, price, id_category, active FROM dish;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `getCategories` ()  BEGIN
    SELECT * FROM Categories;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `getDishesByCategories` (IN `id_categoryInput` INT)  BEGIN
    SELECT  dish_id, dish_name, description, price, active FROM dish
    WHERE id_category = id_categoryInput;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `getListPurchases` (IN `Inputid_customer` INT)  BEGIN
    SELECT 
    	di.dish_id,
 	di.dish_name,
	items.quantity,
	di.price,
	items.previousPrice
  FROM 
	  dish as di,
	  order_dish as items
  WHERE
  	items.id_dish = di.dish_id AND items.id_customer =  Inputid_customer;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `getOrders` (IN `Inputid_customer` INT)  BEGIN
   select * from purchase_order where id_customer = Inputid_customer;
       END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `getSubCategories` (IN `id_categories` INT)  BEGIN
    SELECT sub_categories_id, name, extra_price FROM sub_categories WHERE  id_categories = id_categories;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `InsertNewDish` (IN `dish_name` VARCHAR(100), IN `description` VARCHAR(250), IN `price` DECIMAL(5,2), IN `id_category` INT)  BEGIN
    INSERT INTO dish (dish_name, description, price, id_category) VALUES (dish_name, description, price, id_category);
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `updateDiscount` (IN `id` INT, IN `newname` VARCHAR(100), IN `newdescription` VARCHAR(200), IN `newpercent` DECIMAL(4,2))  BEGIN
  UPDATE discount SET 
     name = newname,
     description  = newdescription ,
     discount_percent = newpercent 
    WHERE discount_id= id ;
    END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `updateDish` (IN `Inputdish_name` VARCHAR(100), IN `Inputdescription` VARCHAR(250), IN `Inputprice` DECIMAL(5,2), IN `id_category` INT, IN `id` INT)  BEGIN
    UPDATE dish
	SET  dish_name= Inputdish_name,
	description = Inputdescription,
	price = Inputprice,
	id_category = id_category
	WHERE dish_id  = id;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `updateDishStock` (IN `dish_id` INT, IN `stock` INT)  BEGIN
    UPDATE dish_inventory SET quantity = stock WHERE id_dish = dish_id ;
END$$

CREATE DEFINER=`patrick`@`%` PROCEDURE `updateStock` (IN `id` INT, IN `newquantity` INT)  BEGIN
  UPDATE dish_inventory SET quantity = newquantity  WHERE dish_inventory_id = id ;
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Pizzas'),
(2, 'Hamburguesas'),
(3, 'Bebidas'),
(4, 'Helados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `customer_password` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `cellphone` int(9) NOT NULL,
  `address` varchar(200) NOT NULL,
  `time_joined` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `customer`
--

INSERT INTO `customer` (`customer_id`, `email`, `customer_password`, `first_name`, `last_name`, `cellphone`, `address`, `time_joined`, `time_modified`) VALUES
(1, 'lala@gmail.com', '$2b$10$KFQ7T/a/Vjj1fQwPvopQTOSO13tkqik96yUx3nHaPQwFT40H.gage', 'Patrick', 'Sandoval', 971504131, 'Mz. F Lote 11 Asoc. San Andres', '2021-07-02 16:51:54', '2021-07-02 16:51:54'),
(2, 'prueba@gmail.com', '$2b$10$tKEsAWQ8MCu9qUnoa5FcqudbjkMQb52gCyd9WBLVsGhPqr5bTS8Lq', 'Patrick', 'Sandoval', 971504131, 'Mz. F Lote 11 Asoc. San Andres', '2021-07-02 19:47:53', '2021-07-02 19:47:53'),
(25, 'estaci45@gmail.com', '$2b$10$83qffRNoCFYpTRxBUhRWj.vwrF6k92VxG1PLLwD10nGQPXv.Y1UaK', 'Carlos Menito', 'Berta Fernandez', 97845612, 'Av. Los Alisos Calle 8. Mansines', '2021-07-14 21:16:07', '2021-07-14 21:16:07'),
(26, 'carlos15@gmail.com', '$2b$10$oPt1BkO8B/ZYVfk1pDRMxeIR6WipPU0BlymQZVlxJS6mKt.yOsyMy', 'Carlos Manuel', 'Mendoza Uriel', 984568784, 'Av. Los Alisos Calle 8. Mansines', '2021-07-14 21:38:31', '2021-07-14 21:38:31'),
(27, 'fer_45Gal@gmail.com', '$2b$10$/QPiBhGkA2xBnHeBIPnfd.sei6E6XgGkNz/w.d7m.2ol8GaCq9LS.', 'Fernando', 'Gabriel Alvidez', 956874457, 'Calle 5 Urbanizacion Palmares', '2021-07-14 21:39:00', '2021-07-14 21:39:00'),
(28, 'Borja.farias@gmail.com', '$2b$10$qdv7vNaA4pABZShiaVijyOOsKW1kZrSD6WcYq04eelbCsK233tWvW', 'Borja Gavez', 'Izan Media', 945681225, 'Calle 5 Urbanizacion Palmares', '2021-07-14 21:39:23', '2021-07-14 21:39:23'),
(29, 'menito56@gmail.com', '$2b$10$xlncN79E1Vw6YdAOpkWane/SlnATtEKggH5pNQLSTh8YvV2L8VMGq', 'Menito Gabriel', 'Birpal', 91579846, 'Urb. Josefa Moya # 3', '2021-07-14 21:39:49', '2021-07-14 21:39:49'),
(30, 'dvfv858@gmail.com', '$2b$10$WRd.aj1atlHq//X1pjCTcuoYgsKazaAVewFJFgiuFE1./1MqllliS', 'Brenda Ponce', 'Serafin Riera', 946845236, 'Jr. Samantha Mateo # 82587', '2021-07-14 21:40:09', '2021-07-14 21:40:09'),
(31, 'fernan45@gmail.com', '$2b$10$2I0EkfkvRgcrAAshXhlwm.KWANTsMe2NInvkXJdmGRAq1YRe.ey4K', 'Paulo Montesino', 'Luz-Maria Portela', 945699781, 'Jr. Hipólito Ballesteros # 5 Dpto. 007', '2021-07-14 21:40:31', '2021-07-14 21:40:31'),
(32, 'lae8@gmail.com', '$2b$10$FvvNVHZp25ojpeOviRsPp.XG/rO3MWKFpoooOLgoKpo5mv6CNjKZe', 'Ahmed Quintana', 'Mariano Badia', 989745691, 'Urb. Elizabeth Dávila # 99765', '2021-07-14 21:40:52', '2021-07-14 21:40:52'),
(33, 'elvive478@gmail.com', '$2b$10$xe6oUZY8QRVZArE5h4y0rO4zk5mMqjhqET48GajRF78GlnozHtF.q', 'Samir Caparros', 'Mireya Ortega', 987415231, 'Av. Daniela Venegas # 67 Piso 80', '2021-07-14 21:41:16', '2021-07-14 21:41:16'),
(34, 'perito45@gmail.com', '$2b$10$vpTjWBoaBt8BbGJj2RMIMeGuTAkqkx8jh.coS.9ca4VvJYbJt2TNm', 'Soledad Coronado', 'Roxana Vaquero', 982345691, 'Av. Antonia Bustos # 288 Piso 1', '2021-07-14 21:42:14', '2021-07-14 21:42:14'),
(35, 'cizaaa2@gmail.com', '$2b$10$qcvyTNyajkRe8hsCdE2hbO2NGYk9qFlgG0wqtsbzJBySXw.lZ20H2', 'Bienvenida Costas', 'Alberto Gonzalez', 945699781, 'Av. Guadalupe Valdivia # 475 Piso 1', '2021-07-14 21:42:38', '2021-07-14 21:42:38'),
(36, 'veee56@gmail.com', '$2b$10$.l5dyrifrzUOSPCSa4ynVeVz2blXWJpHZxbZ2wswbnRYwFdw6EadS', 'Tomasa Ramon', 'Teodora Menendez', 945699781, 'Jr. Constanza Girón # 04159 Piso 30', '2021-07-14 21:43:02', '2021-07-14 21:43:02'),
(37, 'gatp488@gmail.com', '$2b$10$ZZs8UVIxXQUaglIx/1H10eI6trgy0GujGX0zOVcJVsvU75mZxFgbq', 'Aya Olmos', 'Mauricio Solana', 945699781, 'JCl. José Zapata # 74', '2021-07-14 21:43:17', '2021-07-14 21:43:17'),
(38, 'patt45@gmail.com', '$2b$10$vxEdGmnPpLMfxqN0b3Uh/uDzcJ8Ya7i2GCl9lLJJpWySZ/mDPVCba', 'Erika Ballesteros', 'Amanda Font', 945699781, 'Jr. Gabriela Rojas # 21', '2021-07-14 21:43:34', '2021-07-14 21:43:34'),
(39, 'ferrr7o@gmail.com', '$2b$10$qECdlJrM5kMqONl0oLiMLOawWMjNcVSs..07A8Ihs93S5rrcVxqQC', 'Mihai Matos', 'Monserrat Lobo', 945699781, 'Jr. Alexander Caraballo # 98787 Hab. 936', '2021-07-14 21:44:00', '2021-07-14 21:44:00'),
(40, 'lala45@gmail.com', '$2b$10$9jflvZalXfXaZA9XY8rAkuPGKXz2om9NVHmvnZbwh9X9QHKK7mK3y', 'Álvaro Torregrosa', 'Stefan Vega', 941699781, 'Av. Santiago Velasco # 73296', '2021-07-14 21:44:49', '2021-07-14 21:44:49'),
(41, 'raadip48@gmail.com', '$2b$10$LLMTyt2zNj83mflxrY..Su5dGaSYYl.l7EtR/Y1yfAM10J/NOjTGS', 'Amanda Jover', 'Felix Badia', 912365441, 'Urb. Julián Verdugo # 92072 Dpto. 067', '2021-07-14 21:45:09', '2021-07-14 21:45:09'),
(42, 'balii42@gmail.com', '$2b$10$l5YoFVjimci4w3NE2YZjCuu5voKQo2ftYSG6LcaoagF6Xvq/LoNpm', 'Angel Botella', 'Angustias Lujan', 96874521, 'Jr. Alexander Caraballo # 98787 Hab. 936', '2021-07-14 21:45:41', '2021-07-14 21:45:41'),
(43, 'hacclo45@gmail.com', '$2b$10$DpH/s/3jS0fcbb8xpl7/meoZqlQ7joKHmLyjpntXqeg0OyyF9NibC', 'Juana Palomares', 'Siham Felipe', 913647891, 'Urb. Sergio Cardona # 68634', '2021-07-14 21:45:57', '2021-07-14 21:45:57'),
(44, 'jeeer46@gmail.com', '$2b$10$mZXd68KhQI/0hAUPIbGmqeluDsgbm5prGDB/8Vpwqlt5ICAwC.ute', 'Iman Freire', 'Francisco-Javier Xu', 979456871, 'Av. Valeria Canales # 09988 Piso 8', '2021-07-14 21:46:17', '2021-07-14 21:46:17'),
(45, 'mengues@gmail.com', '$2b$10$LwiVyzF/hvdfdo0iW4kz0u9m/lCsu.w1Z/9OAjXduir9vG94WzMM6', 'Carlos', 'Mengues', 9846215, 'Av. Larco los Alpinares Calle 56', '2021-07-17 12:56:27', '2021-07-17 12:56:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discount`
--

CREATE TABLE `discount` (
  `discount_id` int(11) NOT NULL,
  `id_dish` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount_percent` decimal(4,2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `discount`
--

INSERT INTO `discount` (`discount_id`, `id_dish`, `name`, `description`, `discount_percent`, `active`, `time_created`, `time_modified`) VALUES
(1, 1, 'Felices Fiestas Patrias!', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-10 16:32:54'),
(2, 2, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(3, 3, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas, Aprovecha!', '0.20', 1, '2021-07-02 16:29:29', '2021-07-10 18:25:14'),
(4, 4, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(5, 5, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(6, 6, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(7, 7, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(8, 8, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(9, 9, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(10, 10, ' Felices Fiestas Patrias! ', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-02 16:29:29', '2021-07-02 16:29:29'),
(12, 11, 'Felices Fiestas Patrias!', 'Descuento de 20% en todas nuestras Pizzas', '0.20', 1, '2021-07-10 18:26:24', '2021-07-10 18:26:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dish`
--

CREATE TABLE `dish` (
  `dish_id` int(11) NOT NULL,
  `dish_name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` double(5,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dish`
--

INSERT INTO `dish` (`dish_id`, `dish_name`, `description`, `price`, `active`, `id_category`) VALUES
(1, 'SUPER SUPREMA', 'Una perfecta mezcla de pepperoni americano, carne de res, carne de cerdo, Jamón, salchicha italiana, champiñones, pimientos verdes, cebolla roja, aceitunas verdes y queso mozzarella.', 15.00, 0, 1),
(2, 'MEAT LOVERS', '¡Un festín de carnes! Pepperoni americano, salchicha italiana, carne de res, carne decerdo, rebanadas de Jamón y queso mozzarella.', 14.50, 1, 1),
(3, 'LA CHILI HUT', 'Deliciosa combinación de trozos de pollo, piña, tocino y salsa Chili thai', 12.50, 1, 1),
(4, 'CHICKEN BBQ', 'Exquisita combinación de trozos de pollo, piña, tocino y salsa BBQ.', 13.50, 1, 1),
(5, 'SUPREMA', 'Nuestra famosa combinación de pepperoni americano, carne de res, carne de cerdo, champiñones, pimientos verdes, cebolla roja y queso mozzarella.', 12.90, 1, 1),
(6, 'VEGETARIANA', 'Exquisita combinación de champiñones, aceitunas verdes, pimientos verdes, cebolla roja y queso mozzarella.', 11.90, 1, 1),
(7, 'CONTINENTAL', 'Deliciosa mixtura de Jamón, champiñones, cebolla roja y queso mozzarella.', 12.50, 1, 1),
(8, 'HAWAIANA', '¡El paraiso en la mesa! Se completa con jamón, jugosa piña y queso mozzarella.', 15.00, 1, 1),
(9, 'AMERICANA', '¡La Pizza preferida de los chicos! Jamón y queso mozzarella.', 11.50, 1, 1),
(10, 'PEPPERONI', 'Sabor incomparable de pepperoni americano y queso mozzarella.', 10.90, 1, 1),
(11, 'MOZZARELLA', 'Para los amantes del queso una deliciosa pizza con nuestro queso mozzarella gratinado.', 10.90, 1, 1),
(12, 'Hamburguesa Clásica', 'Deliciosa hamburguesa a la parrilla. ¡La más Clásica de Todas! Entre sus ingredientes encontramos: Mayonesa, Tomate, Lechuga ,Carne.', 11.90, 1, 2),
(13, 'Hamburguesa Cheese', '¡La prefereida de muchos! Deliciosa hamburguesa a la parrilla con queso edam. Entre sus ingredientes encontramos:  Mayonesa, Queso ,Lechuga ,Tomate.', 13.90, 1, 2),
(14, 'Hamburguesa La Churrita', 'La Churrita tiene los siguientes ingredientes: Tocino,  Papas al hilo,  Mayonesa de Chimichurri.', 14.90, 1, 2),
(15, 'Hamburguesa Queso Tocino', 'Una de las mas rankeadas es la Hamburguesa Queso-Tocino:  Doble tocino, Queso Edam, Mayonesa, Lechuga, Tomate.', 15.90, 1, 2),
(16, 'Hamburguesa Royal', '¡La Hamburguesa Royal está deliciosa! Contiene los siguientes ingredientes: Huevo, Queso Edam, Mayonesa, Lechuga, Tomate.', 15.90, 1, 2),
(17, 'Hamburguesa A lo Pobre', 'Te presentamos a la Hamburguesa más peruana de todas: La A lo Pobre. Entre sus ingredientes encontramos: Huevo frito, Plátano frito, Mayonesa, Tomate, Cebolla Blanca.', 15.90, 1, 2),
(18, 'Hamburguesa La Carretillera', 'Deliciosa hamburguesa hecha a la parrilla con pollo deshilachado, salsa tártara y papitas al hilo. ', 15.90, 1, 2),
(19, 'Hamburguesa Parrillera', 'Deliciosa hamburguesa a la parrilla. ¡Super Deliciosa! Entre sus ingredientes encontramos: Mayonesa, Tomate, Lechuga.', 18.90, 1, 2),
(20, 'Hamburguesa Extrema', 'Te presentamos a la más contundente de todas: La Hamburguesa Extrema. Entre sus ingredientes encontramos: Doble carne, Queso Edam, Tocino, Tomate, Lechuga, Mayonesa.', 19.90, 1, 2),
(21, 'Agua San Luis', 'Agua San Luis S/A 625 ml', 2.50, 1, 3),
(22, 'Fanta Sabor Original', 'Fanta Sabor Original 500 ml', 3.90, 1, 3),
(23, 'Sprite Sabor Original', 'Sprite Sabor Original 500 ml', 3.90, 1, 3),
(24, 'Inca Kola Sin Azucar', 'Inca Kola Sin Azucar 500 ml', 3.90, 1, 3),
(25, 'Inca Kola Sabor Original', 'Inca Kola Sabor Original 500 ml', 3.90, 1, 3),
(26, 'Coca Cola Sin Azúcar', 'Coca Cola Sin Azúcar 500 ml', 3.90, 1, 3),
(27, 'Coca Cola Sabor Original', 'Coca Cola Sabor Original 500 ml', 3.90, 1, 3),
(28, 'Helado Peziduri Tricolor', 'Helado Peziduri Donofrio Tricolor Pote 930 ml', 8.50, 1, 4),
(29, 'Helado Peziduri ChocoChips', 'Helado Peziduri Donofrio ChocoChips Pote 930 ml', 8.50, 1, 4),
(30, 'Helado Peziduri Vainilla', 'Helado Peziduri Donofrio Vainilla Pote 930 ml', 8.50, 1, 4),
(31, 'Helado Peziduri Lucuma', 'Helado Peziduri Donofrio Lucuma Pote 930 ml', 8.50, 1, 4);

--
-- Disparadores `dish`
--
DELIMITER $$
CREATE TRIGGER `DeleteStockWhenDeleteDish` BEFORE DELETE ON `dish` FOR EACH ROW DELETE FROM dish_inventory WHERE id_dish= old.dish_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dish_inventory`
--

CREATE TABLE `dish_inventory` (
  `dish_inventory_id` int(11) NOT NULL,
  `id_dish` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dish_inventory`
--

INSERT INTO `dish_inventory` (`dish_inventory_id`, `id_dish`, `quantity`, `time_created`, `time_modified`) VALUES
(38, 1, 15, '2021-07-02 16:50:43', '2021-07-14 22:12:41'),
(39, 2, 9, '2021-07-02 16:50:43', '2021-07-17 13:26:32'),
(40, 3, 9, '2021-07-02 16:50:43', '2021-07-14 22:10:11'),
(41, 4, 19, '2021-07-02 16:50:43', '2021-07-14 21:59:45'),
(42, 5, 13, '2021-07-02 16:50:43', '2021-07-14 22:06:43'),
(43, 6, 12, '2021-07-02 16:50:43', '2021-07-14 22:08:13'),
(44, 7, 16, '2021-07-02 16:50:43', '2021-07-17 13:32:09'),
(45, 8, 17, '2021-07-02 16:50:43', '2021-07-14 22:04:11'),
(46, 9, 12, '2021-07-02 16:50:43', '2021-07-17 13:32:00'),
(47, 10, 6, '2021-07-02 16:50:43', '2021-07-17 12:54:12'),
(48, 11, 15, '2021-07-02 16:50:43', '2021-07-14 22:06:49'),
(49, 12, 13, '2021-07-02 16:50:43', '2021-07-17 13:26:43'),
(50, 13, 10, '2021-07-02 16:50:43', '2021-07-14 22:08:56'),
(51, 14, 14, '2021-07-02 16:50:43', '2021-07-14 22:09:33'),
(52, 15, 7, '2021-07-02 16:50:43', '2021-07-14 22:11:36'),
(53, 16, 20, '2021-07-02 16:50:43', '2021-07-14 22:04:19'),
(54, 17, 9, '2021-07-02 16:50:43', '2021-07-14 22:08:18'),
(55, 18, 13, '2021-07-02 16:50:43', '2021-07-14 22:05:16'),
(56, 19, 17, '2021-07-02 16:50:43', '2021-07-14 22:06:57'),
(57, 20, 15, '2021-07-02 16:50:44', '2021-07-14 22:04:26'),
(58, 21, 21, '2021-07-02 16:50:44', '2021-07-15 16:53:25'),
(59, 22, 22, '2021-07-02 16:50:44', '2021-07-14 22:06:16'),
(60, 23, 49, '2021-07-02 16:50:44', '2021-07-14 22:09:37'),
(61, 24, 29, '2021-07-02 16:50:44', '2021-07-15 16:53:27'),
(62, 25, 40, '2021-07-02 16:50:44', '2021-07-14 22:11:41'),
(63, 26, 35, '2021-07-02 16:50:44', '2021-07-14 22:12:45'),
(64, 27, 25, '2021-07-02 16:50:44', '2021-07-14 22:10:17'),
(65, 28, 4, '2021-07-02 16:50:44', '2021-07-14 22:12:49'),
(66, 29, 11, '2021-07-02 16:50:44', '2021-07-14 22:05:31'),
(67, 30, 11, '2021-07-02 16:50:45', '2021-07-14 22:03:02'),
(68, 31, 9, '2021-07-02 16:50:45', '2021-07-14 22:07:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_dish`
--

CREATE TABLE `order_dish` (
  `order_dishes_id` int(11) NOT NULL,
  `id_dish` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `previousPrice` decimal(10,2) NOT NULL,
  `id_customer` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_dish`
--

INSERT INTO `order_dish` (`order_dishes_id`, `id_dish`, `quantity`, `previousPrice`, `id_customer`) VALUES
(19, 3, 1, '10.00', 1),
(20, 15, 1, '15.90', 1),
(21, 10, 1, '8.72', 1),
(24, 4, 1, '10.80', 27),
(25, 10, 1, '8.72', 27),
(26, 15, 1, '15.90', 27),
(27, 22, 2, '7.80', 27),
(28, 30, 1, '8.50', 27),
(29, 9, 1, '9.20', 28),
(30, 4, 1, '10.80', 28),
(31, 15, 1, '15.90', 28),
(32, 17, 2, '31.80', 28),
(33, 25, 1, '3.90', 28),
(34, 21, 1, '2.50', 28),
(35, 28, 2, '17.00', 28),
(36, 7, 2, '20.00', 29),
(37, 13, 1, '13.90', 29),
(38, 24, 1, '3.90', 29),
(39, 3, 1, '10.00', 30),
(40, 18, 1, '15.90', 30),
(41, 25, 1, '3.90', 30),
(42, 30, 1, '8.50', 30),
(43, 6, 1, '9.52', 31),
(44, 21, 1, '2.50', 31),
(45, 8, 1, '12.00', 32),
(46, 9, 1, '9.20', 32),
(47, 16, 1, '15.90', 32),
(48, 20, 2, '39.80', 32),
(49, 31, 2, '17.00', 32),
(50, 10, 1, '8.72', 33),
(51, 11, 1, '8.72', 33),
(52, 13, 1, '13.90', 33),
(53, 18, 1, '15.90', 33),
(54, 22, 1, '3.90', 33),
(55, 26, 1, '3.90', 33),
(56, 29, 1, '8.50', 33),
(57, 3, 1, '10.00', 34),
(58, 5, 1, '10.32', 34),
(59, 7, 1, '10.00', 34),
(60, 19, 1, '18.90', 34),
(61, 22, 1, '3.90', 34),
(62, 5, 1, '10.32', 35),
(63, 10, 1, '8.72', 35),
(64, 11, 1, '8.72', 35),
(65, 14, 1, '14.90', 35),
(66, 19, 1, '18.90', 35),
(67, 26, 1, '3.90', 35),
(68, 28, 1, '8.50', 35),
(69, 6, 1, '9.52', 36),
(70, 21, 1, '2.50', 36),
(71, 31, 1, '8.50', 36),
(72, 2, 1, '11.60', 37),
(73, 9, 1, '9.20', 37),
(74, 6, 1, '9.52', 37),
(75, 17, 1, '15.90', 37),
(76, 26, 1, '3.90', 37),
(77, 7, 1, '10.00', 38),
(78, 3, 2, '20.00', 38),
(79, 13, 2, '27.80', 38),
(80, 27, 2, '7.80', 38),
(81, 9, 3, '27.60', 39),
(82, 14, 1, '14.90', 39),
(83, 23, 1, '3.90', 39),
(84, 28, 2, '17.00', 39),
(85, 10, 1, '8.72', 40),
(86, 3, 2, '20.00', 40),
(87, 27, 3, '11.70', 40),
(88, 28, 1, '8.50', 40),
(89, 2, 2, '23.20', 41),
(90, 10, 1, '8.72', 41),
(91, 15, 3, '47.70', 41),
(92, 25, 1, '3.90', 41),
(93, 10, 1, '8.72', 42),
(94, 9, 1, '9.20', 42),
(95, 15, 1, '15.90', 42),
(96, 25, 2, '7.80', 42),
(97, 28, 1, '8.50', 42),
(98, 1, 2, '24.00', 43),
(99, 26, 2, '7.80', 43),
(100, 28, 1, '8.50', 43),
(104, 12, 1, '11.90', 45),
(105, 2, 2, '23.20', 44),
(106, 12, 1, '11.90', 44);

--
-- Disparadores `order_dish`
--
DELIMITER $$
CREATE TRIGGER `agreeDishStock` AFTER DELETE ON `order_dish` FOR EACH ROW UPDATE dish_inventory
SET quantity = quantity  + old.quantity  
WHERE id_dish = old.id_dish
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `subtractDishStock` AFTER INSERT ON `order_dish` FOR EACH ROW UPDATE dish_inventory
SET quantity = quantity  - new.quantity  
WHERE id_dish = new.id_dish
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_order`
--

CREATE TABLE `purchase_order` (
  `order_id` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `final_price` decimal(20,2) DEFAULT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `satisfaction` int(5) DEFAULT NULL,
  `state_purchase` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `purchase_order`
--

INSERT INTO `purchase_order` (`order_id`, `id_customer`, `final_price`, `time_created`, `time_modified`, `satisfaction`, `state_purchase`) VALUES
(8, 1, '35.00', '2021-07-13 19:45:51', '2021-07-14 23:20:39', 5, 0),
(9, 27, '52.00', '2021-07-14 21:51:07', '2021-07-15 16:01:54', 5, 0),
(10, 28, '91.00', '2021-07-14 22:00:17', '2021-07-17 13:28:07', 4, 0),
(11, 29, '38.00', '2021-07-14 22:01:08', '2021-07-14 22:01:08', 5, 1),
(12, 30, '38.00', '2021-07-14 22:03:13', '2021-07-14 22:03:13', 3, 1),
(13, 31, '12.00', '2021-07-14 22:03:51', '2021-07-14 22:03:51', 3, 1),
(14, 32, '94.00', '2021-07-14 22:04:40', '2021-07-14 22:04:40', 2, 1),
(15, 33, '64.00', '2021-07-14 22:05:43', '2021-07-15 16:01:33', 1, 0),
(16, 34, '53.00', '2021-07-14 22:06:28', '2021-07-14 22:06:28', 4, 1),
(17, 35, '74.00', '2021-07-14 22:07:12', '2021-07-14 22:07:12', 5, 1),
(18, 36, '21.00', '2021-07-14 22:07:48', '2021-07-14 22:07:48', 5, 1),
(19, 37, '50.00', '2021-07-14 22:08:30', '2021-07-14 22:08:30', 4, 1),
(20, 38, '66.00', '2021-07-14 22:09:09', '2021-07-14 22:09:09', 3, 1),
(21, 39, '63.00', '2021-07-14 22:09:47', '2021-07-14 22:09:47', 4, 1),
(22, 40, '49.00', '2021-07-14 22:10:27', '2021-07-14 22:10:27', 5, 1),
(23, 41, '84.00', '2021-07-14 22:11:12', '2021-07-14 22:11:12', 5, 1),
(24, 42, '50.00', '2021-07-14 22:12:23', '2021-07-14 22:12:23', 5, 1),
(25, 43, '40.00', '2021-07-14 22:12:57', '2021-07-17 13:40:31', 4, 0),
(26, 45, '12.00', '2021-07-17 12:56:56', '2021-07-17 12:56:56', 4, 1),
(27, 44, '35.00', '2021-07-17 13:27:01', '2021-07-17 13:36:29', 4, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indices de la tabla `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discount_id`),
  ADD KEY `id_dish` (`id_dish`);

--
-- Indices de la tabla `dish`
--
ALTER TABLE `dish`
  ADD PRIMARY KEY (`dish_id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `dish_inventory`
--
ALTER TABLE `dish_inventory`
  ADD PRIMARY KEY (`dish_inventory_id`),
  ADD KEY `id_dish` (`id_dish`);

--
-- Indices de la tabla `order_dish`
--
ALTER TABLE `order_dish`
  ADD PRIMARY KEY (`order_dishes_id`),
  ADD KEY `id_dish` (`id_dish`),
  ADD KEY `fk_id_customer` (`id_customer`);

--
-- Indices de la tabla `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `id_customer` (`id_customer`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `discount`
--
ALTER TABLE `discount`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `dish`
--
ALTER TABLE `dish`
  MODIFY `dish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `dish_inventory`
--
ALTER TABLE `dish_inventory`
  MODIFY `dish_inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `order_dish`
--
ALTER TABLE `order_dish`
  MODIFY `order_dishes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de la tabla `purchase_order`
--
ALTER TABLE `purchase_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `discount`
--
ALTER TABLE `discount`
  ADD CONSTRAINT `discount_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dish` (`dish_id`);

--
-- Filtros para la tabla `dish`
--
ALTER TABLE `dish`
  ADD CONSTRAINT `dish_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`category_id`);

--
-- Filtros para la tabla `dish_inventory`
--
ALTER TABLE `dish_inventory`
  ADD CONSTRAINT `dish_inventory_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dish` (`dish_id`);

--
-- Filtros para la tabla `order_dish`
--
ALTER TABLE `order_dish`
  ADD CONSTRAINT `fk_id_customer` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `order_dish_ibfk_1` FOREIGN KEY (`id_dish`) REFERENCES `dish` (`dish_id`);

--
-- Filtros para la tabla `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD CONSTRAINT `purchase_order_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
