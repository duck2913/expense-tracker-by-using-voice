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
import { useSpeechContext } from "@speechly/react-client/dist/hooks";
import { useEffect } from "react";

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
	const { segment } = useSpeechContext();

	function createTransaction() {}

	useEffect(() => {
		if (!segment) return;
		console.log(segment.intent.intent);
		if (segment.intent.intent === "add_expense") {
			console.log("type change to expense");
			setFormData({ ...formData, type: "Expense" });
		}
		if (segment.intent.intent === "add_income") {
			console.log("type change to income");
			setFormData({ ...formData, type: "Income" });
		}
		if (segment.intent.intent === "create_transaction" && segment.isFinal) createTransaction();
		if (segment.intent.intent === "cancel_transaction" && segment.isFinal)
			setFormData(initialState);
		//
		segment.entities.forEach((entity) => {
			switch (entity.type) {
				case "amount":
					setFormData({ ...formData, amount: entity.value });
					break;
				case "category":
					const category = `${entity.value.charAt(0)}${entity.value
						.slice(1)
						.toLowerCase()}`;
					setFormData({ ...formData, category });
					break;
				case "date":
					setFormData({ ...formData, date: entity.value });
					break;
				default:
					break;
			}
		});
	}, [segment]);

	function addTransactionHandler() {
		addTransaction(formData);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography align="center" variant="subtitle2" gutterBottom>
					{segment && <>{segment.words.map((word) => word.value).join(" ")}</>}
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
