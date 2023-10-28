import {Router} from "express";
import {ExpensesRecord} from "../records/expenses.record";

export const ExpensesRouter = Router()

    .get('/search', async (req, res)=> {
        const expenses = await ExpensesRecord.findAll();

        res.json(expenses);
    })
    .get('/search/:category', async (req, res)=> {
        const expenses = await ExpensesRecord.findByCategory(req.params.category);

        res.json(expenses);

    })
    .get('/search/:startDate/:endDate', async (req, res)=> {
        const expenses = await ExpensesRecord.findByDate(req.params.startDate, req.params.endDate);

        res.json(expenses);

    })
    .post('/', async (req, res)=> {
        const expense = new ExpensesRecord(req.body);
        await expense.insert();
        res.json(expense);
    })
