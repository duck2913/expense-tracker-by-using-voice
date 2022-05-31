import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useStyle from "./detailStyles";
import useTransactions from "../../hooks/useTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);

const Detail = ({ title }) => {
	const classes = useStyle();
	const [incomeData, incomeTotal] = useTransactions("Income");
	const incomeChartData = {
		labels: Object.keys(incomeData),
		datasets: [
			{
				label: "# of Votes",
				data: Object.values(incomeData).map((obj) => obj.amount),
				backgroundColor: Object.values(incomeData).map((obj) => obj.color),
				borderWidth: 1,
			},
		],
	};

	const [expenseData, expenseTotal] = useTransactions("Expense");
	const expenseChartData = {
		labels: Object.keys(expenseData),
		datasets: [
			{
				label: "# of Votes",
				data: Object.values(expenseData).map((obj) => obj.amount),
				backgroundColor: Object.values(expenseData).map((obj) => obj.color),
				borderWidth: 1,
			},
		],
	};

	return (
		<Card className={title === "Income" ? classes.income : classes.expense}>
			<CardHeader title={title} />
			<CardContent>
				<Typography variant="h5">
					{title === "Income" ? `$${incomeTotal}` : `$${expenseTotal}`}
				</Typography>
				{title === "Income" ? (
					<Doughnut data={incomeChartData} />
				) : (
					<Doughnut data={expenseChartData} />
				)}
			</CardContent>
		</Card>
	);
};

export default Detail;
