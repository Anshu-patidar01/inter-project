import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContex.jsx";
import PopUpCard from "./PopUpCard.jsx";
import Nav from "./Nav.jsx";

function IdeaForms() {
  const [forms, setforms] = useState([]);
  const { Pop, setPop } = useContext(AdminContext);
  useEffect(() => {
    const requirement_api = async () => {
      try {
        await axios
          .get("https://inter-project-lnf5.onrender.com/form/IdiaForm")
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
  const { setIdeaForm } = useContext(AdminContext);
  const [status, setstatus] = useState({
    Pandding: "true",
    Approved: "false",
    Rejected: "false",
  });
  return (
    <div>
      <nav>
        <Nav />
      </nav>
      <PopUpCard />
      <div className="p-5  m-3 bg-orange-300 rounded-sm ">
        <div className="flex flex-row gap-3 mb-2 ">
          <button
            onClick={() =>
              setstatus({
                Pandding: "true",
                Approved: "false",
                Rejected: "false",
              })
            }
            className={`bg-orange-500 text-white p-2 rounded-lg ${
              status.Pandding === "true" ? "bg-orange-800 scale-95" : ""
            }`}
          >
            Pandding
          </button>
          <button
            onClick={() =>
              setstatus({
                Pandding: "false",
                Approved: "true",
                Rejected: "false",
              })
            }
            className={`bg-green-500 text-white p-2 rounded-lg ${
              status.Approved === "true" ? "bg-green-800 scale-95" : ""
            }`}
          >
            Approved
          </button>
          <button
            onClick={() =>
              setstatus({
                Pandding: "false",
                Approved: "false",
                Rejected: "true",
              })
            }
            className={`bg-red-500 text-white p-2 rounded-lg ${
              status.Rejected === "true" ? "bg-red-900 scale-95" : ""
            }`}
          >
            Rejected
          </button>
        </div>

        <div>
          {forms.length === 0 ? (
            <div>Loading....</div>
          ) : (
            <div className=" flex flex-col gap-5 bg-red-200 p-1">
              <table className="text-start border-2 border-gray-800">
                <thead>
                  <tr className="border-2 border-gray-800">
                    <th className=" border-2 border-gray-800">User Name</th>
                    <th className=" border-2 border-gray-800">Title</th>
                    <th className=" border-2 border-gray-800">Language</th>
                    <th className=" border-2 border-gray-800">Categories</th>
                    <th className=" border-2 border-gray-800">Summary</th>
                    <th className=" border-2 border-gray-800">Detaile</th>
                    <th className={` border-2 border-gray-800`}>
                      Approve or Reject
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forms
                    .filter((item) => {
                      if (status.Approved === "true")
                        return item.status === "Approved";
                      if (status.Pandding === "true")
                        return item.status === "Pendding";
                      if (status.Rejected === "true")
                        return item.status === "Rejected";
                    })
                    .map((item) => (
                      <tr className="border-2 border-gray-800 hover:bg-white duration-200">
                        <td className="border-2 border-gray-800 text-center">
                          {item.userId.fullname}
                        </td>
                        <td className="border-2 border-gray-800 text-center">
                          {item.title}
                        </td>
                        <td className="border-2 border-gray-800 text-center">
                          {item.language}
                        </td>
                        <td className="border-2 border-gray-800 text-center">
                          {item.categories}
                        </td>
                        <td className="border-2 border-gray-800 text-center">
                          {item.summary.split(" ").slice(0, 5).join(" ")}
                          <span className="text-blue-900"> see more... </span>
                        </td>
                        <td className="border-2 border-gray-800 text-center ">
                          <div
                            onClick={() => {
                              setIdeaForm(item);
                              setPop("true");
                            }}
                            className=" grid place-items-center hover:scale-125 cursor-pointer duration-300"
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
                              class="lucide lucide-eye"
                            >
                              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </div>
                        </td>
                        <td className="flex flex-row justify-center items-center text-center p-2">
                          <button
                            className={`${
                              status.Approved === "false" ? "block" : "hidden"
                            } bg-green-700 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2`}
                          >
                            Approve
                          </button>
                          <button
                            className={`bg-red-700 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2 ${
                              status.Pandding === "true" ? "hidden" : "block"
                            }`}
                          >
                            Delete
                          </button>
                          <button
                            className={`${
                              status.Approved === "true" ||
                              status.Pandding === "true"
                                ? "block"
                                : "hidden"
                            } bg-red-800 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg`}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            // <div>hello</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IdeaForms;
