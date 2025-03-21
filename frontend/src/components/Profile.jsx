import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import base_api from "../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSearchParams } from "react-router-dom";
import { MyContext } from "../Context/context";
import backgroundimage from "../assets/All Profile Background.jpg";
function Profile() {
  const { User } = useContext(MyContext);
  const user = User.data;
  const [toggle, settoggle] = useState(false);
  const [data, setdata] = useState([]);
  const [SummeryWords, setSummeryWords] = useState("");
  const [test, settest] = useState("");
  const [editdata, seteditdata] = useState({
    title: "",
    summary: "",
  });
  const [pop, setpop] = useState(false);
  const [editid, seteditid] = useState("");
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
  const handleSubmit = async (id) => {
    // e.preventDefault();
    const token = localStorage.getItem("project");

    await axios
      .patch(
        `${base_api}/form/IdeaForm`,
        {
          formId: id,
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
        setpop(false);
        // settoggle(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not Updated Please Try Again!!", {
          position: "top-center",
        });
      });
    seteditid("");
  };
  const handleDelete = async (id) => {
    // e.preventDefault();
    const token = localStorage.getItem("project");
    console.log(id);
    await axios
      .post(
        `${base_api}/form/IdeaFormdelete`,
        {
          formId: id,
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
        toast.success("Form Deleted Successfully!", {
          position: "top-center",
        });
        // setpop(false)
        // settoggle(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not Deleted Please Try Again!!", {
          position: "top-center",
        });
      });
    seteditid("");
  };
  const handleSummeruChange = (e) => {
    e.preventDefault();

    const words = e.target.value.trim().split(/\s+/);
    settest(words.length);
    if (words.length <= 200) {
      // console.log(e.target.value);

      setSummeryWords(e.target.value);
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      toast.error("Max words limit is 200 only..", {
        position: "top-center",
      });
    }
  };
  const handleedit = (e) => {
    setform({
      ...form,
      ["title"]: editdata.title,
      ["summary"]: editdata.summary,
    });
  };

  const handleeditchange = (e) => {};
  return (
    <div className=" md:px-20 ">
      <ToastContainer />

      <div className="bg-slate-200">
        <section
          style={{
            backgroundImage: `url(${backgroundimage})`, // ✅ Proper string format
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
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
            <div className="flex flex-col gap-1  text-gray-900">
              <h1 class="text-4xl font-bold mt-2">{user.fullname}</h1>
              <h2 class="text-base md:text-xl font-bold">{user.email}</h2>
              <h2 class="text-base md:text-xl font-bold">
                {user.mobileNumber}
              </h2>
            </div>
          </header>
          <div className="text-end text-gray-800 p-3">
            {" "}
            Joining Date: {user.updatedAt.split("T")[0]}
          </div>
        </section>
        <div className="h-32 bg-slate-500/50 text-3xl font-bold tracking-wide text-black/80 grid items-center text-start px-10 ">
          Your Idea Froms
        </div>
        {/* Card Section */}
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
                        {item.status === "Pendding" ? "Pending" : item.status}
                      </span>
                    </h1>
                  </div>
                  {/* boxes */}
                  {item.status === "Pendding" ? (
                    toggle !== "true" && (
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

                  {/* buttons */}
                  {item.status === "Pendding" && (
                    <div>
                      {toggle === false && (
                        <div className="flex flex-row justify-end mt-5 float-end gap-5">
                          <button
                            onClick={() => {
                              settoggle(false);
                              setpop(true);
                              seteditid(item._id);
                              seteditdata({
                                title: item.title,
                                summary: item.summary,
                              });
                            }}
                            className="hover:bg-green-800/80 bg-green-800 p-2 px-4 text-white font-bold tracking-wide rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            className="hover:bg-red-800/80 bg-red-800 p-2 px-4 text-white font-bold tracking-wide rounded-lg"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
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
        {/* Editor section popup */}
        <section>
          <div
            className={`relative  z-10  ${pop === true ? "block" : "hidden"}`}
          >
            <div
              // transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                  // transition
                  className="relative transform p-2 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-500 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <div
                    onClick={() => {
                      setpop(false);
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
                  <div className=" grid gap-3">
                    {/* inputs */}
                    <div className="flex flex-row gap-5 ">
                      <h1 className="text-gray-950 text-lg">Title:</h1>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={(e) => {
                          handleChange(e);
                          // console.log(id, item._id);
                        }}
                        className=" p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />{" "}
                    </div>
                    {/* inputs */}
                    <div className="flex flex-col md:flex-row md:gap-5 gap-2 ">
                      <div className="flex flex-row justify-between">
                        <h1 className="text-gray-950 text-lg">Summary:</h1>
                        <div className="text-end">{test}/200</div>
                      </div>

                      <textarea
                        className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="summary"
                        // value={form.summary}
                        value={SummeryWords}
                        onChange={(e) => {
                          handleSummeruChange(e);
                        }}
                        // onChange={(e) => handleChange(e)}
                        placeholder="Enter your message..."
                        // value={}
                      ></textarea>
                    </div>
                    {/* buttons */}
                    <div className=" flex gap-3 mt-2">
                      <button
                        type="submit"
                        className="hover:bg-gray-600/80 bg-gray-500 p-2 px-4 text-black font-bold tracking-wide rounded-lg"
                        onClick={(e) => {
                          handleSubmit(editid);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="hover:bg-gray-800/80 bg-gray-800 p-2 px-4 text-white font-bold tracking-wide rounded-lg"
                        onClick={() => {
                          setpop(false);
                          // settoggle(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
