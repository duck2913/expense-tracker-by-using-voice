import React from "react";
import useStyle from "./mainStyles";
import { Card, CardHeader, CardContent, Grid, Divider, Typography } from "@material-ui/core";
import Form from "./Form/Form";
import List from "./List/List";

const Main = () => {
	const classes = useStyle();

	return (
		<Card className={classes.root}>
			<CardHeader title="Expense tracker" subheader="Powered by Speechly" />
			<Typography align="center" variant="h5">
				$100
			</Typography>
			<Typography variant="subtitle1" style={{ lineHeight: "1.5rem", marginTop: "20px" }}>
				Try saying: Add income for $100 in Category Salary for Monday
			</Typography>
			<Divider />
			<Form />
			<CardContent className={classes.cardContent}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<List />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default Main;
