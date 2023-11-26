const Popup = ({ userData, onClose, onEdit, ThankYou }) => {

	if (ThankYou)
		return (
			<div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
				<div className="bg-white p-8 rounded-md w-128 flex flex-col">
					<h2 className="text-2xl font-bold mb-4 text-center">
						Thank you! Your data has been saved successfully.
					</h2>
					<div className="flex mt-4 justify-end">
						<button
							className="bg-gray-500 text-white p-3 rounded-md w-24 hover:bg-gray-700 transition duration-300"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		);

	return (
		<div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-8 rounded-md w-128 flex flex-col">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Want to update your form data?
				</h2>
				<p>
					<span className="font-bold">Name:</span> {userData.name}
				</p>
				<p>
					<span className="font-bold">Sector:</span> {userData.sector}
				</p>
				<p>
					<span className="font-bold">Agreed:</span>{" "}
					{userData.agreed ? "Yes" : "No"}
				</p>
				<div className="flex mt-4 justify-end">
					<button
						className="bg-blue-500 text-white p-3 rounded-md mr-4 w-24  hover:bg-blue-700 transition duration-300"
						onClick={() => onEdit(userData)}
					>
						Edit
					</button>
					<button
						className="bg-gray-500 text-white p-3 rounded-md w-24 hover:bg-gray-700 transition duration-300"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Popup;
