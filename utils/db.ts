import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'wheres_my_money',
    namedPlaceholders: true,
    decimalNumbers: true,
})