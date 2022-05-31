import React from "react";
import { Grid } from "@material-ui/core";
import Detail from "./components/Detail/Detail";
import useStyle from "./appStyles";
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from "@speechly/react-ui";
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
				justifyContent="center"
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
			<PushToTalkButtonContainer>
				<PushToTalkButton />
				<ErrorPanel />
			</PushToTalkButtonContainer>
		</div>
	);
}

export default App;
