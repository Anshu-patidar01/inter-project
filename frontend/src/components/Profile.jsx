import React, { useContext, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/context";

const Profile = () => {
  const { User } = useContext(MyContext);

  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  console.log(User);
  const [userData, setUserData] = useState({
    name: User.fullname,
    email: User.email,
    location: User.mobileNumber,
    bio: "Anshu@123",
  });

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEditing(false);
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving user data:", userData);
    setIsEditing(false);
  };
  const navigatorto = useNavigate();
  return (
    <div>
      <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-500 ">
        {isOpen ? (
          <div
            className=" inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
            id="my-modal"
          >
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-center items-center">
                <img
                  src="https://cdn-icons-png.freepik.com/512/147/147144.png"
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
                />
              </div>

              <div className="flex flex-col  pb-6">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold mb-2 text-center w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                )}
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="text-gray-600 w-full"
                    />
                  ) : (
                    <span className="text-gray-600">{userData.email}</span>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={userData.location}
                      onChange={handleInputChange}
                      className="text-gray-600 w-full"
                    />
                  ) : (
                    <span className="text-gray-600">{userData.location}</span>
                  )}
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="bio"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  {isEditing ? (
                    <input
                      id="password"
                      name="password"
                      rows="4"
                      type="password"
                      value={userData.bio}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {"*".repeat(userData.bio.length)}
                    </p>
                  )}
                </div>
                <div className="flex justify-between w-full">
                  {/* <button
                  onClick={isEditing ? handleSave : handleEditToggle}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center"
                >
                  {isEditing ? (
                    <FaSave className="mr-2" />
                  ) : (
                    <FaPencilAlt className="mr-2" />
                  )}
                  {isEditing ? "Save" : "Edit"}
                </button> */}
                  <button
                    onClick={handleCloseModal}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          navigatorto("/")
        )}
      </div>
    </div>
  );
};

export default Profile;
