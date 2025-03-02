import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
function FullForms() {
  const [forms, setforms] = useState([]);

  useEffect(() => {
    const requirement_api = async () => {
      try {
        await axios.get("http://localhost:3000/form/Fullform").then((res) => {
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
                <th className=" border-2 border-gray-800">Language</th>
                <th className=" border-2 border-gray-800">Interested in</th>
                <th className=" border-2 border-gray-800">Detaile</th>
                <th className={` border-2 border-gray-800`}>
                  Approve or Reject
                </th>
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

                  <td className=" grid place-items-center hover:scale-125 cursor-pointer duration-300 border-gray-800 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#a30000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      class="lucide lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
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

export default FullForms;
