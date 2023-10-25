import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import rateLimit from "express-rate-limit";
import {ExpensesRecord} from "./records/expenses.record";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

app.get('/', async (req, res)=> {
    const expenses = await ExpensesRecord.getOne('75b23c80-7386-11ee-a701-24fe9a012734')

    res.send(expenses);
})

app.listen(3001, '0.0.0.0', ()=> {
    console.log('Listening on http://localhost:3001')
})