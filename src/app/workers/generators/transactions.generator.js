import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { RATES_FROM_EURO } from './changes.generator';
import { CATEGORIES } from './categories.generator';

const SALARY_CATEGORY_ID = 12;

function randomName(names) {
  return names[Math.floor(Math.random() * names.length)];
}

function randomCurrencyId(account) {
  return account.currencies[Math.floor(Math.random() * account.currencies.length)];
}

function randomDateSameMonth(date) {
  return moment(date).date(Math.floor(Math.random() * (date.daysInMonth() - 1) + 1));
}

function randomFloatFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * ((max * 100) - (min * 100) + 1) + (min * 100)) / 100;
}

/**
 * Return a list of transaction objects
 */
function generateTransactions(dateBegin, dateEnd, categories, account) {
  
  const transactions = [];

  // Update dateEnd to the end of month
  dateEnd = moment.utc(dateEnd).endOf("month");

  const MONTHLY_SALARY = randomFloatFromInterval(1800, 3200);

  const day = moment.utc(dateBegin).startOf("month"); // Salary is on the 25th

  /**
   *  GENRATE TRANSACTIONS FOR EACH CATEGORIES
   */
  CATEGORIES.map((category, index) => {
    if (category.type == 'income') {
      /**
       * INCOME
       * 
       * We create one transaction per month with salary value in it.
       */

      const month = moment.utc(dateBegin).startOf("month").date(category.date || 25); // Salary is on the 25th

      while (month < dateEnd) {
        transactions.push({
          id: uuidv4(),
          name: randomName(category.labels),
          date: month.toDate(),
          local_amount: (category.pourcent_salary * MONTHLY_SALARY / 100) * 1.08, // 1.08x to have 8% more income than spending
          local_currency: 1, // Salary in euro
          category: index
        });
        month.add(1, 'month');
      }
    } else {
      /**
       * EXPENSES
       */

      const month = moment.utc(dateBegin).startOf("month");
      // For each day, we create x random transactions in a random currency
      while (month < dateEnd) {

        let budget = MONTHLY_SALARY * (category.pourcent_salary / 100);

        // We randomize a bit the budget too so graph looks better
        budget = budget * randomFloatFromInterval(0.6, 1.5);

        // we generate X transactions between min and max euros
        for (let transaction = 0; transaction < category.per_month; transaction++) {

          let amount_in_euro = budget;
          // if we are not at the last transaction, we split the budget
          if (transaction != category.per_month - 1) {
            amount_in_euro = (budget / category.per_month) * randomFloatFromInterval(0.1, 1.1);
            budget -= amount_in_euro;
          }

          const currency_id = randomCurrencyId(account);

          transactions.push({
            id: uuidv4(),
            name: randomName(category.labels),
            date: randomDateSameMonth(month).toDate(),
            local_amount: -1 * amount_in_euro * RATES_FROM_EURO[currency_id], // Apply exchange rate to be local
            local_currency: currency_id,
            category: index
          });
        }

        month.add(1, 'month');
      }

   }
  });

  return transactions;
}

export default generateTransactions;