import {Router} from "express";
import {ExpensesRecord} from "../records/expenses.record";
import {ValidationError} from "../utils/errors";

export const ExpensesRouter = Router()
    .get('/:expenseId', async (req, res) => {
        const expense = await ExpensesRecord.getOne(req.params.expenseId);

        res.json( {
            expense
        });
    })

    .get('/', async (req, res)=> {
        const expensesList = await ExpensesRecord.findAll();

        res.json({
            expensesList,
        });
    })
    .get('/search/:category', async (req, res)=> {
        const expensesList = await ExpensesRecord.findByCategory(req.params.category);

        res.json({
            expensesList,
        });

    })
    .get('/search/:startDate/:endDate', async (req, res)=> {
        const expensesList = await ExpensesRecord.findByDate(req.params.startDate, req.params.endDate);

        res.json({
            expensesList,
        });

    })
    .post('/', async (req, res)=> {
        const expense = new ExpensesRecord(req.body);
        await expense.insert();
        res.json(expense);
    })
    .delete('/:id', async(req, res)=> {
        const expense = await ExpensesRecord.getOne(req.params.id)

        if(!expense) {
            throw new ValidationError('This earning does not exist.')
        }

        await expense.delete()

        res.end();
    })
