import React, { useState } from "react";
import axios from "axios";

export default function Pos_reg({ id }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [numPos, setNumPos] = useState(1); // Number of POS records user wants to add
    const [formData, setFormData] = useState([{ pos_id: "", pos_name: "", pos_body: "" }]); // Initial state for form data
    const [errorMessage, setErrorMessage] = useState("");

    // Handle change in any of the dynamically generated inputs
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index] = { ...updatedFormData[index], [name]: value };
        setFormData(updatedFormData);
    };

    // Handle change in the number of POS records input
    const handleNumPosChange = (e) => {
        const value = e.target.value;
        setNumPos(value);
        const updatedFormData = Array.from({ length: value }, (_, index) => formData[index] || { pos_id: "", pos_name: "", pos_body: "" });
        setFormData(updatedFormData);
    };

    // Validate all dynamically generated fields
    const handleValidation = () => {
        const requiredFields = ["pos_id", "pos_name", "pos_body"];

        for (const pos of formData) {
            for (let field of requiredFields) {
                if (pos[field].length === 0) {
                    alert(`Please fill in the ${field} field.`);
                    return false;
                }
            }
        }

        return true;
    };

    const handleProceedClick = async () => {
        if (handleValidation()) {
            try {
                const response = await axios.put(
                    `http://localhost:8081/api/register/${id}`,
                    formData
                );
                console.log('Successfully updated record:', response.data);
                setIsSubmitted(true);
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data);
                } else {
                    setErrorMessage("There was an error saving the registration. Please try again.");
                }
            }
        }
    };

    return (
        <div className="max-w-screen-md mx-auto p-6 border border-gray-300 shadow-lg rounded-md bg-white mt-10">
            <h1 className="text-2xl mb-6 text-blue-500 text-center">
                POS Form
            </h1>

            {errorMessage && (
                <div className="mb-4 text-red-500">
                    {errorMessage}
                </div>
            )}

            <form className="space-y-4">
                <div className="flex items-center mb-4">
                    <label htmlFor="num_pos" className="block text-sm font-medium text-gray-700 mr-4">
                        How many POS records do you want to add?
                    </label>
                    <input
                        type="number"
                        id="num_pos"
                        value={numPos}
                        onChange={handleNumPosChange}
                        className="w-20 border border-gray-300 rounded-md shadow-sm p-2"
                        min="1"
                    />
                </div>

                {formData.map((pos, index) => (
                    <div key={index} className="flex flex-wrap -mx-2 mb-4 justify-center">
                        <div className="w-full sm:w-1/2 px-3">
                            <label htmlFor={`pos_name_${index}`} className="block text-sm font-medium text-gray-700">
                                POS Name
                            </label>
                            <input
                                type="text"
                                id={`pos_name_${index}`}
                                name="pos_name"
                                value={pos.pos_name}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div className="w-full sm:w-1/2 px-3">
                            <label htmlFor={`pos_body_${index}`} className="block text-sm font-medium text-gray-700">
                                POS Body
                            </label>
                            <input
                                type="text"
                                id={`pos_body_${index}`}
                                name="pos_body"
                                value={pos.pos_body}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleProceedClick}
                    className="w-70 bg-blue-500 text-white py-2 px-4 rounded-md mt-6"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
