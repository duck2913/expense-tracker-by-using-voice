import React from "react";
import { Grid } from "@material-ui/core";
import Detail from "./components/Detail/Detail";
import useStyle from "./appStyles";
import Main from "./components/Main/Main";

function App() {
	const classes = useStyle();
	return (
		<div className="App">
			<Grid
				className={classes.grid}
				container
				spacing={0}
				alignItems="center"
				justify="center"
				style={{ height: "100vh" }}
			>
				<Grid item xs={12} sm={4}>
					<Detail title="Income" />
				</Grid>
				<Grid item xs={12} sm={3}>
					<Main />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Detail title="Expense" />
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
