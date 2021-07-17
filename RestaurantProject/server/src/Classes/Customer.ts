import DataBase from '../Database'

const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()

export default class Customer{

    constructor(){
    }
    public validation(email:string){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select * from customer where email = '${email}';`,(error: any, result:any) => {
                if (error){
                    reject(error)
                }else{
                    resolve(result)
                } 
            });
        });
    }

    public ADM_getCustomers(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select * from customer;`,(error: any, result:any) => {
                if (error){
                    reject(error)
                }else{
                    resolve(result)
                } 
            });
        });
    }
    public getCustomerData(customer_id:string){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select * from customer where customer_id = '${customer_id}';`,(error: any, result:any) => {
                if (error){
                    reject(error)
                }else{
                    resolve(result)
                } 
            });
        });
    }
    
    public register(email:string, password:any, firstName:String, lastName:String, cellphone:String, address:String){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call createNewCustomer('${email}', '${password}', '${firstName}', '${lastName}', '${cellphone}', '${address}');`,(error: any, result:any) => {
                if (error){
                    reject(error)
                }else{
                    resolve(result)
                } 
            });
        });
    }

}
module.exports = Customer;