import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import generateTransactions from "./generators/transactions.generator";
import generateChanges from "./generators/changes.generator";
import generateCategories from "./generators/categories.generator";


onmessage = function(event) {
  // Action object is the on generated in action object
  const { dateBegin, dateEnd } = event.data;

  /**
  * ACCOUNT 
  */
  const account = {
    id: uuidv4(),
    name: "Generated data",
    currencies: [1, 2],
    currency: 1
  };

  /**
  * CATEGORIES
  */
  const categories = generateCategories();

  /**
  * CHANGES
  */
  const changes = generateChanges(dateBegin, dateEnd);

  /**
  * TRANSACTIONS
  */
  const transactions = generateTransactions(dateBegin, dateEnd, categories, account);

  postMessage({
    account,
    categories,
    changes,
    transactions,
  });
};
