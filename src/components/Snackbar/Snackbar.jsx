import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "./snackbarStyles";

const CustomSnackBar = ({ open, setOpen }) => {
	const classes = useStyles();

	function closeHandler(_, reason) {
		if (reason === "clickaway") return;
		setOpen(false);
	}

	return (
		<div className={classes.root}>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={open}
				anchor={true}
				autoHideDuration={3000}
				onClose={closeHandler}
			>
				<Alert onClose={closeHandler} severity="success" elevation={6} variant="filled">
					{" "}
					Transaction successfully created!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default CustomSnackBar;
