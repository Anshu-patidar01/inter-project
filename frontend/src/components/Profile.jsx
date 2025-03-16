import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import base_api from "../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSearchParams } from "react-router-dom";
import { MyContext } from "../Context/context";
function Profile() {
  const { User } = useContext(MyContext);
  const user = User.data;
  const [toggle, settoggle] = useState(false);
  const [data, setdata] = useState([]);
  const [form, setform] = useState({
    title: "",
    summary: "",
  });

  const respons = async () => {
    const token = localStorage.getItem("project");

    await axios
      .get(`${base_api}/form/getIdiaForm`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    respons();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();

    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const token = localStorage.getItem("project");

    await axios
      .patch(
        `${base_api}/form/IdeaForm`,
        {
          formId: "67d0152cb4fe5c7c2929a519",
          title: form.title,
          summary: form.summary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setform({
          title: "",
          summary: "",
        });
        respons();
        console.log(response);
        toast.success("Form Updated Successfully!", {
          position: "top-center",
        });
        settoggle(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not Updated Please Try Again!!", {
          position: "top-center",
        });
      });
  };
  return (
    <div className=" md:px-20 ">
      <ToastContainer />

      <div className="bg-slate-200">
        <section>
          <header class="md:px-2 py-20 flex flex-col justify-center items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-circle-user"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
            <div className="flex flex-col gap-1">
              <h1 class="text-4xl text-gray-500 font-bold mt-2">
                {user.fullname}
              </h1>
              <h2 class="text-base md:text-xl text-gray-500 font-bold">
                {user.email}
              </h2>
              <h2 class="text-base md:text-xl text-gray-500 font-bold">
                {user.mobileNumber}
              </h2>
            </div>
          </header>
          <div className="text-end text-gray-600 p-3">
            {" "}
            Joining Date: {user.updatedAt.split("T")[0]}
          </div>
        </section>
        <div className="h-32 bg-slate-500/50 text-3xl font-bold tracking-wide text-black/80 grid items-center text-start px-10 ">
          Your Idea Froms
        </div>
        <section className="p-5 px-2 md:px-10">
          <ul class="grid grid-cols-1  gap-y-10 gap-x-6 items-start p-8">
            {data.map((item) => (
              <li
                key={item.updatedAt}
                class="relative bg-slate-300 shadow-lg rounded-lg shadow-gray-400 p-4 flex flex-col sm:flex-row xl:flex-col items-start"
              >
                <section className="flex w-full flex-col">
                  <div className=" flex flex-col items-end text-stone-600">
                    <h1>Date: {item.updatedAt.split("T")[0]}</h1>
                    <h1>
                      Status:{" "}
                      <span
                        className={`${
                          item.status === "Pendding"
                            ? "text-red-700/80 "
                            : "text-green-700/80"
                        } font-bold tracking-wider`}
                      >
                        {item.status}
                      </span>
                    </h1>
                  </div>

                  {item.status === "Pendding" ? (
                    toggle === true ? (
                      <div className=" grid gap-3">
                        <div className="flex flex-row gap-5 ">
                          <h1 className="text-gray-950 text-lg">Title:</h1>
                          <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={(e) => handleChange(e)}
                            className=" p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />{" "}
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-5 gap-2 ">
                          <h1 className="text-gray-950 text-lg">Summary:</h1>
                          <textarea
                            className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="summary"
                            value={form.summary}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter your message..."
                            // value={}
                          ></textarea>
                        </div>
                        <div className=" flex gap-3 mt-2">
                          <button
                            type="submit"
                            className="hover:bg-gray-600/80 bg-gray-500 p-2 px-4 text-black font-bold tracking-wide rounded-lg"
                            onClick={(e) => {
                              handleSubmit(e);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="hover:bg-gray-800/80 bg-gray-800 p-2 px-4 text-white font-bold tracking-wide rounded-lg"
                            onClick={() => {
                              settoggle(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-row gap-5 ">
                          <h1 className="text-gray-950 text-lg">Title:</h1>
                          <h1 className="text-gray-800">{item.title}</h1>
                        </div>

                        <div className="flex flex-col md:flex-row md:gap-5 gap-2 ">
                          <h1 className="text-gray-950 text-lg">Summary:</h1>
                          <h1 className="text-gray-800 text-justify">
                            {item.summary}
                          </h1>
                        </div>
                      </div>
                    )
                  ) : (
                    <div>
                      <div className="flex flex-row gap-5 ">
                        <h1 className="text-gray-950 text-lg">Title:</h1>
                        <h1 className="text-gray-800">{item.title}</h1>
                      </div>

                      <div className="flex flex-col md:flex-row md:gap-5 gap-2 ">
                        <h1 className="text-gray-950 text-lg">Summary:</h1>
                        <h1 className="text-gray-800 text-justify">
                          {item.summary}
                        </h1>
                      </div>
                    </div>
                  )}
                  {item.status !== "Pendding" ? (
                    ""
                  ) : (
                    <div>
                      {toggle === true ? (
                        ""
                      ) : (
                        <div
                          div
                          className="flex flex-row justify-end mt-5 float-end gap-5"
                        >
                          <button
                            onClick={() => {
                              settoggle(true);
                            }}
                            className="hover:bg-green-800/80 bg-green-800 p-2 px-4 text-white font-bold tracking-wide rounded-lg"
                          >
                            Edit
                          </button>
                          <button className="hover:bg-red-800/80 bg-red-800 p-2 px-4 text-white font-bold tracking-wide rounded-lg">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Profile;
