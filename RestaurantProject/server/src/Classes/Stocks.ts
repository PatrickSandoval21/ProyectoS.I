import DataBase from '../Database'

const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()

export default class Stock{

    constructor(){

    }

    public getStocks(){
       return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection()
            connection.query("call ADM_getStocks();",(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result[0])
                    } 
                });
        });
    }

    public updateStock(id:Number, quantity:Number){

        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call updateStock(${id},${quantity});`,(error: any, result:any) => {
                     if (error){
                         reject(error)
                     }else{
                         resolve(result)
                     } 
                 });
         });
     }

   
}
module.exports = Stock;