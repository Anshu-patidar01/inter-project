import React, { useEffect, useState } from "react";
import axios from "axios";
import base_api from "../../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
function RequirementForm() {
  const [forms, setforms] = useState([]);
  const [toggel, settoggel] = useState("false");
  const [requirementform, setrequirementform] = useState({});
  const requirement_api = async () => {
    try {
      await axios.get(`${base_api}/admin/requireforms`).then((res) => {
        console.log(res.data);
        setforms(res.data);
      });
    } catch (error) {
      console.log("some error in getting requirement form details");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
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

  const handleApprove = async (id, status) => {
    try {
      await axios
        .post(
          `${base_api}/admin/updaterequirementform`,
          {
            formId: id,
            status: "Approved",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // setToggeload(true);
          toast.success("Updated Successfully!", {
            position: "top-center",
          });
          requirement_api();
        });
    } catch (error) {
      toast.error("Try Again!", {
        position: "top-center",
      });
      console.log("some error in Updated requirement approve form:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* Pop up section */}
      <section
        className={`relative  z-10 ${toggel === "true" ? "block" : "hidden"} `}
      >
        <div
          // transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform p-2 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              <div
                onClick={() => {
                  settoggel("false");
                  console.log(requirementform);
                }}
                className=" hover:bg-gray-200 p-2 cursor-pointer rounded-lg float-end"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              </div>
              <div className="w-full  flex flex-col gap-3 ">
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Date: </h1>
                  <h2>{requirementform.updatedAt}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">FormId: </h1>
                  <h2>{requirementform.formId}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Status: </h1>
                  <h2>{requirementform.status}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Company: </h1>
                  <h2>{requirementform.company}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Mobile Number: </h1>
                  <h2>{requirementform.mobile}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">City: </h1>
                  <h2>{requirementform.city}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Language: </h1>
                  <h2>{requirementform.language}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Interested In: </h1>
                  <h2>{requirementform.interested}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Content: </h1>
                  <h2>{requirementform.containt}</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <h1 className=" font-bold text-base">Summary: </h1>
                  <h2>{requirementform.Summary}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
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
                <tr
                  key={inded}
                  className="border-2 border-gray-800 hover:bg-white duration-200"
                >
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
                    <div
                      onClick={() => {
                        setrequirementform(item);
                        settoggel("true");
                      }}
                    >
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
                        className="lucide lucide-eye"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                  </td>
                  <td className="border-2  p-2 border-gray-800 text-center">
                    {item.status === "Approved" ? (
                      <h1
                        className={` p-1 mb-2 px-3 hover:scale-110 cursor-pointer duration-300 text-black rounded-lg mr-2`}
                      >
                        Approved
                      </h1>
                    ) : (
                      <button
                        onClick={() => {
                          handleApprove(item._id);
                          // handleDelete(item._id);
                        }}
                        className={`bg-green-700 p-1 mb-2 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2`}
                      >
                        Approve
                      </button>
                    )}
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
      </section>
    </div>
  );
}

export default RequirementForm;
