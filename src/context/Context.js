import React, { useEffect } from "react";
import { createContext, useReducer, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

const initialState = [
	{ id: 1, type: "Expense", category: "Bills", amount: 100, date: "10/10/2001" },
	{ id: 2, type: "Income", category: "Investments", amount: 200, date: "10/10/2001" },
	{ id: 3, type: "Income", category: "Salary", amount: 50, date: "10/10/2001" },
	{ id: 4, type: "Expense", category: "Clothes", amount: 20, date: "10/10/2001" },
];

export const ExpenseTrackerContext = createContext({
	transactions: [],
	deleteTransaction: (id) => {},
	addTransaction: (transaction) => {},
	balance: 0,
});

function reducer(state, action) {
	switch (action.type) {
		case "ADD":
			return state.concat({ ...action.payload, id: uuid() });
		case "DELETE":
			return state.filter((transaction) => transaction.id !== action.payload);
		default:
			throw new Error();
	}
}

const ContextProvider = ({ children }) => {
	const [transactions, dispatch] = useReducer(reducer, initialState);
	const [balance, setBalance] = useState(0);
	//ACTION CREATOR
	function deleteTransaction(id) {
		dispatch({ type: "DELETE", payload: id });
	}
	const addTransaction = useCallback((transaction) => {
		dispatch({ type: "ADD", payload: transaction });
	}, []);

	useEffect(() => {
		const result = transactions.reduce(
			(balance, currTransaction) =>
				currTransaction.type === "Income"
					? balance + currTransaction.amount
					: balance - currTransaction.amount,
			0,
		);
		setBalance(result);
	}, [transactions]);

	const ctx = {
		transactions,
		deleteTransaction,
		addTransaction,
		balance,
	};
	return <ExpenseTrackerContext.Provider value={ctx}>{children}</ExpenseTrackerContext.Provider>;
};

export default ContextProvider;
