import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import rateLimit from "express-rate-limit";
import {handleError} from "./utils/errors";
import {ExpensesRouter} from "./routers/expenses.router";
import {CategoryRouter} from "./routers/category.router";
import {EarningsRouter} from "./routers/earnings.router";



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

app.use('/expenses', ExpensesRouter);
app.use('/categories', CategoryRouter);
app.use('/earnings', EarningsRouter);

app.use(handleError);



app.listen(3001, '0.0.0.0', ()=> {
    console.log('Listening on http://localhost:3001')
})