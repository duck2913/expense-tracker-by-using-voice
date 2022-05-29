import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import useStyle from "./Styles";

const Detail = ({ title }) => {
	const classes = useStyle();
	return (
		<Card className={title === "Income" ? classes.income : classes.expense}>
			<CardHeader title={title} />
			<CardContent>
				<Typography variant="h5">$50</Typography>
			</CardContent>
		</Card>
	);
};

export default Detail;
