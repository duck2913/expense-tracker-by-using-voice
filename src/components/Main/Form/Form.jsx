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

const initialState = {
	amount: 0,
	type: "Income",
	date: new Date(),
	category: "",
};

const Form = () => {
	const { addTransaction } = useContext(ExpenseTrackerContext);
	const [formData, setFormData] = useState(initialState);
	const classes = useStyles();

	function addTransactionHandler() {}

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
						<MenuItem value="business">Business</MenuItem>
						<MenuItem value="salary">Salary</MenuItem>
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
						setFormData((formData) => ({ ...formData, amount: e.target.value }));
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
						setFormData((formData) => ({ ...formData, date: e.target.value }));
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
