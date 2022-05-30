import React from "react";
import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

const initialState = [
	{ id: 1, type: "Income", category: "business", amount: 100, date: "10/10/2001" },
	{ id: 2, type: "Income", category: "education", amount: 200, date: "10/10/2001" },
	{ id: 3, type: "Expense", category: "entertainment", amount: 50, date: "10/10/2001" },
];

export const ExpenseTrackerContext = createContext({
	transactions: [],
	deleteTransaction: (id) => {},
	addTransaction: (transaction) => {},
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

	//ACTION CREATOR
	function deleteTransaction(id) {
		dispatch({ type: "DELETE", payload: id });
	}
	function addTransaction(transaction) {
		dispatch({ type: "ADD", payload: transaction });
	}

	const ctx = {
		transactions,
		deleteTransaction,
		addTransaction,
	};
	return <ExpenseTrackerContext.Provider value={ctx}>{children}</ExpenseTrackerContext.Provider>;
};

export default ContextProvider;
