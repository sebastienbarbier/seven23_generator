import { v4 as uuidv4 } from "uuid";

/**
 * Return list of Change objects
 */
function generateChanges(begin, end) {
	// id / label
	// 1 / Euro
	// 2 / Swiss Franc
	// 7 / USD
	return [
	    {
	      id: uuidv4(),
	      name: "1",
	      date: begin,
	      new_amount: "1",
	      new_currency: 2,
	      local_amount: "1",
	      local_currency: 1
	    },
	    {
	      id: uuidv4(),
	      name: "2",
	      date: begin,
	      new_amount: "2",
	      new_currency: 2,
	      local_amount: "2",
	      local_currency: 1
	    }
	];
}

export default generateChanges;