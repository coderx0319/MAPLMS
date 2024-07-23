import React, { useState } from "react";
import axios from "axios";

export default function Pos_reg({ id }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        pos_id: "",
        pos_name: "",
        pos_body: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    const handleValidation = () => {
        const requiredFields = [
            "pos_id",
            "pos_name",
            "pos_body",
        ];

        for (let field of requiredFields) {
            if (formData[field].length === 0) {
                alert(`Please fill in the ${field} field.`);
                return false;
            }
        }

        return true;

    };

    const handleProceedClick = async () => {
        if (handleValidation()) {
            try {
                const response = await axios.put(
                    `http://localhost:8081/api/register/${id}`,
                    {
                        pos_id: formData.pos_id,
                        pos_name: formData.pos_name,
                        pos_body: formData.pos_body,
                    }
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
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full sm:w-1/3 px-3">
                        <label htmlFor="pos_id" className="block text-sm font-medium text-gray-700">
                            Pos id
                        </label>
                        <input
                            type="text"
                            id="pos_id"
                            name="pos_id"
                            value={formData.pos_id}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="w-full sm:w-1/3 px-3">
                        <label htmlFor="pos_name" className="block text-sm font-medium text-gray-700">
                          POS Name 
                        </label>
                        <input
                            type="text"
                            id="pos_name"
                            name="pos_name"
                            value={formData.pos_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="w-full sm:w-1/3 px-3">
                        <label htmlFor="pos_body" className="block text-sm font-medium text-gray-700">
                            POS Body
                        </label>
                        <input
                            type="text"
                            id="pos_body"
                            name="pos_body"
                            value={formData.pos_body}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};
