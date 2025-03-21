import React, { useEffect, useState } from "react";
import axios from "axios";
import base_api from "../../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
function RequirementForm() {
  const [forms, setforms] = useState([]);
  const requirement_api = async () => {
    try {
      await axios.get(`${base_api}/form/Requirement`).then((res) => {
        console.log(res.data);
        setforms(res.data);
      });
    } catch (error) {
      console.log("some error in getting requirement form details");
    }
  };
  useEffect(() => {
    requirement_api();
  }, []);
  // /admin/deleteRequirementform
  const handleDelete = async (id) => {
    try {
      await axios
        .post(
          `${base_api}/admin/deleteRequirementform`,
          {
            formId: id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // setToggeload(true);
          toast.success("Requirement Deleted Successfully!", {
            position: "top-center",
          });
          requirement_api();
        });
    } catch (error) {
      toast.error("Try Again!", {
        position: "top-center",
      });
      console.log("some error in Delete requirement form:", error);
    }
  };

  const handleApprove = async (id) => {
    console.log(id);
  };

  return (
    <div>
      {" "}
      <ToastContainer />
      <div>
        {" "}
        <div className="p-5  m-3 bg-orange-300 rounded-sm ">
          <table className="text-start border-2 border-gray-800 w-full">
            <thead>
              <tr className="border-2 border-gray-800">
                <th className=" border-2 border-gray-800">User Name</th>
                <th className=" border-2 border-gray-800">Company</th>
                <th className=" border-2 border-gray-800">Mobile</th>
                <th className=" border-2 border-gray-800">Language</th>
                <th className=" border-2 border-gray-800">Interested in</th>
                <th className=" border-2 border-gray-800">Summary</th>
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
                    {item.Summary.split(" ").slice(0, 5).join(" ")}{" "}
                    <span className="text-blue-900">see more...</span>
                  </td>
                  <td className=" flex justify-center items-center hover:scale-125 cursor-pointer duration-300 border-gray-800 text-center">
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
                  <td className="border-2  p-2 border-gray-800 text-center">
                    <button
                      onClick={() => {
                        handleApprove(item._id);
                        // handleDelete(item._id);
                      }}
                      className={`bg-green-700 p-1 mb-2 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
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

export default RequirementForm;
