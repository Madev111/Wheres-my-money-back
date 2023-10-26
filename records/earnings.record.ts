import {EarningsEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type EarningsRecordResults = [EarningsEntity[], FieldPacket[]];
export class EarningsRecord implements EarningsEntity {
    id?: number;
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
        this.value = obj.value;
        this.date = obj.date;
        this.source = obj.source;
    }

    static async findAll(): Promise<EarningsEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `users_earnings`") as EarningsRecordResults;

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
        const [results] = await pool.execute("SELECT * FROM `users_earnings` WHERE `date` >= :startDate AND `date` <= :endDate ", {
            startDate,
            endDate,
        }) as EarningsRecordResults;

        return results.map(result => {
            const {
                id, value, date, source
            } = result;
            return {
                id, value, date, source
            };
        });
    }

    async insert() {

        await pool.execute("INSERT INTO `users_earnings`(`value`, `date`, `source`) VALUES(:value, :date, :source)", this);
    }

}