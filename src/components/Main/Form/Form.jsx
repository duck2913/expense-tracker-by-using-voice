import React, { useState, useCallback } from "react";
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
import CustomSnackBar from "../../Snackbar/Snackbar";

const initialState = {
	amount: 0,
	type: "Income",
	date: formatDate(new Date()),
	category: "",
};

const Form = () => {
	const { addTransaction } = useContext(ExpenseTrackerContext);
	const [formData, setFormData] = useState(initialState);
	const classes = useStyles();
	const { segment } = useSpeechContext();
	const [open, setOpen] = useState(false);

	const addTransactionHandler = useCallback(() => {
		addTransaction(formData);
		setFormData(initialState);
		setOpen(true);
	}, [formData, addTransaction]);

	//using speechly
	useEffect(() => {
		if (!segment) return;
		console.log(segment.intent.intent);
		if (segment.intent.intent === "add_expense") {
			setFormData({ ...formData, type: "Expense" });
		}
		if (segment.intent.intent === "add_income") {
			setFormData({ ...formData, type: "Income" });
		}

		//
		segment.entities.forEach((entity) => {
			switch (entity.type) {
				case "amount":
					setFormData({ ...formData, amount: Number(entity.value) });
					break;
				case "category":
					const category = `${entity.value.charAt(0)}${entity.value
						.slice(1)
						.toLowerCase()}`;
					//check if the category is belongs to the incomeCategories and expenseCategories
					if (
						(formData.type === "Income" &&
							incomeCategories.find((ic) => ic.type === category)) ||
						(formData.type === "Expense" &&
							expenseCategories.find((ec) => ec.type === category))
					)
						setFormData({ ...formData, category });
					break;
				case "date":
					setFormData({ ...formData, date: formatDate(entity.value) });
					break;
				default:
					break;
			}
		});
		if (
			segment.isFinal &&
			formData.amount &&
			formData.category &&
			formData.date &&
			formData.type
		)
			addTransactionHandler();
		if (segment.intent.intent === "cancel_transaction" && segment.isFinal)
			setFormData(initialState);
	}, [segment]);

	return (
		<Grid container spacing={2}>
			<CustomSnackBar open={open} setOpen={setOpen} />
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
						setFormData({ ...formData, amount: Number(e.target.value) });
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
