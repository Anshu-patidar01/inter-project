import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
function Users() {
  const [forms, setforms] = useState([]);

  useEffect(() => {
    const requirement_api = async () => {
      try {
        await axios
          .get("http://localhost:3000/admin/getAllUsers")
          .then((res) => {
            console.log(res.data);
            setforms(res.data);
          });
      } catch (error) {
        console.log("some error in getting requirement form details");
      }
    };
    requirement_api();
  }, []);
  return (
    <div>
      {" "}
      <nav>
        <Nav />
      </nav>
      <div>
        {" "}
        <div className="p-5  m-3 bg-orange-300 rounded-sm ">
          <table className="text-start border-2 border-gray-800 w-full">
            <thead>
              <tr className="border-2 border-gray-800">
                <th className=" border-2 border-gray-800">formId</th>
                <th className=" border-2 border-gray-800">User Name</th>
                <th className=" border-2 border-gray-800">Company</th>
                <th className=" border-2 border-gray-800">Mobile</th>
                <th className=" border-2 border-gray-800">email</th>
                <th className=" border-2 border-gray-800">createdAt</th>
                <th className=" border-2 border-gray-800">Delete User</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((item, inded) => (
                <tr className="border-2 border-gray-800 hover:bg-white duration-200">
                  <td className="border-2 border-gray-800 text-center">
                    {item.formId}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.userId.fullname}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.company}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.mobile}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.language}{" "}
                  </td>
                  <td className="border-2 border-gray-800 text-center">
                    {item.interested}
                  </td>

                  <td className="border-2 border-gray-800 text-center">
                    <button
                      className={`bg-red-700 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2`}
                    >
                      Delete
                    </button>
                  </td>
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
