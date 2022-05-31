import React, { useState } from "react";
import {
	TextField,
	Typography,
	Grid,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import useStyles from "./formStyles";
import { useContext } from "react";
import { ExpenseTrackerContext } from "../../../context/Context";
import { expenseCategories, incomeCategories } from "../../../constants/categories";
import formatDate from "../../../utils/formatDates";

const initialState = {
	amount: 0,
	type: "Income",
	date: formatDate(new Date()),
	category: "business",
};

const Form = () => {
	const { addTransaction } = useContext(ExpenseTrackerContext);
	const [formData, setFormData] = useState(initialState);
	const classes = useStyles();

	function addTransactionHandler() {
		addTransaction(formData);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography align="center" variant="subtitle2" gutterBottom>
					...
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Type</InputLabel>
					<Select
						value={formData.type}
						onChange={(e) => {
							setFormData((formData) => ({
								...formData,
								type: e.target.value,
							}));
						}}
					>
						<MenuItem value="Income">Income</MenuItem>
						<MenuItem value="Expense">Expense</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Category</InputLabel>
					<Select
						value={formData.category}
						onChange={(e) => {
							setFormData((formData) => ({
								...formData,
								category: e.target.value,
							}));
						}}
					>
						{formData.type === "Income" &&
							incomeCategories.map((incomeCategory) => (
								<MenuItem value={incomeCategory.type} key={+incomeCategories.type}>
									{incomeCategory.type}
								</MenuItem>
							))}
						{formData.type === "Expense" &&
							expenseCategories.map((expenseCategory) => (
								<MenuItem value={expenseCategory.type} key={+expenseCategory.type}>
									{expenseCategory.type}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<TextField
					type="number"
					label="Amount"
					fullWidth
					value={formData.amount}
					onChange={(e) => {
						setFormData({ ...formData, amount: +e.target.value });
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					type="date"
					label="Date"
					fullWidth
					value={formData.date}
					onChange={(e) => {
						setFormData((formData) => ({
							...formData,
							date: formatDate(e.target.value),
						}));
					}}
				/>
			</Grid>
			<Button
				className={classes.button}
				variant="outlined"
				color="primary"
				fullWidth
				onClick={addTransactionHandler}
			>
				Create
			</Button>
		</Grid>
	);
};

export default Form;
