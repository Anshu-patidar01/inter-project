import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import base_api from "../../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Context/context";
function RequirementForm() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  const navigateTo = useNavigate();
  const [SummeryWords, setSummeryWords] = useState("");
  const [test, settest] = useState("");
  const { setUser, User } = useContext(MyContext);
  // console.log(requestedBy);
  // console.log(User);
  // console.log()

  const [form, setform] = useState({
    company: "",
    mobile: "",
    city: "",
    language: "",
    interested: "",
    containt: "",
    email: "",
    Summary: "",
  });
  const [error, seterror] = useState("");
  const handleChange = (e) => {
    e.preventDefault();

    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setform({
      ...form,
      ["email"]: User.data.email,
    });
    console.log(form);
    const value = form.mobile;
    if (!/^[6-9]\d{9}$/.test(value)) {
      seterror("Invalid mobile number.");
      return "";
    } else {
      seterror("");
    }
    try {
      const token = localStorage.getItem("project");

      if (!token) {
        toast.error("Sign-in first.", {
          position: "top-center",
        });
        navigateTo("/login");
      }
      // console.log(token);

      const response = await axios
        .post(`${base_api}/form/Requirement`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          setform({
            company: "",
            mobile: "",
            city: "",
            language: "",
            interested: "",
            Summary: "",
          });
          console.log(response);
          toast.success("Thank you for submitting your Requirement Form.", {
            position: "top-center",
          });

          setTimeout(() => {
            navigateTo("/services");
          }, 2000);
        })
        .catch((error) => {
          const response = {
            message: error.response,
            error: error.response,
          };
          console.log(response);
          toast.error(response.error, {
            position: "top-center",
          });
        });
    } catch (error) {
      toast.error("Please Try Again after some time.", {
        position: "top-center",
      });
      console.log(
        "error while connecting to Requirement Form api.Error:",
        error
      );
    }
  };
  const handleSummeruChange = (e) => {
    e.preventDefault();

    const words = e.target.value.trim().split(/\s+/);
    settest(words.length);
    if (words.length < 100) {
      // console.log(e.target.value);

      setSummeryWords(e.target.value);
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      toast.error("Max words limit is 100 only..", {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div className="p-2 sm:px-20 sm:py-10">
        <ToastContainer />
        <div className="w-full h-auto rounded-lg sm:rounded-[5rem] shadow-2xl bg-gray-800 text-white shadow-sky-800">
          <div className="p-5 sm:p-5">
            <div className=" flex flex-col  gap-2 text-justify py-2 px-5 text-gray-300">
              <div> "Looking for the Perfect Script?</div>
              <div className="">
                {" "}
                Let Writers Bring Your Vision to Life!" At ScriptHQ, we connect
                filmmakers, producers, and content creators with skilled writers
                who craft scripts tailored to their vision. Our Industry Content
                Request platform allows you to submit specific
                requirements—genre, language, and format—and let talented
                writers develop the perfect screenplay, script, lyrics, or
                concept for your project. Whether you need a thriller, drama,
                web series, or commercial script, we bring your vision to life.{" "}
              </div>{" "}
              <div>
                Submit your content request today and find the perfect story for
                your next big project!
              </div>
            </div>
            <div>
              <h1 className="text-center text-3xl mt-3 md:text-[3rem] font-bold">
                Industry Content Request Platform
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 ">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="Company"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Company name
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="Company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          type="text"
                          required
                          //autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="Mobile"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Mobile Number
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          id="Mobile"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          type="text"
                          //autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {error && <p className="text-red-200">{error}</p>}
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="City"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        City
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          id="City"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          type="text"
                          //autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="Language"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Language <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="Language"
                          name="language"
                          value={form.language}
                          onChange={handleChange}
                          required
                          //autoComplete="Language"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option value="">Select Language</option>
                          <option>Hindi</option>
                          <option>English</option>
                          <option>Punjabi</option>
                          <option>Tamil</option>
                          <option>Telugu</option>
                          <option>Kannada</option>
                          <option>Malayalam</option>
                          <option>Marathi</option>
                          <option>Urdu</option>
                          <option>Other</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="Topic"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Interested In <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="Topic"
                          name="interested"
                          value={form.interested}
                          required
                          onChange={handleChange}
                          //autoComplete="Topic"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option value="">Select Topic</option>
                          <option>Short Story</option>
                          <option>Story</option>
                          <option>Full Script</option>
                          <option>Lyrics</option>
                          <option>Poem</option>
                          <option>Music</option>
                          <option>Other</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="Containt_Type"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Content Type <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="Containt_Type"
                          name="containt"
                          value={form.containt}
                          onChange={handleChange}
                          //autoComplete="Topic"
                          required
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option value="">Select Content</option>
                          <option>Action</option>
                          <option>Adventure</option>
                          <option>Comedy</option>
                          <option>Drama</option>
                          <option>Fantasy</option>
                          <option>Fiction</option>
                          <option>Horror</option>
                          <option>Musicals</option>
                          <option>Mystery</option>
                          <option>Romance</option>
                          <option>Science Fiction</option>
                          <option>Sports</option>
                          <option>Thriller</option>
                          <option>Other...</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <div className="flex flex-row justify-between">
                        <label
                          htmlFor="Summary"
                          className="block text-sm font-medium text-gray-100"
                        >
                          Summary <span className="text-red-500">*</span>
                        </label>
                        <div>{test}/100</div>
                      </div>

                      <textarea
                        id="Summary"
                        className="min-h-[150px] p-3 w-full border border-gray-300 rounded-md bg-white text-black "
                        // contentEditable="true"
                        required
                        name="Summary"
                        value={SummeryWords}
                        onChange={(e) => {
                          handleSummeruChange(e);
                        }}
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>
                  </div>

                  <div className=" mt-5 mr-4 md:mr-10 flex items-center justify-end gap-x-6">
                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Submit
                    </button>
                    <button className="bg-gray-100 hover:scale-110 duration-500  rounded-lg p-2 text-black font-bold">
                      Cancal
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequirementForm;
