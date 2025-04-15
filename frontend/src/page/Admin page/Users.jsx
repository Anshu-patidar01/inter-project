import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import base_api from "../../utility/contants";
function Users() {
  const [forms, setforms] = useState([]);

  useEffect(() => {
    const requirement_api = async () => {
      try {
        await axios.get(`${base_api}/admin/getAllUsers`).then((res) => {
          console.log(res.data);
          setforms(res.data);
        });
      } catch (error) {
        console.log("some error in getting requirement form details");
      }
    };
    requirement_api();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="p-5  m-3 bg-orange-300 rounded-sm ">
          <table className="text-start border-2 border-gray-800 w-full">
            <thead>
              <tr className="border-2 border-gray-800">
                <th className=" border-2 border-gray-800">S:no.</th>
                <th className=" border-2 border-gray-800">Id</th>
                <th className=" border-2 border-gray-800">User Name</th>
                <th className=" border-2 border-gray-800">Mobile Number</th>
                <th className=" border-2 border-gray-800">Email</th>
                <th className=" border-2 border-gray-800">Created</th>
                <th className=" border-2 border-gray-800">Updated</th>
                {/* <th className=" border-2 border-gray-800">Delete User</th> */}
              </tr>
            </thead>
            <tbody>
              {forms.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-2 border-gray-800 hover:bg-white duration-200"
                >
                  <td className="border-2 border-gray-800 text-center">
                    {index + 1}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item._id}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.fullname}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.mobileNumber}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.email}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.createdAt}{" "}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.updatedAt}
                  </td>

                  {/* <td className="border-2 p-2 border-gray-800 text-center">
                    <button
                      className={`bg-red-700 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2`}
                    >
                      Delete Account
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
