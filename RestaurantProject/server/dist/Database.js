"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
class DataBase {
    constructor(host, user, password, database_name) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database_name = database_name;
        this.connection = this.connection;
    }
    establishConnection() {
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database_name
        });
        try {
            this.connection.connect();
            console.log(`Successfully Connection: ${this.database_name} database is running!`);
        }
        catch (error) {
            console.error(`Something was Wrong :C - Error : ${error}`);
        }
    }
    closeConnection() {
        this.connection.end();
    }
    getConnection() {
        return this.connection;
    }
}
exports.default = DataBase;
module.exports = DataBase;
//# sourceMappingURL=Database.js.map