"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
const DataConnection = new Database_1.default('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection();
class Customer {
    constructor() {
    }
    validation(email) {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query(`select * from customer where email = '${email}';`, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    getCustomerData(customer_id) {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query(`select * from customer where customer_id = '${customer_id}';`, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    register(email, password, firstName, lastName, cellphone, address) {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query(`call createNewCustomer('${email}', '${password}', '${firstName}', '${lastName}', '${cellphone}', '${address}');`, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.default = Customer;
module.exports = Customer;
//# sourceMappingURL=Customer.js.map