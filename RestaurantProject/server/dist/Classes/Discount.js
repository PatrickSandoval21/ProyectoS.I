"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
const DataConnection = new Database_1.default('localhost', 'patrick', 'patrick', 'restaurant');
DataConnection.establishConnection();
class Discount {
    constructor() {
    }
    getDishDiscounts() {
        return new Promise((resolve, reject) => {
            const connection = DataConnection.getConnection();
            connection.query(`select * from discount;`, (error, result) => {
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
exports.default = Discount;
module.exports = Discount;
//# sourceMappingURL=Discount.js.map