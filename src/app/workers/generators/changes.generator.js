import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function randomName() {
	const LIST_CHANGE_LABEL = [
		'From Withdraw at the ATM',
		'From International Transfert',
		'From the exchange booth',
		'From Card payment',
		'Manually set the value',
		'This is an auto sync using APIs',
	];

	return LIST_CHANGE_LABEL[Math.floor(Math.random() * LIST_CHANGE_LABEL.length)];
}

/**
 * Return list of Change objects
 */
function generateChanges(begin, end) {
	// id / label
	// 1 / Euro
	// 2 / Swiss Franc
	// 4 / Thai Baths
	// 7 / USD
	// 8 / Japanese yen

	let changes = [];

	let day = moment(begin);

	const ratesFromEuro = {
		2: 0.99,
		4: 36.97,
		7: 1.06,
		8: 141
	}

	const min = -8000; // 80 euros
	const max = 0; // 0 euro

	while (day <= end) {
		// For each day, randomly pick a currency and update rate from small %

		const currency_id = Object.keys(ratesFromEuro)[Math.floor(Math.random() * Object.keys(ratesFromEuro).length)]
		const amount = Math.floor(Math.random() * (max - min + 1) + min) / 100;

		changes.push({
	      id: uuidv4(),
	      name: randomName(),
	      date: day.toDate(),
	      new_amount: parseFloat((amount * ratesFromEuro[currency_id]).toFixed(2)),
	      new_currency: parseInt(currency_id),
	      local_amount: amount,
	      local_currency: 1
	    });

		// Update currency rate from your beween 0 and 0.5 %
		const pourcentage = (Math.random() - 0.5) / 100
		ratesFromEuro[currency_id] = ratesFromEuro[currency_id] - ratesFromEuro[currency_id] * pourcentage;

		day.add(1, 'week');
	}

	return changes;
}

export default generateChanges;