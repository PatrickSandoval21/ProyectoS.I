import DataBase from '../Database'

const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()

export default class Category{
    
    constructor(){
    }

    public getCategories(){ 
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call getCategories;`,(error: any, result:any) => {
                    if (error){
                        console.log(error)
                        reject(error)
                    }else{
                        resolve(result[0])
                    } 
            });
        });
    }

    public addCategory(name:String){ 
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call addCategory('${name}');`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }
}
module.exports = Category;