"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
const DataConnection = new Database_1.default('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection();
class Category {
    constructor() {
    }
    getCategories() {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query(`call getCategories;`, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
}
exports.default = Category;
module.exports = Category;
//# sourceMappingURL=Category.js.map