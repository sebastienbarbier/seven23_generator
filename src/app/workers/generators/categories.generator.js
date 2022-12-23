const categories_sample = [
  'Food and non-alcoholic beverages', // # 0
  'Alcoholic beverages and tobacco', // # 1
  'Clothing and footwear', // # 2
  'Housing, water, gas, electricity and other fuels', // # 3
  'Furniture, household items and routine home maintenance', // # 4
  'Health', // # 5
  'Transport', // # 6
  'Communications', // # 7
  'Leisure and culture', // # 8
  'Education', // # 9
  'Catering and hotels', // # 10
  'Miscellaneous goods and services' // # 11
];

/**
 * Return a list of category objects
 */
function generateCategories() {
    const categories = [];

    categories_sample.map((name, index) => {
        categories.push({
            id: index,
            name: name,
            active: true,
            deleted: false
        });
    });
        
    return categories;
}

export default generateCategories;