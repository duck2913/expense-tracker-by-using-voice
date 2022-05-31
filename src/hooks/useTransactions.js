import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/Context";
import { expenseCategories, incomeCategories } from "../constants/categories";

const useTransactions = (type) => {
	const { transactions } = useContext(ExpenseTrackerContext);
	const selectedTypeTransactions = transactions.filter(
		(transaction) => transaction.type === type,
	);
	const total = selectedTypeTransactions.reduce(
		(total, transaction) => total + transaction.amount,
		0,
	);
	const transactionsPerCategory = {};
	selectedTypeTransactions.forEach((transaction) => {
		const category = transaction.category;
		if (transactionsPerCategory[category]) {
			transactionsPerCategory[category].amount += transaction.amount;
		} else {
			transactionsPerCategory[category] = {
				amount: transaction.amount,
				color:
					type === "Income"
						? incomeCategories.find(
								(obj) => obj.type.toLowerCase() === category.toLowerCase(),
						  ).color
						: expenseCategories.find(
								(obj) => obj.type.toLowerCase() === category.toLowerCase(),
						  ).color,
			};
		}
	});
	return [transactionsPerCategory, total];
};
export default useTransactions;
