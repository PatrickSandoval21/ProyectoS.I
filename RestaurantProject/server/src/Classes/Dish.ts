import DataBase from '../Database'

const DataConnection = new DataBase('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection()

export default class Dish{

    public dishesResults:any;
    
    constructor(){
        this.dishesResults = {};
    }

    public getAllDishes(){
       return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection()
            connection.query("call getAllDishes();",(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result[0])
                    } 
                });
        });
    }

    public updateDish(name:String, description:String, price:String, id_category:Number, id_dish:Number ){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call updateDish('${name}', '${description}', '${price}', ${id_category}, ${id_dish});`,(error: any, result:any) => {
                     if (error){
                         console.log(error)
                         reject(error)
                     }else{
                         resolve(result)
                     } 
                 });
         });
     }

     public desactivateDish(id_dish:Number, state_desactivate:Number ){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call desactivateDish(${id_dish},${state_desactivate});`,(error: any, result:any) => {
                     if (error){
                         console.log(error)
                         reject(error)
                     }else{
                         resolve(result)
                     } 
                 });
         });
     }

     public deleteDish(id_dish:Number){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query(`call DeleteDish(${id_dish});`,(error: any, result:any) => {
                     if (error){
                         console.log(error)
                         reject(error)
                     }else{
                         resolve(result)
                     } 
                 });
         });
     }

    public ADM_getAllDishes(){
        return new Promise((resolve, reject) => {
             const connection = DataConnection.getConnection()
             connection.query("call ADM_getAllDishes();",(error: any, result:any) => {
                     if (error){
                         reject(error)
                     }else{
                         resolve(result[0])
                     } 
                 });
         });
     }

    

    public getDishesByCategories(id_category:String){
       return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call getDishesByCategories(${id_category});`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result[0])
                    } 
            });
        });
    }

    public getSubCategories(id_category: Number){
        const connection = DataConnection.getConnection()
        connection.query(`call getSubCategories(${id_category});`, (error:any , results:any) =>{
            if (error) throw Error
            const jsonResults = JSON.parse(JSON.stringify(results))
            return jsonResults;
        })  
        DataConnection.closeConnection() 
    }

    public addDish(id_category: Number, name:String, description:String, price:Number){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`call createNewDish(${id_category}, '${name}','${description}',${price});`,(error: any, result:any) => {
                    if (error){
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

    public countDish(id_category: Number){
        return new Promise((resolve, reject) => {
            const connection =  DataConnection.getConnection()
            connection.query(`select count(*) as freq from dish where id_category = ${id_category};`,(error: any, result:any) => {
                    if (error){
                        console.log(error)
                        reject(error)
                    }else{
                        resolve(result)
                    } 
            });
        });
    }

   
}
module.exports = Dish;