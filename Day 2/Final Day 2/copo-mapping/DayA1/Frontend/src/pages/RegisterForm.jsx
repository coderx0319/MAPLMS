import React, { useState } from "react";
import axios from "axios";

export default function RegistrationForm({ email }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    user_course_id: "",
    user_id: "",
    course_id : "",
    sem: "",
    academic_year: "",
    branch: "",
    co_count: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNo" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    const requiredFields = [
      "user_course_id",
      "user_id",
      "course_id",
      "sem",
      "academic_year",
      "branch",
      "co_count",
    ];

    for (let field of requiredFields) {
      if (formData[field].length === 0) {
        alert(`Please fill in the ${field} field.`);
        return false;
      }
    }

  

    if (formData.contactNo.length !== 10) {
      alert("Enter a valid contact number.");
      return false;
    }

    return true;
  };

  const handleProceedClick = async () => {
    if (handleValidation()) {
      try {
        const response = await axios.put(
          `http://localhost:8081/api/register/${email}`,
          {
            user_course_id: formData.user_course_id,
            user_id: 1,
            course_id: 1,
            sem: formData.sem,
            academic_year: formData.academic_year,
            branch: formData.branch,
            co_count: formData.co_count,
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
        User Course Form
      </h1>

      {errorMessage && (
        <div className="mb-4 text-red-500">
          {errorMessage}
        </div>
      )}

      <form className="space-y-4">
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="user_course_id" className="block text-sm font-medium text-gray-700">
              User Course
            </label>
            <input
              type="text"
              id="user_course"
              name="user_course"
              value={formData.user_course}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="w-full sm:w-1/3 px-3">
            <label htmlFor="sem" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="sem"
              name="sem"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full sm:w-1/2 px-3">
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Branch</option>
              <option value="Comps">Comps</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="EXTC">EXTC</option>
            </select>
          </div>

          <div className="w-full sm:w-1/2 px-3">
            <label htmlFor="academic_year" className="block text-sm font-medium text-gray-700">
              Academic Year
            </label>
            <select
              id="academic_year"
              name="academic_year"
              value={formData.academic_year}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Year</option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label htmlFor="co_count" className="block text-sm font-medium text-gray-700">
              Course Count
            </label>
            <input
              type="text"
              id="co_count"
              name="co_count"
              value={formData.co_count}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
          onClick={handleProceedClick}
        >
          Proceed to Academic Details
        </button>
      </form>
    </div>
  );
}
