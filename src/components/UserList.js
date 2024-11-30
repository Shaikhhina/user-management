import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);  
  const [searchApiData, setSearchApiData] = useState([]); // search filter
  const [filterVal, setFilterVal] = useState("");  
  const [selectedUser, setSelectedUser] = useState(null); // selected user 
  const [fetchStatus, setFetchStatus] = useState(""); // to handle fetch status
  const [snackbarVisible, setSnackbarVisible] = useState(false); //  snackbar visibility


  // Fetch users data 
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        setSearchApiData(data);
        setFetchStatus("Data fetched successfully!"); 
      } else {
        console.error("Error loading users:", res.status);
        setFetchStatus("Data could not be fetched. Please try again later."); // error message for unsuccessful fetch
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setFetchStatus("Data could not be fetched. Please check your connection and try again."); // error message for catch block
    }
  };

  // handle search filter
  const handleFilter = (e) => {
    setFilterVal(e.target.value); // Update the filter value
  };

  // handle user click
  const handleUserClick = (user) => {
    setSelectedUser(user); // Set selected user
  };
  

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Manage snackbar visibility
  useEffect(() => {
    if (fetchStatus) {
      setSnackbarVisible(true); // Show snackbar when there's a new message
      setTimeout(() => {
        setSnackbarVisible(false); // Hide snackbar after 3 seconds
      }, 3000);
    }
  }, [fetchStatus]);

  // filtered users based on the search value
  useEffect(() => {
    if (filterVal === "") {
      setUsers(searchApiData); // Reset to original data when filter is cleared
    } else {
      const filteredData = searchApiData.filter((user) => {
        const searchValue = filterVal.toLowerCase();
        // Only filter by name and email fields
        return (
          user.name.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue)
        );
      });
      setUsers(filteredData);
    }
  }, [filterVal, searchApiData]); // Re-run the filter effect when filter value or searchApiData changes

 

  return (
    <div className="container mx-auto p-4">    
      {/* Header */}
      <div className="p-1 bg-green-400 text-white">
        <div className="flex items-center justify-between flex-wrap">
          <h1 className="text-2xl font-bold ml-4 md:ml-10">
            {selectedUser ? "User Details" : "Manage User List"}
          </h1>
          {!selectedUser && (
            <div className="relative w-full mt-2 md:mt-0 md:w-1/3">
              <input
                type="text"
                placeholder="Search"
                value={filterVal}
                onInput={handleFilter}
                className="w-full px-4 py-2 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          )}
          {/* Back to List Button*/}
          {selectedUser && (
            <div>
              <button
                onClick={() => setSelectedUser(null)} // Go back to the user list
                className="text-2xl font-semibold text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600"
              >
                Back to List
              </button>
            </div>
          )}
        </div>
      </div>

      

      {/* User Details */}
      {selectedUser ? (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            {/* User Fields */}
            {[
              { label: "ID", value: selectedUser.id },
              { label: "Name", value: selectedUser.name },
              { label: "Username", value: selectedUser.username },
              { label: "Email", value: selectedUser.email },
              { label: "Phone", value: selectedUser.phone },
              { label: "Website", value: selectedUser.website },
              { label: "Street", value: selectedUser.address.street },
              { label: "Suite", value: selectedUser.address.suite },
              { label: "City", value: selectedUser.address.city },
              { label: "Zipcode", value: selectedUser.address.zipcode },
              { label: "Latitude", value: selectedUser.address.geo.lat },
              { label: "Longitude", value: selectedUser.address.geo.lng },
              { label: "Company Name", value: selectedUser.company.name },
              { label: "Catch Phrase", value: selectedUser.company.catchPhrase },
              { label: "BS", value: selectedUser.company.bs },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <label className="font-semibold text-gray-600 text-left text-sm">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-green-300 text-gray-800 break-words"
                  value={value}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // User List View
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm text-left">
            <thead className="bg-green-400">
              <tr>
                {["ID", "Name", "Email", "Phone", "Company Name"].map((header) => (
                  <th
                    key={header}
                    className="border text-gray-100 px-4 py-2 text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.company.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       {/* Snackbar Message */}
       {snackbarVisible && (
        <div
          className={` left-0  p-3 text-white text-center ${fetchStatus.includes("Error") ? "bg-red-500" : "bg-green-500"}`}
        >
          {fetchStatus}
        </div>
      )}
    </div>
    
  );
};

export default UserList;


