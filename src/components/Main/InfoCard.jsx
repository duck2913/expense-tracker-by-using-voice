import React from "react";

const InfoCard = () => {
	return (
		<div style={{ textAlign: "center", padding: "0 10%" }}>
			Try saying <br />
			Add {Math.random() < 0.5 ? "income" : "expense"} for $100 in category Salary for the
			next Monday ...
		</div>
	);
};

export default InfoCard;
