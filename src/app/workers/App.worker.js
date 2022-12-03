import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const categories_sample = {
  Automobile: [
    "Gasoline",
    "Maintenance",
    "Registration fees",
    "Auto loan payment"
  ],
  "Bank Charges": [
    "Check orders",
    "Service fees",
    "Insufficient funds fee",
    "Minimum balance fee",
    "ATM fees"
  ],
  Charity: [],
  Childcare: ["Babysitting", "Child support"],
  Clothing: [],
  "Credit Card Fees": [
    "Annual fee",
    "Finance charge",
    "Over the limit fee",
    "Minimum usage fee",
    "Cash advance fee",
    "Late fee",
    "Rewards programs",
    "Monthly payment"
  ],
  Education: [
    "Tuition",
    "Books",
    "School supplies",
    "Field trips",
    "Misc. fees",
    "Student loan payment"
  ],
  Events: ["Wedding", "Moving"],
  Food: ["Groceries", "Dining out", "Vending machines", "Coffee house"],
  Gifts: [
    "Birthday",
    "Wedding / Wedding shower",
    "Baby shower",
    "Holiday",
    "Anniversary",
    "Just because"
  ],
  Healthcare: [
    "Dental",
    "Vision",
    "Physician",
    "Hospital",
    "Prescriptions",
    "Over the counter medication",
    "Vitamins"
  ],
  Household: [
    "Rent / Mortgage payment",
    "Homeowner’s association dues",
    "Furniture",
    "Supplies",
    "Decorating",
    "Tools",
    "Home maintenance and repair",
    "Home improvement"
  ],
  Insurance: [
    "Automobile",
    "Health",
    "Life",
    "Disability",
    "Long term care",
    "Roadside assistance"
  ],
  "Job expenses": ["Reimbursed", "Clothing", "Professional dues"],
  "Leisure (daily / non-vacation)": [
    "Books",
    "Magazines",
    "Movie theater",
    "Video rental / Pay per view",
    "Sporting events",
    "Sporting goods"
  ],
  Hobbies: [
    "Cultural events (e.g. parades, carnivals, etc.)",
    "CD’s",
    "Video games",
    "Toys",
    "Tourist attractions (e.g. amusement parks, museums, zoos, etc.)"
  ],
  Loans: ["Loan Payment", "Finance charge / Interest", "Late fee"],
  "Pet Care": ["Food", "Supplies", "Veterinarian"],
  Savings: [
    "Retirement",
    "Investments",
    "Emergency fund",
    "Reserve funds (to set aside for planned expenses)"
  ],
  Taxes: ["Federal", "State", "Local"],
  Utilities: [
    "Water",
    "Sewer",
    "Electricity",
    "Gas",
    "Television (e.g. cable, satellite, etc.)",
    "Telephone / Cell phone",
    "Internet service",
    "Garbage and recycling"
  ],
  Vacation: ["Day trips", "Transportation", "Lodging", "Entertainment"]
};

onmessage = function(event) {
  // Action object is the on generated in action object
  const { dateBegin, dateEnd } = event.data;

  // Generate account
  const account = {
    id: uuidv4(),
    name: "Generated data",
    currencies: [1, 2],
    currency: 1
  };

  // Generate a list of categories
  const categories = [];

  Object.keys(categories_sample).map(name => {
    const parent = uuidv4();
    categories.push({
      id: parent,
      name: name,
      active: true,
      deleted: false
    });
    categories_sample[name].forEach(name => {
      categories.push({
        id: uuidv4(),
        name: name,
        parent,
        active: true,
        deleted: false
      });
    });
  });

  // Generate changes
  const changes = [
    {
      id: uuidv4(),
      name: "1",
      date: dateBegin,
      new_amount: "1",
      new_currency: 2,
      local_amount: "1",
      local_currency: 1
    },
    {
      id: uuidv4(),
      name: "2",
      date: dateBegin,
      new_amount: "2",
      new_currency: 2,
      local_amount: "2",
      local_currency: 1
    }
  ];

  const transactions = [];

  const numberOfDays = Math.abs(
    moment
      .utc(dateBegin)
      .startOf("month")
      .diff(moment.utc(dateEnd).endOf("month"), "days")
  );
  const numberOfMonths = Math.abs(
    moment.utc(dateBegin).diff(moment.utc(dateEnd), "months")
  );

  // Generate expenses
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

  // Generate income
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

  const result = {
    transactions,
    changes,
    categories,
    account
  };

  postMessage(result);
};
