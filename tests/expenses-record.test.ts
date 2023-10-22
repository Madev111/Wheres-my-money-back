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