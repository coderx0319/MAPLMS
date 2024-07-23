import React, { useState } from "react";
import axios from "axios";

export default function Course_reg({ id }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        course_id: "",
        course_code: "",
        course_name: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    const handleValidation = () => {
        const requiredFields = [
            "course_id",
            "course_code",
            "course_name",
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
                        course_id: formData.course_id,
                        course_code: formData.course_code,
                        course_name: formData.course_name,
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
                Course Form
            </h1>

            {errorMessage && (
                <div className="mb-4 text-red-500">
                    {errorMessage}
                </div>
            )}

            <form className="space-y-4">
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full sm:w-1/3 px-3">
                        <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">
                            Course id
                        </label>
                        <input
                            type="text"
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="w-full sm:w-1/3 px-3">
                        <label htmlFor="course_code" className="block text-sm font-medium text-gray-700">
                            Course Code
                        </label>
                        <input
                            type="text"
                            id="course_code"
                            name="course_code"
                            value={formData.course_code}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="w-full sm:w-1/3 px-3">
                        <label htmlFor="course_name" className="block text-sm font-medium text-gray-700">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="course_name"
                            name="course_name"
                            value={formData.course_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};
