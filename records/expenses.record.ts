import {ExpensesEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid"
import {pool} from "../utils/db";


export class ExpensesRecord implements ExpensesEntity {
    id: string;
    name: string;
    date: Date;
    category: string;
    price: number;
    constructor(obj: ExpensesEntity) {
        if(!obj.name || obj.name.length > 99) {
            throw new ValidationError('The expense must have a name with 99 characters max.')
        }
        if(!obj.date) {
            throw new ValidationError('The expense must have a date of spend.')
        }
        if(!obj.category || obj.category.length > 99) {
            throw new ValidationError('The expense must have a category with 99 characters max.')
        }
        if(obj.price < 0 || obj.price > 999999) {
            throw new ValidationError('The expense must have a price from 0 to 999999.')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.date = obj.date;
        this.category = obj.category;
        this.price = obj.price;
    };

    async insert() {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert data with the same id twice.')
        }

        await pool.execute("INSERT INTO `users_expenses`(`id`, `name`, `date`, `category`, `price`) VALUES(:id, :name, :date, :category, :price)", this)
    }
}