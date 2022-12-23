import moment from "moment";
import { v4 as uuidv4 } from "uuid";

/**
 * Return a list of transaction objects
 */
function generateTransactions(dateBegin, dateEnd, categories, account) {
  const transactions = [];

  const numberOfDays = Math.abs(
    moment
    .utc(dateBegin)
    .startOf("month")
    .diff(moment.utc(dateEnd).endOf("month"), "days")
    );

  /**
   * EXPENSES
   */
  for (let day = 0; day < numberOfDays; day++) {
    const howManyTransactions = Math.floor(Math.random() * 4.0);

    const min = -8000,
    max = 0;

    for (
      let transaction = 0;
      transaction < howManyTransactions;
      transaction++
      ) {
      transactions.push({
        id: uuidv4(),
        name: `Transaction ${day} ${transaction}`,
        date: moment
        .utc(dateBegin)
        .startOf("month")
        .add(day, "days")
        .toDate(),
        local_amount: Math.floor(Math.random() * (max - min + 1) + min) / 100,
        local_currency:
        account.currencies[
          Math.floor(Math.random() * account.currencies.length)
          ],
        category: categories[Math.floor(Math.random() * categories.length)].id
      });
    }
  }

  let total_expenses = 0;
  transactions.forEach(
    transaction => (total_expenses = total_expenses + transaction.local_amount)
    );

  /**
   * INCOME
   */
  const numberOfMonths = Math.abs(
    moment.utc(dateBegin).diff(moment.utc(dateEnd), "months")
    );
  for (let month = 0; month <= numberOfMonths; month++) {
          // Between zero and ten
    const ratioToApply = Math.random() / 10;
    const t = {
      id: uuidv4(),
      name: `Transaction ${month}`,
      date: moment
      .utc(dateBegin)
      .startOf("month")
      .add(month, "months")
      .toDate(),
      local_amount:
      Math.abs(total_expenses / numberOfMonths) * (1 - ratioToApply),
      local_currency:
      account.currencies[
        Math.floor(Math.random() * account.currencies.length)
        ]
    };
    transactions.push(t);
  }

  return transactions;
}

export default generateTransactions;