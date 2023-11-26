import React from "react";
import "./App.css";
import Form from "./components/form";

const App = () => {
	return (
		<div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
			<div className="container mx-auto p-8 border rounded shadow-md bg-white w-full md:w-2/3 lg:w-1/2">
				<Form />
			</div>
		</div>
	);
};

export default App;
