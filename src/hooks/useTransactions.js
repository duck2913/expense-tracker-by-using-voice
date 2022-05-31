import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/Context";
import { expenseCategories, incomeCategories, resetCategories } from "../constants/categories";

const useTransactions = (type) => {
	const { transactions } = useContext(ExpenseTrackerContext);
	const selectedTypeTransactions = transactions.filter(
		(transaction) => transaction.type === type,
	);
	const total = selectedTypeTransactions.reduce(
		(total, transaction) => total + transaction.amount,
		0,
	);
	const sumByCategory = {};
	selectedTypeTransactions.forEach((transaction) => {
		if (sumByCategory[transaction.category]) {
			sumByCategory[transaction.category].amount += transaction.amount;
		} else {
			const category = transaction.category;

			sumByCategory[category] = {
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
	return [sumByCategory, total];
};
export default useTransactions;
