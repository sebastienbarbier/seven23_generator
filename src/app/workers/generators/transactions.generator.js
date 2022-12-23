import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const SALARY_CATEGORY_ID = 12;
const RATES_FROM_EURO = {
  1: 1,
  2: 0.99,
  4: 36.97,
  7: 1.06,
  8: 141
};

/**
 * Return a list of transaction objects
 */
function generateTransactions(dateBegin, dateEnd, categories, account) {
  
  const transactions = [];

  // Update dateEnd to the end of month
  dateEnd = moment.utc(dateEnd).endOf("month");

  /**
   * EXPENSES
   */

  // We need exchange rate to create kind of rational price.

  const day = moment.utc(dateBegin).startOf("month"); // Salary is on the 25th

  // For each day, we create x random transactions in a random currency
  while (day < dateEnd) {
    const howManyTransactions = Math.floor(Math.random() * 4.0);

    const min = -8000;
    const max = 0;

    // we generate `howManyTransactions` transactions betwwen min and max euros
    for (let transaction = 0; transaction < howManyTransactions; transaction++) {

      const currency_id = account.currencies[Math.floor(Math.random() * account.currencies.length)]
      const amount_in_euro = Math.floor(Math.random() * (max - min + 1) + min) / 100;
      const category_id = categories[Math.floor(Math.random() * categories.length)].id;
      const date = day.toDate()

      transactions.push({
        id: uuidv4(),
        name: `Transaction ${transaction}`,
        date: date,
        local_amount: amount_in_euro * RATES_FROM_EURO[currency_id], // Apply exchange rate to be local
        local_currency: currency_id,
        category: category_id
      });
    }

    day.add(1, 'day');
  }

  /**
   * MONTHLY SALARY BASED ON EXPENSES
   */
  const total_expenses = transactions.reduce(
    (accumulator, transaction) => accumulator + transaction.local_amount / RATES_FROM_EURO[transaction.local_currency], 
    0);
  const numberOfMonths = Math.abs(
     moment.utc(dateBegin).diff(moment.utc(dateEnd), "months")
  );
  const monthly_salary = Math.abs(total_expenses / numberOfMonths);

  /**
   * INCOME
   */
  const month = moment.utc(dateBegin).startOf("month").date(25); // Salary is on the 25th

  while (month < dateEnd) {
    transactions.push({
      id: uuidv4(),
      name: `💰 Salary`,
      date: month.toDate(),
      local_amount: monthly_salary * 1.08, // 1.08x to have 8% more income than spending
      local_currency: 1, // Salary in euro
      category: SALARY_CATEGORY_ID // Hard-coded category for incomes
    });
    month.add(1, 'month');
  }

  return transactions;
}

export default generateTransactions;