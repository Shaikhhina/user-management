import React, { useState } from "react";

export default function NewUser() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  });
  // for error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  });
  // for snackbar
  const [snackbar, setSnackbar] = useState({
    message: "",
    show: false,
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    // Name validation (required and should be char only)
    if (!newUser.name) {
      newErrors.name = "Name is required";
    } else if (/^\d+$/.test(newUser.name)) {
      newErrors.name = "Name is not valid, it should be character only";
    }
    // Email validation (required and must be a valid email)
    if (!newUser.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Email is invalid";
    }
    // Phone validation (required and must be a valid phone number)
    if (!newUser.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(newUser.phone)) {
      newErrors.phone = "Phone number is invalid. It should have 10 digits.";
    }
    // Company Name validation (required)
    if (!newUser.companyName) {
      newErrors.companyName = "Company name is required";
    }
    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!validateForm()) {
      console.log("Validation failed, please check the fields.");
      return;
    }
    // show submitted on console
    console.log("Submitted Data:", newUser);
    // Show success message
    setSnackbar({
      message: "Successfully submitted",
      show: true,
    });

    // Hide snackbar after 3 seconds
    setTimeout(() => {
      setSnackbar({
        message: "",
        show: false,
      });
    }, 3000);
    // Clear the form fields after submission
    setNewUser({
      name: "",
      email: "",
      phone: "",
      companyName: "",
    });
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://img.freepik.com/premium-vector/hands-fill-registration-data_18660-3897.jpg?w=740)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-green-700">
                New User Registration
              </h1>
              <p className="text-[15px] text-gray-500 mt-1">
                Hey, enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-lg flex flex-col gap-4">
                {/* Name Input */}
                <input
                  className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={newUser.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                {/* Email Input */}
                <input
                  className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={newUser.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                {/* Phone Input */}
                <input
                  className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone"
                  value={newUser.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                {/* Company Name Input */}
                <input
                  className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                    errors.companyName ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={newUser.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">{errors.companyName}</p>
                )}
                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="mt-5 tracking-wide font-semibold bg-green-300 text-black w-full py-4 rounded-lg hover:bg-green-700 hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Snackbar - Success Message  */}
      {snackbar.show && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {snackbar.message}
        </div>
      )}
    </div>
  );
}
