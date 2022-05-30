import React from "react";
import {
	List as MUIList,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	ListItemSecondaryAction,
	IconButton,
	Slide,
} from "@material-ui/core";
import { Delete, MoneyOff } from "@material-ui/icons";

import useStyles from "./listStyles";

const List = () => {
	const classes = useStyles();

	const transactions = [
		{ id: 1, type: "Income", category: "business", amount: 100, date: "10/10/2001" },
		{ id: 2, type: "Income", category: "education", amount: 200, date: "10/10/2001" },
		{ id: 3, type: "Expense", category: "entertainment", amount: 50, date: "10/10/2001" },
	];
	return (
		<MUIList dense={false} className={classes.list}>
			{transactions.map((transaction, idx) => (
				<Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
					<ListItem>
						<ListItemAvatar>
							<Avatar
								className={
									transaction.type === "Income"
										? classes.avatarIncome
										: classes.avatarExpense
								}
							>
								<MoneyOff />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={transaction.category}
							secondary={`$${transaction.amount} - ${transaction.date}`}
						/>
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete" onClick="">
								<Delete />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</Slide>
			))}
		</MUIList>
	);
};

export default List;
