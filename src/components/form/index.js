import React, { useEffect, useState } from "react";
import * as api from "../../api";
import Popup from "../popup";

const Form = () => {
	const [name, setName] = useState("");
	const [sector, setSector] = useState("");
	const [agreed, setAgreed] = useState(false);
	const [nameError, setNameError] = useState("");
	const [sectorError, setSectorError] = useState("");
	const [agreedError, setAgreedError] = useState("");
	const [formError, setFormError] = useState("");
	const [loading, setLoading] = useState(true);
	const [SECTORS, setSECTORS] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const [userDataInPopup, setUserDataInPopup] = useState(null);
	const [id, setId] = useState(null);
	const [buttonText, setButtonText] = useState("Save");
	const [ThankYou, setThankYou] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await api.fetchData();
				setSECTORS(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleNameChange = (value) => {
		setName(value);
		setNameError("");
		setFormError("");
	};

	const handleSectorChange = (value) => {
		setSector(value);
		setSectorError("");
		setFormError("");
	};

	const handleAgreedChange = () => {
		setAgreed(!agreed);
		setAgreedError("");
		setFormError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setNameError("");
			setSectorError("");
			setAgreedError("");
			setFormError("");

			let isValid = true;

			if (!name) {
				setNameError("Name is required");
				isValid = false;
			}

			if (!sector) {
				setSectorError("Sector is required");
				isValid = false;
			}

			if (!agreed) {
				setAgreedError("Agree to terms is required");
				isValid = false;
			}

			if (!isValid) {
				setFormError("Please fill in all required fields.");
				return;
			}
			if (buttonText === "Update") {
				setThankYou(true);
				const existingData = userDataInPopup;
				const updatedData = { name, sector, agreed };
				const mergedData = { ...existingData, ...updatedData };
				await api.updateUserData(id, mergedData);
				setButtonText("Save");
				setId(null);
				setShowPopup(true);
			} else {
				const savaData = await api.saveData({ name, sector, agreed });
				setId(savaData.data._id);

				setUserDataInPopup({ name, sector, agreed });
				setShowPopup(true);
			}
			// Clear form fields after saving
			setName("");
			setSector("");
			setAgreed(false);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};
	if (loading) {
		return <div>Loading...</div>;
	}

	const handleEdit = async () => {
		try {
			const userData = await api.getUserData(id);
			setUserDataInPopup(userData.data);
			setName(userData.data.name);
			setSector(userData.data.sector);
			setAgreed(userData.data.agreed);
			setShowPopup(false);
			setButtonText("Update");
		} catch (error) {
			console.error("Error updating data:", error);
		}
		setShowPopup(false);
	};

	const handlePopupClose = () => {
		setShowPopup(false);
		setThankYou(false);
	};

	return (
		<div>
			<h1 className="text-3xl font-bold text-center mb-8">Form</h1>
			<h2 className="text-xl font-bold mb-4">
				Please enter your name and pick the sector you are currently involved
				in.
			</h2>
			{formError && <p className="text-red-500 mb-4">{formError}</p>}
			<label className="block mb-4">
				<span className="text-gray-700">
					Name <span className="text-red-500">*</span>:
				</span>
				<input
					type="text"
					className={`border p-2 w-full rounded-md ${
						nameError && "border-red-500"
					}`}
					value={name}
					onChange={(e) => handleNameChange(e.target.value)}
				/>
				{nameError && <p className="text-red-500">{nameError}</p>}
			</label>
			<label className="block mb-4">
				<span className="text-gray-700">
					Sector <span className="text-red-500">*</span>:
				</span>
				<select
					className={`border p-2 w-full rounded-md ${
						sectorError && "border-red-500"
					}`}
					value={sector}
					onChange={(e) => handleSectorChange(e.target.value)}
				>
					<option value="" disabled>
						Select a sector
					</option>
					{SECTORS &&
						SECTORS.map((sector) => (
							<option key={sector.id} value={sector.name}>
								{sector.name}
							</option>
						))}
				</select>
				{sectorError && <p className="text-red-500">{sectorError}</p>}
			</label>
			<label className="block mb-4">
				<input
					type="checkbox"
					checked={agreed}
					onChange={handleAgreedChange}
					className={`mr-2 ${agreedError && "border-red-500"}`}
				/>{" "}
				<span className={`text-gray-700 ${agreedError && "text-red-500"}`}>
					Agree to terms <span className="text-red-500">*</span>
				</span>
				{agreedError && <p className="text-red-500">{agreedError}</p>}
			</label>
			<button
				className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-700 transition duration-300"
				onClick={handleSubmit}
			>
				{buttonText}
			</button>
			{showPopup && (
				<Popup
					userData={userDataInPopup}
					onClose={handlePopupClose}
					onEdit={handleEdit}
					ThankYou={ThankYou}
				/>
			)}
		</div>
	);
};

export default Form;
