import React, { useState } from "react";
import axios from "axios";

export default function Course_reg() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [numCourses, setNumCourses] = useState(1); 
    const [formData, setFormData] = useState([{ course_code: "", course_name: "" }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index] = { ...updatedFormData[index], [name]: value };
        setFormData(updatedFormData);
    };

    const handleNumCoursesChange = (e) => {
        const value = e.target.value;
        setNumCourses(value);
        const updatedFormData = Array.from({ length: value }, (_, index) => formData[index] || { course_code: "", course_name: "" });
        setFormData(updatedFormData);
    };

    const handleValidation = () => {
        const requiredFields = ["course_code", "course_name"];

        for (const course of formData) {
            for (let field of requiredFields) {
                if (course[field].length === 0) {
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
                const response = await axios.post(
                    'http://localhost:8081/api/course/addcourses',
                    formData
                );
                console.log('Successfully added courses:', response.data);
                setSuccessMessage(`Courses added successfully. Inserted Rows: ${response.data.insertedRows}`);
                setIsSubmitted(true);
                setErrorMessage("");
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.error || "Error occurred while adding courses");
                } else {
                    setErrorMessage("There was an error saving the courses. Please try again.");
                }
                setSuccessMessage("");
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

            {successMessage && (
                <div className="mb-4 text-green-500">
                    {successMessage}
                </div>
            )}

            <form className="space-y-4">
                <div className="flex items-center mb-4">
                    <label htmlFor="num_courses" className="block text-sm font-medium text-gray-700 mr-4">
                        How many courses do you want to add?
                    </label>
                    <input
                        type="number"
                        id="num_courses"
                        value={numCourses}
                        onChange={handleNumCoursesChange}
                        className="w-20 border border-gray-300 rounded-md shadow-sm p-2"
                        min="1"
                    />
                </div>

                {formData.map((course, index) => (
                    <div key={index} className="flex flex-wrap -mx-2 mb-4 justify-center">
                        <div className="w-full sm:w-1/2 px-3">
                            <label htmlFor={`course_code_${index}`} className="block text-sm font-medium text-gray-700">
                                Course Code
                            </label>
                            <input
                                type="text"
                                id={`course_code_${index}`}
                                name="course_code"
                                value={course.course_code}
                                onChange={(e) => handleChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div className="w-full sm:w-1/2 px-3">
                            <label htmlFor={`course_name_${index}`} className="block text-sm font-medium text-gray-700">
                                Course Name
                            </label>
                            <input
                                type="text"
                                id={`course_name_${index}`}
                                name="course_name"
                                value={course.course_name}
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
}
