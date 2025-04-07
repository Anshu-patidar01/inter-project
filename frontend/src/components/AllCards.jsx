import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../Context/context";
import PopupCartUser from "./PopupCartUser";
import base_api from "../utility/contants";
import Pagination from "./Pagination";
import HeartImage from "../assets/Heart.png";
import Loading from "./Loading";
function AllCards(props) {
  const {
    forms,
    setform,
    User,
    setUser,
    setpop,
    Pop,
    allcategory,
    requestedBy,
    setrequestedBy,
    setallcategory,
  } = useContext(MyContext);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [postperpage, setpostperpage] = useState(6);
  const lastpostIndex = CurrentPage * postperpage;

  const [reqCurrentPage, setreqCurrentPage] = useState(1);
  const [reqpostperpage, setreqpostperpage] = useState(6);
  const reqlastpostIndex = reqCurrentPage * reqpostperpage;
  const reqfirstpostindex = reqlastpostIndex - reqpostperpage;

  const firstpostindex = lastpostIndex - postperpage;
  const [requirementform, setrequirementform] = useState([]);
  const [summary, setsummary] = useState("");
  const navigatTo = useNavigate();
  const [ToggleLoading, setToggleLoading] = useState(false);
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
    // for requirment interested button
    if (requirementform !== "Self") {
      setrequestedBy("Self");
    }
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
  let currentposts = [];
  currentposts = forms.filter((item) => {
    if (props.state !== "true") {
      if (props.Filter !== "false") {
        if (
          props.Filter.language !== "" &&
          props.Filter.categories !== "" &&
          props.Filter.containt !== ""
        ) {
          return (
            item.language === props.Filter.language &&
            item.categories === props.Filter.categories &&
            item.containt === props.Filter.containt
          );
        }
        if (
          props.Filter.language === "" &&
          props.Filter.categories !== "" &&
          props.Filter.containt !== ""
        ) {
          return (
            item.categories === props.Filter.categories &&
            item.containt === props.Filter.containt
          );
        }
        if (
          props.Filter.language !== "" &&
          props.Filter.categories !== "" &&
          props.Filter.containt === ""
        ) {
          return (
            item.language === props.Filter.language &&
            item.categories === props.Filter.categories
          );
        }
        if (
          props.Filter.language !== "" &&
          props.Filter.categories === "" &&
          props.Filter.containt !== ""
        ) {
          return (
            item.language === props.Filter.language &&
            item.containt === props.Filter.containt
          );
        }
        if (props.Filter.language !== "") {
          return item.language === props.Filter.language;
        }
        if (props.Filter.categories !== "") {
          return item.categories === props.Filter.categories;
        }
        if (props.Filter.containt !== "") {
          return item.containt === props.Filter.containt;
        }
      }

      if (allcategory === "All Category") return item;
      if (allcategory === "all") return item;
      return item.categories == allcategory;
    } else {
      // console.log(item.sold);
      return item.sold === "false";
    }
  });
  currentposts = currentposts.filter((item) => {
    return item.sold === "false";
  });
  const lenghtOfCurrentPosts = currentposts.length;
  const soldeditem = forms.filter((item) => item.sold === "true");
  // console.log(soldeditem);
  currentposts = currentposts.concat(soldeditem);
  let reqposts = [];
  reqposts = requirementform.slice(reqfirstpostindex, reqlastpostIndex);
  currentposts = currentposts.slice(firstpostindex, lastpostIndex);
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
  const handleinterestedin = async (form) => {
    console.log(form, User);
    setToggleLoading(true);

    try {
      await axios
        .post(`${base_api}/sendMail`, {
          from1: User.email,
          reasone: "I am Interested in your content",
          to: "Info@scripthq.in",
          // to: "anshupatidar62@gmail.com",
          contact: User.mobileNumber,
          name: User.fullname,
          subject: `Submission of Interested In `,
          message: `Hi Admin, I came across your content and found it very interesting. I noticed a form with the ID ${form.formId} and would love to learn more. Could you please contact me via my mobile number or email? Looking forward to your response! `,
        })
        .then((res) => {
          console.log(res);
          toast.success(
            "Your message has been sent successfully! The admin will contact you soon. ",
            {
              position: "top-center",
            }
          );
          setpop("false");
        })
        .catch((res) => {
          console.log(res);
          toast.error("Please Try again After some time Server Busy.", {
            position: "top-center",
          });
          setpop("false");
        });
    } catch (error) {
      console.log(`some Erron in interested in ${error}`);
    }
  };
  return (
    <div>
      <ToastContainer />
      <PopupCartUser summary={summary} />
      {props.Filter.language !== "" ||
      props.Filter.categories !== "" ||
      props.Filter.containt !== "" ? (
        <div className=" grid w-full sm:px-10">
          {props.Filter === "false" ? (
            ""
          ) : (
            <button
              onClick={() => {
                props.setFilter({
                  language: "",
                  categories: "",
                  containt: "",
                });
                navigatTo("/");
              }}
              className=" place-self-end p-1 px-2 bg-slate-50 border-[1px] text-slate-600 font-bold tracking-wide hover:scale-105 duration-500 hover:border-sky-400 border-sky-600 rounded-xl"
            >
              Clear Filter
            </button>
          )}
        </div>
      ) : (
        ""
      )}
      {forms.length === 0 ? (
        <div className=" h-screen"> Loading...</div>
      ) : (
        <div className="flex flex-col my-10 items-center md:items-start justify-center px-2 sm:px-10 gap-3 w-full">
          <div className="text-4xl text-gray-700 font-extrabold text-center w-full tracking-wide">
            The Creator's Corner
          </div>
          {/* Idea Cards */}
          {forms !== "" ? (
            <div className="flex flex-col items-center justify-center">
              <div className="md:w-full  rounded-md grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
                {currentposts.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col justify-between shadow-xl hover:shadow-indigo-300 hover:scale-105 cursor-pointer duration-300 text-black ${
                      item.sold === "true" ? "bg-gray-400" : ""
                    } border-[1px] hover:border-indigo-600  border-slate-400 rounded-xl `}
                  >
                    {item.sold === "true" ? (
                      <div className="text-2xl text-center text-gray-600 font-bold tracking-wide">
                        {" "}
                        Sold
                      </div>
                    ) : (
                      ""
                    )}
                    {item.requestedByformId !== "Self" && (
                      <div className="flex justify-end px-1">
                        <span className="text-gray-600 text-sm">
                          Requested ID : {item.requestedByformId}
                        </span>
                      </div>
                    )}
                    <div className="h-full flex flex-col justify-between  break-words p-3 ">
                      <div className="flex flex-row justify-between">
                        <h1 className="text-gray-700 text-lg font-bold tracking-wider">
                          {item.gender === "Male" ? "Mr. " : "Mrs. "}{" "}
                          {item.fullname}
                        </h1>
                      </div>
                      <h1 className="text-gray-700 font-semibold">
                        Title: {item.title}
                      </h1>
                      <h1 className="text-gray-700">
                        Language: {item.language}
                      </h1>
                      <h1 className="text-gray-700">Content:{item.containt}</h1>
                      <h1 className="text-gray-700">
                        Category: {item.categories}
                      </h1>
                      <h1 className="text-gray-700">
                        Copyright: {item.copyright}
                      </h1>
                      {item.sold === "false" && (
                        <div className="text-gray-700 break-words max-h-24 overflow-hidden ">
                          Summary :{" "}
                          {item.language === "Tamil"
                            ? item.summary.split(" ").slice(0, 5).join(" ")
                            : item.summary.split(" ").slice(0, 10).join(" ")}
                          <span
                            className="text-blue-800"
                            onClick={() => {
                              setpop("true");
                              setsummary(item.summary);
                            }}
                          >
                            See More...
                          </span>
                        </div>
                      )}
                    </div>
                    {item.sold === "false" && (
                      <div className="flex flex-row justify-between gap-4 p-2">
                        <button
                          onClick={() => {
                            if (User._id === "") {
                              navigatTo("/login");
                            } else {
                              setpop("true");
                              setsummary(
                                `We are sending Mail to Admin That You are interested in form:${item.formId} Title:${item.title} Category:${item.categories} Language:${item.language}`
                              );
                              handleinterestedin(item);
                            }
                          }}
                          className=" border-[1px] hover:scale-105 duration-300 hover:shadow-lg border-sky-500 rounded-lg p-1 shadow-md "
                        >
                          <span>Interested</span>
                        </button>
                        <span className=" flex flex-row items-center gap-3">
                          <h1 className="text-lg">{item.likes.length}</h1>
                          <button
                            onClick={() => {
                              handlelikes(item._id);
                              console.log("item clicked:", User);
                            }}
                            className=" shadow-md hover:shadow-red-600 rounded-full p-1"
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
                              <span className="">
                                <img
                                  src={HeartImage}
                                  className="h-6 w-6"
                                  alt="Not Found"
                                />
                              </span>
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
                    )}
                  </div>
                ))}
              </div>
              {lenghtOfCurrentPosts !== 0 ? (
                <div className="w-[100%]  p-1">
                  <Pagination
                    totalPosts={lenghtOfCurrentPosts}
                    postsPages={postperpage}
                    setCurrentPage={setCurrentPage}
                    CurrentPage={CurrentPage}
                  />
                </div>
              ) : (
                <div className="sm:px-10 bg-slate-300 sm:py-5">
                  <h1 className="text-center text-3xl  text-red-400 tracking-wider">
                    No Idea in This Field
                  </h1>
                  <Link
                    to={"/requirementForm"}
                    className="p-1 rounded-lg m-3 bg-sky-600 text-sky-200"
                  >
                    Request Now!!
                  </Link>
                  <button
                    onClick={() => {
                      props.setFilter({
                        language: "",
                        categories: "",
                        containt: "",
                      });
                      navigatTo("/");
                    }}
                    className=" place-self-end p-1 px-2 bg-slate-50 border-[1px] text-slate-600 font-bold tracking-wide hover:scale-105 duration-500 hover:border-sky-400 border-sky-600 rounded-xl"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-2/3">
              {/* For Loading */}
              <Loading />
            </div>
          )}
        </div>
      )}

      {/* Requerement Cards */}
      <div className="flex flex-col gap-8 sm:p-5">
        {/* <h1 className="text-white bg-slate-700 sm:mx-20 md:mx-0 text-center text-4xl py-10 font-bold tracking-wider"></h1> */}
        <div className="text-4xl text-gray-700 font-extrabold text-center w-full tracking-wide">
          Industry Content Request{" "}
        </div>
        <div className="md:w-full rounded-md grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-10 p-2 sm:p-5">
          {reqposts.map((item, index) => (
            <div
              key={index}
              className=" flex justify-center hover:scale-110 duration-300  items-center text-gray-800"
            >
              <div className=" flex flex-col gap-1  border-[1px] hover:border-indigo-600  border-slate-400 rounded-xl font-bold w-72 bg-gray-50  shadow-xl hover:shadow-indigo-300 px-5 py-5 ">
                <div className="flex flex-row justify-between">
                  <label>
                    Interested In:
                    <span className="text-sm font-normal">
                      {" "}
                      {item.interested}
                    </span>
                  </label>
                  <div className=" flex justify-end px-1">
                    <span className="text-gray-600 font-normal text-sm">
                      ID : {item.formId}
                    </span>
                  </div>
                </div>
                <label>
                  Language:{" "}
                  <span className="text-sm font-normal"> {item.language}</span>
                </label>
                <label>
                  Content:{" "}
                  <span className="text-sm font-normal"> {item.containt}</span>
                </label>
                <label className=" min-h-15 max-h-12 overflow-hidden">
                  Summery:
                  <span className="text-sm font-normal">
                    {" "}
                    {item.Summary.split(" ").slice(0, 8).join(" ")}
                  </span>
                </label>
                <span
                  className="text-blue-800 cursor-pointer"
                  onClick={() => {
                    setpop("true");
                    setsummary(item.Summary);
                  }}
                >
                  See More...
                </span>
                <button
                  onClick={() => {
                    if (User._id === "") {
                      navigatTo("/login");
                    } else {
                      console.log(item.formId);
                      setrequestedBy(item.formId);
                      navigatTo("/idiaSubmit");
                    }
                  }}
                  className=" py-2 mt-2 border-[1px] hover:scale-105 duration-300 hover:shadow-lg border-sky-500 rounded-lg p-1 shadow-md "
                >
                  <span>I am Interested</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {reqposts.length !== 0 ? (
          <div className="w-[100%]  p-1">
            <Pagination
              totalPosts={reqposts.length}
              postsPages={reqpostperpage}
              setCurrentPage={setreqCurrentPage}
              CurrentPage={reqCurrentPage}
            />
          </div>
        ) : (
          <div className="sm:px-10 bg-slate-300 sm:py-5">
            <h1 className="text-center text-3xl  text-red-400 tracking-wider">
              No requeste in This Field
            </h1>
            <Link
              to={"/requirementForm"}
              className="p-1 rounded-lg bg-sky-600 text-sky-200"
            >
              Request Now!!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllCards;
