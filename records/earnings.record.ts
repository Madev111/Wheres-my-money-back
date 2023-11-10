import {EarningsEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type EarningsRecordResults = [EarningsEntity[], FieldPacket[]];
export class EarningsRecord implements EarningsEntity {
    id?: string;
    value: number;
    date: Date;
    source: string;
    constructor(obj: EarningsEntity) {

        if(obj.value <= 0) {
            throw new ValidationError('You cannot earn below or equally 0.')
        }
        if(!obj.date) {
            throw new ValidationError('You should indicate date of earning.')
        }
        if(!obj.source || obj.source.length > 99) {
            throw new ValidationError('You should enter source of earnings with max 99 characters.')
        }
        this.id = obj.id;
        this.value = obj.value;
        this.date = obj.date;
        this.source = obj.source;
    }

    static async getOne(id: string) : Promise<EarningsRecord | null> {

        const [results] = await pool.execute("SELECT * FROM `users_earnings` WHERE `id` = :id", {
            id,
        }) as EarningsRecordResults;

        return results.length === 0 ? null : new EarningsRecord(results[0]);

    }

    static async findAll(): Promise<EarningsEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `users_earnings` ORDER BY `date` DESC") as EarningsRecordResults;

        return results.map(result => {
            const {
                id,value, date, source
            } = result;
            return {
                id, value, date, source
            }
        })
    }

    static async findByDate(startDate: string, endDate: string): Promise<EarningsEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `users_earnings` WHERE `date` >= :startDate AND `date` <= :endDate ORDER BY `date` DESC", {
            startDate,
            endDate,
        }) as EarningsRecordResults;

        if(!startDate || !endDate) {
            throw new ValidationError('You must select both dates.')
        }

        return results.map(result => {
            const {
                id, value, date, source
            } = result;
            return {
                id, value, date, source
            };
        });
    }

    async insert() :Promise<string> {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert data with the same id twice.')
        }

        await pool.execute("INSERT INTO `users_earnings`(`id`,`value`, `date`, `source`) VALUES(:id, :value, :date, :source)", this);

        return this.id
    }
    async delete(): Promise<void> {

        await pool.execute("DELETE FROM `users_earnings` WHERE `id` = :id", {
            id: this.id,
        })
    }

}