const CATEGORIES = [
  { // # 0
    name: 'Food and Drinks',
    description: 'Food and non-alcoholic beverages', 
    type: 'expenses',
    pourcent_salary: 13.5,
    per_month: 24,
    labels: [
        'Supermarket',
        'Street market',
        'Street food',
        'Coffee to go ☕️',
        'Tea to go',
        'Croissant 🥐',
        'Bread',
        'Meat',
        'Baguette 🥖',
        'Slice of pizza 🍕',
        'Lunch box',
        'Chocolate candy bar',
        'Water bottle',
        'Orange juice 🍊',
        'Coca cola',
    ]
  },
  { // # 1
    name: 'Alcoholic & Tobacco',
    description: 'Alcoholic beverages and tobacco', 
    type: 'expenses',
    pourcent_salary: 1.9,
    per_month: 1,
    labels: [
        'Drinks after work 🎉',
        'Bottle whisky 🥃',
        'Bottle Gin',
        'Cigarettes 🚬',
        'Local beers 🍺',
    ]
  },
  { // # 2
    name: 'Clothing',
    description: 'Clothing and footwear', 
    type: 'expenses',
    pourcent_salary: 5.5,
    per_month: 1,
    labels: [
        'Sportwear 🏃‍♀️',
        'New shoes 👟',
        'New suits',
        'Shoemaker',
        'T-shirt',
        'Pant 👖',
    ]
  },
  { // # 3
    name: 'Housing',
    description: 'Housing, water, gas, electricity and other fuels', 
    type: 'expenses',
    pourcent_salary: 13.4,
    per_month: 4,
    labels: [
        'Rent 🏡',
        'Water 💧',
        'Gas',
        'Électricity ⚡️',
    ]
  },
  { // # 4
    name: 'Furniture & household',
    description: 'Furniture, household items and routine home maintenance', 
    type: 'expenses',
    pourcent_salary: 6.5,
    per_month: 4,
    labels: [
        'Cleaning product 🧹',
        'Tools 🛠️',
        'Home insurrance',
        'Pipe to fix a water leak',
        'New tires for the bike',
        'Stickers',
        'Pens ✒️',
        'Paper for the printer',
        'Rubbish bags',
        'New furnitures',
        'Pillows',
        'Bedsheets 🛏️',
    ]
  },
  { // # 5
    name: 'Health',
    description: null, 
    type: 'expenses',
    pourcent_salary: 1.8,
    per_month: 2,
    labels: [
        'Visit doctor 👩‍⚕️',
        'Pills 💊 at the pharmacy',
        'Dentist 🦷',
        'Private insurrance',
    ]
  },
  { // # 6
    name: 'Transport',
    description: null,
    type: 'expenses',
    pourcent_salary: 16.8,
    per_month: 4,
    labels: [
        'Bus subscription',
        'Train ticket 🚝',
        'Bus ticket 🚎',
        'Plane ticket ✈️',
        'Gazoline',
        'Rental car',
        'Taxi 🚕',
    ]
  },
  { // # 7
    name: 'Communications',
    description: null,
    type: 'expenses',
    pourcent_salary: 2.1,
    per_month: 2,
    labels: [
        'Mobile subscription 📱',
        'Internet',
    ]
  },
  { // # 8
    name: 'Leisure and culture',
    description: null,
    type: 'expenses',
    pourcent_salary: 11.3,
    per_month: 8,
    labels: [
        'Cinema 🎥',
        'Book',
        'Museum',
        'Bowling 🎳',
        'Pool 🎱',
        'Library fees 📕',
        'Night club entry 💃',
        'Rental Motobike',
        'Karting 🏎️',
        'Paintball',
        'Netflix',
        'Theater',
    ]
  },
  { // # 9
    name: 'Education',
    description: null,
    type: 'expenses',
    pourcent_salary: 1.3,
    per_month: 2,
    labels: [
        'Newspaper subscription 📰',
        'Science magazine 📰',
    ]
  },
  { // # 10
    name: 'Restaurants and hotels',
    description: null,
    type: 'expenses',
    pourcent_salary: 10.7,
    per_month: 4,
    labels: [
        'Hotel 🏨',
        'Burger 🍔 / Coca',
        'Pizza with wine 🍕🍷',
        'Sushis 🍣',
        'Chinese food 🥡',
        'Indian 🥘',
        'Airbnb 🛌',
    ]
  },
  { // # 11
    name: 'Others',
    description: 'Miscellaneous goods and services',
    type: 'expenses',
    pourcent_salary: 15.2,
    per_month: 3,
    labels: [
        'Massage',
        'Haircut 💇‍♂️',
        'Car wash',
        'Rental holidays',
        'Spotify',
        'Video game',
        'Lawer consulting',
        'NGO subscription',
        'Babysitter 👶',
        'New watch ⌚️',
        'New wallet',
        'Computer',
        'Computer fix',
        'Seven23 subscription ✨',
    ]
  },
  { // # 12
    name: 'Salary',
    description: null, 
    type: 'income',
    pourcent_salary: 100,
    per_month: 1,
    date: 25,
    labels: [
        '💰 Salary',
    ]
  }
];

/**
 * Return a list of category objects
 */
function generateCategories() {
    const categories = [];

    CATEGORIES.map((category, index) => {
        categories.push({
            id: index,
            name: category.name,
            description: category.description || undefined,
            active: true,
            deleted: false
        });
    });
        
    return categories;
}

export { generateCategories, CATEGORIES };