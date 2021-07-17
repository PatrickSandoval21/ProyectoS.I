const express = require('express');
import Dish from './Classes/Dish'
import Category from './Classes/Category'
import Discount from './Classes/Discount'
import Customer from './Classes/Customer'
import Stocks from './Classes/Stocks'
import Purchases from './Classes/Purchases'


const cors = require('cors')
const app = express();
const bcrypt = require('bcrypt')
const saltRounds = 10
const cookieParser = require("cookie-parser");
const session = require("express-session");


import DataBase from './Database'
const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()

//Instance of Classes
const dishes:any = new Dish();
const category:any = new Category();
const discount:any = new Discount();
const customer:any = new Customer();
const stock:any = new Stocks();
const purchase = new Purchases();

//Settings
/* app.use(cors()); */

app.use(express.json());

app.set('port', process.env.PORT || 3001)

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "user",
    secret: "customer",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: !true }
    /* cookie: {
      expires: 60 * 60 * 24,
    }, */
  })
);

/* app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
); */


//Middlewares


//Routes
app.get('/categories', async(req:any ,res: any) => {
  await category.getCategories().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/addCategory', async(req:any ,res: any) => {
  let name = req.body.name;
  await category.addCategory(name).
  then((result:any) =>{
    res.status(200).send("Categoria Agregada");
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/purchase', async(req:any ,res: any) => {
  let id_dish = req.body.id_dish;
  let id_customer = req.body.id_customer;
  let quantity = req.body.quantity;
  let price = req.body.price;

  await purchase.addPurchase(id_dish,id_customer,quantity,price).
  then((result:any) =>{
    res.status(200).send("result");
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/getSatisfaction', async(req:any ,res: any) => {
  await purchase.getSatisfaction().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/getDishMostBuyed', async(req:any ,res: any) => {
  await purchase.getDishMostBuyed().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});



app.post('/orders', async(req:any ,res: any) => {
  let id_customer = req.body.id_customer
  await purchase.getOrders(id_customer).
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});


app.post('/purchaseList', async(req:any ,res: any) => {
  let id_customer = req.body.idcustomer;
  await purchase.getListPurchases(id_customer).
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/purchaseList', async(req:any ,res: any) => {
  await purchase.AMDgetListPurchases().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/getAllOrders', async(req:any ,res: any) => {
  await purchase.getAllOrders().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/updateOrder', async(req:any ,res: any) => {
  let state = Number(req.body.state);
  let id = Number(req.body.id);
  await purchase.updateOrder(state, id).
  then((result:any) =>{
    res.status(200).send("actualizado");
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});


app.post('/generateOrder', async(req:any ,res: any) => {
  let id_customer = req.body.idCustomer;
  let final_price = req.body.final_price;
  let satisfaction = req.body.satisfaction;
  await purchase.generateOrder(id_customer, final_price, satisfaction).
  then((result:any) =>{
    res.status(200).send(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/deleteItems', async(req:any ,res: any) => {
  let id_customer = req.body.idCustomer;
  let id_dish = req.body.id_dish;

  await purchase.deleteItems(id_customer, id_dish).
  then((result:any) =>{
    res.status(200).send(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});


app.get('/stocks', async(req:any ,res: any) => {
  await stock.getStocks().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/addStock', async(req:any ,res: any) => {
  const id = req.body.id;
  const quantity = req.body .quantity;

  await stock.updateStock(id,quantity).
  then((result:any) =>{
    res.status(200).send("registro modificado");
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/discounts', async(req:any ,res: any) => {
  await discount.getDishDiscounts().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/discounts', async(req:any ,res: any) => {
  const id = req.body.id;
  const description = req.body.description;
  const percent = req.body.percent;
  const name_discount = req.body.name_discount;

  await discount.updateDiscount(id, name_discount, description, percent).
  then((result:any) =>{
    res.status(200).send("Registro Modificado");
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/addDiscount', async(req:any ,res: any) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const percent = req.body.percent;

  await discount.addNewDiscount(id, name, description, percent).
  then((result:any) =>{
    res.status(200).send("Registro Agregado");
  })
  .catch((error:any) => {
    res.status(500).send("error al crear");
  })
});

app.get('/adm_discounts', async(req:any ,res: any) => {
  await discount.ADM_getDishDiscounts().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/dishes', async(req:any ,res: any) => {
  await dishes.getAllDishes().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});


app.post('/addDishes', async(req:any ,res: any) => {

  const category = req.body.id_category;
  const dish_name = req.body.dish_name;
  const description = req.body.description;
  const price = req.body.price;

  await dishes.addDish(category,dish_name,description,price).
  then((result:any) =>{
    res.status(200).send("Plato Agregado")
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post('/countDish', async(req:any ,res: any) => {
  let category = req.body.id;
  await dishes.countDish(category).
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});


app.get('/customer', async(req:any ,res: any) => {
  await customer.ADM_getCustomers().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/ganancias', async(req:any ,res: any) => {
  await purchase.ganacias().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.get('/pedidos', async(req:any ,res: any) => {
  await purchase.pedidos().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});




app.get('/admDishes', async(req:any ,res: any) => {
  await dishes.ADM_getAllDishes().
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post("/dish", (req:any, res:any) => {
  const id = req.body.id;
  const dish_name = req.body.dish_name;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category_id;

   dishes.updateDish(dish_name, description, price, category, id)
  .then((result:any) =>{ res.send("Actualizacion Exitosa") })
  .catch((err:any) => res.status(400))
});

app.post("/desactivate_dish", (req:any, res:any) => {
  const id = req.body.id;
  const state = req.body.state_desactivate;

   dishes.desactivateDish(id, state)
  .then((result:any) =>{ res.send(true) })
  .catch((err:any) => res.status(400))
});

app.post("/delete/dish", (req:any, res:any) => {
  const id = req.body.id;

   dishes.deleteDish(id)
  .then((result:any) =>{ res.send(true) })
  .catch((err:any) => res.status(400))
});

app.post("/delete/discount", (req:any, res:any) => {
  const id = req.body.id;

  discount.deleteDiscount(id)
  .then((result:any) =>{ res.send(true) })
  .catch((err:any) => res.status(400))
});

app.get('/dishes/:category', async (req: any, res:any) => {
  const category_id:String = req.params.category;

  await dishes.getDishesByCategories(category_id)
  .then( (result:any) => {
    if (result.length !== 0) {
      res.status(200).json(result)
    }else{
      res.status(404).end()
    }
  })
  .catch((error:any) => res.status(400).end(error))
});

app.post('/customer/:id', async(req:any ,res: any) => {
  let customer_id = req.params.id;
  await customer.getCustomerData(customer_id).
  then((result:any) =>{
    res.status(200).json(result);
  })
  .catch((error:any) => {
    res.status(500).end(error);
  })
});

app.post("/register", (req:any, res:any) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const cellphone = req.body.cellphone;
  const address = req.body.address;

   customer.validation(email)
  .then((result:any) =>{
    if (result[0]) {
      res.send({message:"Este email ya se encuentra en uso"})
    }else{
      bcrypt.hash(password, saltRounds, (err:any, hash:any) => {
        if (err) {
          console.log(err);
        }
        customer.register(email,hash,firstName,lastName,cellphone,address)
        .then( (result:any) => { 
          res.status(200).send({message : "Registro Exitoso! Inicie Sesion"}).end()
        })
        .catch((error:any) => {
          console.log(error)
          res.status(400).end()
        })
      });
    }
  }).catch((err:any) => res.status(400))
});

app.post("/logout", (req:any, res:any) => {
  req.session.user = null;
  req.session.sesion = false;

  res.send("logout exitoso")
});

app.post("/login", (req:any, res:any) => {
  const email = req.body.email;
  const password = req.body.password;

  const connection =  DataConnection.getConnection()
  connection.query(
    "SELECT * FROM customer WHERE email = ?;",
    email,
    (err:any, result:any) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].customer_password, (error:any, response:any) => {
          if (response) {
            //result es el json con los datos de la db
            req.session.user = result[0];
            req.session.sesion = true;

            res.send("Inicio de Sesion Exitoso")
            /* res.send({data:req.session.user, loggedIn: req.session.sesion}); */
            /* res.send(result); */
          } else {
            req.session.user = null;
            req.session.sesion = false;

            res.send({message: "Email/Contraseña Incorrectos!", loggedIn: req.session.sesion});
          }
        });
      } else {
        req.session.user = null;
        req.session.sesion = false;

        res.send({message: "Usuario no existente", loggedIn: req.session.sesion});
      }
    }
  );
});

app.get("/login", (req:any, res:any) => {
  req.session.user ? res.json({loggedIn: true, data: req.session.user }) : res.json({loggedIn: false});
});
//StaticFiles

//Starting the Server
app.listen(app.get('port'), () => {
    console.log(`The server is listening the port http://localhost:${app.get('port')}.`)
  })
  