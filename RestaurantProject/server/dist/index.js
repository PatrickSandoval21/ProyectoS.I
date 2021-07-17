"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const Dish_1 = __importDefault(require("./Classes/Dish"));
const Category_1 = __importDefault(require("./Classes/Category"));
const Discount_1 = __importDefault(require("./Classes/Discount"));
const Customer_1 = __importDefault(require("./Classes/Customer"));
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Database_1 = __importDefault(require("./Database"));
const DataConnection = new Database_1.default('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection();
//Instance of Classes
const dishes = new Dish_1.default();
const category = new Category_1.default();
const discount = new Discount_1.default();
const customer = new Customer_1.default();
//Settings
/* app.use(cors()); */
app.set('port', process.env.PORT || 3001);
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    key: "user",
    secret: "customer",
    resave: true,
    saveUninitialized: true,
    /* cookie: {
      expires: 60 * 60 * 24,
    }, */
}));
//Middlewares
app.use(express.json());
/* app.use(cors()) */
//Routes
app.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield category.getCategories().
        then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(500).end(error);
    });
}));
app.get('/discounts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield discount.getDishDiscounts().
        then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(500).end(error);
    });
}));
app.get('/dishes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield dishes.getAllDishes().
        then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(500).end(error);
    });
}));
app.get('/dishes/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category_id = req.params.category;
    yield dishes.getDishesByCategories(category_id)
        .then((result) => {
        if (result.length !== 0) {
            res.status(200).json(result);
        }
        else {
            res.status(404).end();
        }
    })
        .catch((error) => res.status(400).end(error));
}));
app.post('/customer/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer_id = req.params.id;
    yield customer.getCustomerData(customer_id).
        then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(500).end(error);
    });
}));
app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const cellphone = req.body.cellphone;
    const address = req.body.address;
    customer.validation(email)
        .then((result) => {
        if (result[0]) {
            res.send({ message: "Este email ya se encuentra en uso" });
        }
        else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                customer.register(email, hash, firstName, lastName, cellphone, address)
                    .then((result) => {
                    res.status(200).send({ message: "Registro Exitoso! Inicie Sesion" }).end();
                })
                    .catch((error) => {
                    console.log(error);
                    res.status(400).end();
                });
            });
        }
    }).catch((err) => res.status(400));
});
app.post("/logout", (req, res) => {
    req.session.user = null;
    req.session.sesion = false;
    req.session.save();
    res.send("logout exitoso");
});
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const connection = DataConnection.getConnection();
    connection.query("SELECT * FROM customer WHERE email = ?;", email, (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].customer_password, (error, response) => {
                if (response) {
                    //result es el json con los datos de la db
                    req.session.user = result;
                    req.session.sesion = true;
                    req.session.save();
                    res.send("Inicio de Sesion Exitoso");
                    /* res.send({data:req.session.user, loggedIn: req.session.sesion}); */
                    /* res.send(result); */
                }
                else {
                    req.session.user = null;
                    req.session.sesion = false;
                    req.session.save();
                    res.send({ message: "Email/Contraseña Incorrectos!", loggedIn: req.session.sesion });
                }
            });
        }
        else {
            req.session.user = null;
            req.session.sesion = false;
            req.session.save();
            res.send({ message: "Usuario no existente", loggedIn: req.session.sesion });
        }
    });
});
app.get("/login", (req, res) => {
    if (req.session.sesion) {
        res.send({ user: req.session.user, loggedIn: true });
    }
    else {
        res.send({ loggedIn: false });
    }
});
//StaticFiles
//Starting the Server
app.listen(app.get('port'), () => {
    console.log(`The server is listening the port http://localhost:${app.get('port')}.`);
});
//# sourceMappingURL=index.js.map