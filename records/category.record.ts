import {CategoryEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";

type CategoryRecordResults = [CategoryEntity[], FieldPacket[]]
export class CategoryRecord implements CategoryEntity {
    id: string;
    name: string;
    constructor(obj: CategoryEntity) {
        if(!obj.id) {
            throw new ValidationError('Category must have id.')
        }
        if(!obj.name || obj.name.length > 99) {
            throw new ValidationError('Category must have a name with 99 characters max.')
        }
        this.id = obj.id;
        this.name = obj.name;
    }

    static async getOne(id: string): Promise<CategoryRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `categories` WHERE `id` = :id", {
            id,
        }) as CategoryRecordResults;

        return results.length === 0 ? null : new CategoryRecord(results[0]);
    }

    static async findAll(): Promise<CategoryEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `categories`") as CategoryRecordResults;

        // return results.map(result => {
        //     const {name} = result;
        //     return name
        // })
        return results.map(obj => new CategoryRecord(obj));
    }

}