import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/context";
import PopupCartUser from "./PopupCartUser";
import base_api from "../utility/contants";
function AllCards(props) {
  const {
    forms,
    setform,
    User,
    setUser,
    setpop,
    Pop,
    allcategory,
    setallcategory,
  } = useContext(MyContext);
  const [requirementform, setrequirementform] = useState([]);
  const [summary, setsummary] = useState("");
  const navigatTo = useNavigate();
  const response2 = async () => {
    try {
      const token = localStorage.getItem("project");
      const response = await axios
        .get(`${base_api}/form/limitedIdiaForm`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          console.log("response of limitedIdiaForm:", res.data);
          setform(res.data);
        })
        .catch((error) => {
          console.log(response.message);
        });
    } catch (error) {
      console.log("error while connecting to getformidea api.");
    }
  };

  useEffect(() => {
    const validate_token_api = async () => {
      const token = localStorage.getItem("project");
      await axios
        .post(
          `${base_api}/validate-token`,
          { token: `${token}` },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log("then response of validatore:", res.data.data);
          setUser(res.data.data);
        })
        .catch((res) => {
          console.log("catch response of validatore:", res);
        });
    };
    const requirementform_api = async () => {
      try {
        await axios
          .get(`${base_api}/form/Requirement`)
          .then((res) => {
            // console.log(" then requirement form api :", res.data);
            setrequirementform(res.data);
          })
          .catch((res) => {
            console.log("catch res requirement form api:", res);
          });
      } catch (error) {
        console.log(
          "some problem when getting requirement forms",
          error.message
        );
      }
    };
    requirementform_api();
    validate_token_api();
    response2();
  }, []);

  const handlelikes = async (id) => {
    try {
      const token = localStorage.getItem("project");
      console.log("id:", id);
      await axios
        .post(
          `${base_api}/like`,
          { id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("response like:", response.data);
          response2();
        })
        .catch((error) => {
          console.log(error);
        });
      // response();
    } catch (error) {
      console.log("error while connecting to like api.");
    }
  };
  return (
    <div>
      <PopupCartUser summary={summary} />
      <div className=" flex flex-col  md:flex-row gap-3 w-full">
        {forms !== "" ? (
          <div className="md:w-[80%] bg-slate-500 rounded-md grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {forms
              .filter((item) => {
                if (props.state === "false") {
                  if (allcategory === "All Category") return item;
                  return item.categories == allcategory;
                } else {
                  return item;
                }
              })
              .map((item, index) => (
                <div
                  key={index}
                  className=" h-72 flex flex-col justify-between  shadow-lg hover:scale-105 cursor-pointer duration-300 bg-gray-50 shadow-blue-800 rounded-xl "
                >
                  <div className=" flex flex-col  break-words p-3 ">
                    <h1 className="text-gray-900 text-lg font-bold tracking-wider">
                      {item.gender === "Male" ? "Mr. " : "Mrs. "}
                      {item.fullname.split(" ")}
                    </h1>
                    <h1 className="text-gray-900 font-semibold">
                      Title: {item.title}
                    </h1>
                    <h1 className="text-gray-700">Language:{item.language}</h1>
                    <h1 className="text-gray-700">
                      Category: {item.categories}
                    </h1>
                    <h1 className="text-gray-700">
                      Copyright: {item.copyright}
                    </h1>
                    <h1 className="text-gray-700 ">
                      Summary :{item.summary.split(" ").slice(0, 10).join(" ")}
                      <span
                        className="text-blue-800"
                        onClick={() => {
                          setpop("true");
                          setsummary(item.summary);
                        }}
                      >
                        See More...
                      </span>
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between gap-4 p-5">
                    <button className=" border-2 hover:scale-105 duration-300 hover:shadow-lg border-gray-700 rounded-lg p-1 shadow-md shadow-sky-800 bg-gray-300">
                      Interested
                    </button>
                    <span className=" flex flex-row items-center gap-3">
                      <h1 className="text-lg">{item.likes.length}</h1>
                      <button
                        onClick={() => {
                          handlelikes(item._id);

                          console.log("item clicked:", User);
                        }}
                      >
                        {User._id === "" ? (
                          <span
                            onClick={() => {
                              navigatTo("/registration");
                              response2();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-heart"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                          </span>
                        ) : item.likes.includes(User._id) ? (
                          <img
                            src="https://images.meesho.com/images/products/212371610/u1qso_512.webp"
                            alt=""
                            className="w-8 h-6"
                          />
                        ) : (
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-heart"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-2/3">
            <main className="grid min-h-full place-items-center bg-white">
              <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-gray-900">
                  Loading Please wait....
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  Sorry, we are try to Load the page right know.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Go back home
                  </a>
                  <a href="#" className="text-sm font-semibold text-gray-900">
                    Contact support <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </main>
          </div>
        )}

        <div className="flex flex-col gap-8 p-5 h-[40rem] overflow-y-scroll bg-gray-500  md:w-[20%]">
          <h1 className="text-white text-lg  font-bold tracking-wider">
            Requirement
          </h1>
          {requirementform.map((item, index) => (
            <div
              key={index}
              className=" flex justify-center hover:scale-110 duration-300 items-center text-gray-200"
            >
              <div className=" flex flex-col gap-1 shadow-lg font-bold bg-gray-700 shadow-blue-800 rounded-xl px-5 py-5 ">
                <label>
                  Interested In:
                  <span className="text-sm font-normal">
                    {" "}
                    {item.interested}
                  </span>
                </label>

                <label>
                  Language:{" "}
                  <span className="text-sm font-normal"> {item.language}</span>
                </label>
                <label>
                  Summery:
                  <span className="text-sm font-normal">
                    {" "}
                    {item.Summary.split(" ").slice(0, 10).join(" ")}
                    <span
                      className="text-blue-200 cursor-pointer"
                      onClick={() => {
                        setpop("true");
                        setsummary(item.Summary);
                      }}
                    >
                      See More...
                    </span>
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCards;
