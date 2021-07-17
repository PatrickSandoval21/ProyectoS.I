"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
const DataConnection = new Database_1.default('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection();
class Dish {
    constructor() {
        this.dishesResults = {};
    }
    getAllDishes() {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query("call getAllDishes();", (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
    getDishesByCategories(id_category) {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query(`call getDishesByCategories(${id_category});`, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
    getSubCategories(id_category) {
        const connection = DataConnection.getConnection();
        connection.query(`call getSubCategories(${id_category});`, (error, results) => {
            if (error)
                throw Error;
            const jsonResults = JSON.parse(JSON.stringify(results));
            return jsonResults;
        });
        DataConnection.closeConnection();
    }
}
exports.default = Dish;
module.exports = Dish;
//# sourceMappingURL=Dish.js.map