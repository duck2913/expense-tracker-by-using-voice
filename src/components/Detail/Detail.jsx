import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useStyle from "./detailStyles";
import useTransactions from "../../hooks/useTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);

const Detail = ({ title }) => {
	const [balance, setBalance] = useState(0);

	const classes = useStyle();
	const [data, total] = useTransactions(title);
	const chartData = {
		labels: Object.keys(data),
		datasets: [
			{
				label: "# of Votes",
				data: Object.values(data).map((obj) => obj.amount),
				backgroundColor: Object.values(data).map((obj) => obj.color),
			},
		],
	};

	return (
		<Card className={title === "Income" ? classes.income : classes.expense}>
			<CardHeader title={title} />
			<CardContent>
				<Typography variant="h5">{`$${total}`}</Typography>
				<Doughnut data={chartData} />
			</CardContent>
		</Card>
	);
};

export default Detail;
