import DataBase from '../Database'

const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()
export default class Discount{
    
    constructor(){
    }

    public getDishDiscounts(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select * from discount;`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public ADM_getDishDiscounts(){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call ADM_getDiscounts();`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result[0])
                    } 
            });
        });
    }

    public deleteDiscount(id:Number){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call DeleteDiscount(${id});`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public updateDiscount(id:Number, newname:String, description:String, percent:Number){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call updateDiscount(${id}, '${newname}', '${description}', ${percent});`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public addNewDiscount(id:Number, newname:String, description:String, percent:Number){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call CreateNewDiscount(${id}, '${newname}', '${description}', ${percent});`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    
}
module.exports = Discount;