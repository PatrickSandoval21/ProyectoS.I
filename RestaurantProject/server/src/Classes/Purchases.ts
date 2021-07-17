import DataBase from '../Database'

const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()

export default class Purchases{

    constructor(){

    }

    public addPurchase(id_dish:Number, id_customer:Number, quantity:Number, price:Number){
       return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection()
            connection.query(`call addPurchase(${id_dish}, ${id_customer}, ${quantity}, ${price});`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
                });
        });
    }

    public getListPurchases(id_customer:Number){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call getListPurchases(${id_customer});`,(error: any, result:any) => {
                     if (error){
                        console.log(error)
                         reject(error)
                     }else{
                         resolve(result[0])
                     } 
                 });
         });
     }

     public AMDgetListPurchases(){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call ADMgetListPurchases();`,(error: any, result:any) => {
                     if (error){
                        console.log(error)
                         reject(error)
                     }else{
                         resolve(result[0])
                     } 
                 });
         });
     }

     public generateOrder(id_customer:Number, final_price:Number, satisfaction:Number){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call generateOrder(${id_customer},${final_price}, ${satisfaction});`,(error: any, result:any) => {
                     if (error){
                        console.log(error)
                         reject(error)
                     }else{
                         resolve(result)
                     } 
                 });
         });
     }

     public deleteItems(id_customer:Number, id_dish:Number){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call deleteItemsPurchases(${id_customer},${id_dish});`,(error: any, result:any) => {
                     if (error){
                        console.log(error)
                         reject(error)
                     }else{
                         resolve(result)
                     } 
                 });
         });
     }
     public getOrders(id_customer:Number){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call getOrders(${id_customer});`,(error: any, result:any) => {
                     if (error){
                        console.log(error)
                         reject(error)
                     }else{
                         resolve(result[0])
                     } 
                 });
         });
     }

     public getAllOrders(){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call ADMgetAllOrders();`,(error: any, result:any) => {
                     if (error){
                        console.log(error)
                         reject(error)
                     }else{
                         resolve(result[0])
                     } 
                 });
         });
     }

     public updateOrder(state:Number, id:Number){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`update purchase_order set state_purchase = ${state} where order_id = ${id};`,(error: any, result:any) => {
                    if (error){
                        console.log(error)
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public getSatisfaction(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select satisfaction from purchase_order;`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public getDishMostBuyed(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`   SELECT 
            d.id_dish,
            di.dish_name
        FROM 
            order_dish as d,
            dish as di
        WHERE
            d.id_dish = di.dish_id;`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public ganacias(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select sum(final_price) as ganacias from purchase_order;`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public pedidos(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select count(*) as pedidos from purchase_order where state_purchase = 1;`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }
 
     
    
   
}
module.exports = Purchases;