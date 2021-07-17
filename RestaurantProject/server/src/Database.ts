const mysql = require('mysql');
export default class DataBase {
     private host: string;
     private user: string;
     private password: string;
     private database_name: string;
     public connection:any;

    constructor(host:string, user:string, password:string, database_name: string) {
        this.host = host
        this.user = user
        this.password = password
        this.database_name = database_name
        this.connection = this.connection;
    }

    public establishConnection() {
        this.connection = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            password : this.password,
            database : this.database_name
            });
        try {
            this.connection.connect();
            console.log(`Successfully Connection: ${this.database_name} database is running!`)
        } catch (error) {
            console.error(`Something was Wrong :C - Error : ${error}`)
        }
    }

    public closeConnection() {
        this.connection.end();
    }

    public getConnection() {
       return this.connection
    }
}
module.exports = DataBase;