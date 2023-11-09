import {ExpensesEntity} from "../types";
import {ExpensesRecord} from "../records/expenses.record";
import {pool} from "../utils/db";


afterAll(async ()=> {
    await pool.end();
})

const defaultObj: ExpensesEntity = {
    name: 'test',
    date: new Date(),
    category: "testowa",
    price: 300
}

test('Expense Record returns correct data from database', async ()=> {

    const expense = await ExpensesRecord.getOne('75b23c80-7386-11ee-a701-24fe9a012734');

    expect(expense.id).toBe('75b23c80-7386-11ee-a701-24fe9a012734');
    expect(expense.name).toBeDefined();
    expect(expense.category).toBe('pets');
})

test('Can build ExpenseRecord', ()=> {

    const expense = new ExpensesRecord(defaultObj);

    expect(expense.name).toBe('test');
    expect(expense.date).toBeDefined();
    expect(expense.price).toBe(300);
});

test('Validates invalid price', ()=> {

    expect(()=> new ExpensesRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('The expense must have a price from 0 to 999999.')
});

test('Insert new expense data returns uuid', async()=> {

    const exp = new ExpensesRecord(defaultObj);

    await exp.insert();

    expect(exp.id).toBeDefined();
    expect(typeof exp.id).toBe('string');
});

test('ExpensesRecord.findAll returns array of found entries.', async()=> {

    const expenses = await ExpensesRecord.findAll();

    expect(expenses).not.toEqual([]);
    expect(expenses[0].name).toBeDefined();

});

test('ExpensesRecord.findByCategory returns only correct data', async ()=> {
    const expensesByCategory = await ExpensesRecord.findByCategory('pets');

    expect(expensesByCategory).not.toEqual([]);
    expect(expensesByCategory[0].price).toBeDefined();
});

test('ExpensesRecord.findByDate returns expenses between selected dates', async () => {
    const expensesByDate = await ExpensesRecord.findByDate('2023-10-25', '2023-10-26');

    expect(expensesByDate).not.toEqual([]);


})