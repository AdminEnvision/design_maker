import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// Initialize the root element for React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component within the Provider to make the Redux store available to the app
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
