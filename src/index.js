import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContextProvider from "./context/Context";
import { SpeechProvider } from "@speechly/react-client";
import "./index.css";

ReactDOM.render(
	<SpeechProvider appId="aded8773-42e8-422e-be78-8617a1b5734f">
		<ContextProvider>
			<App />
		</ContextProvider>
	</SpeechProvider>,
	document.getElementById("root"),
);
