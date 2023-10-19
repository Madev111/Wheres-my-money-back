import {ExpensesEntity} from "../types";
import {ExpensesRecord} from "../records/expenses.record";


const defaultObj = {
    id: '123',
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