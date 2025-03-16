import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import axios from "axios";
import base_api from "../../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Context/context";
function RequirementForm() {
  const navigateTo = useNavigate();
  const [SummeryWords, setSummeryWords] = useState("");
  const [test, settest] = useState("");
  const { setUser, User } = useContext(MyContext);
  // console.log(User);

  const [form, setform] = useState({
    company: "",
    mobile: "",
    city: "",
    language: "",
    interested: "",
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
          toast.success("Thank You for submitting your Requirement From.", {
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
        position: "top-right",
      });
    }
  };
  return (
    <>
      <div className="p-2 sm:p-10">
        <ToastContainer />
        <div className="w-full h-auto rounded-lg sm:rounded-[5rem] shadow-2xl bg-gray-500 text-white shadow-sky-800">
          <div className="p-5 sm:p-10">
            <div>
              <h1 className="text-start text-[3rem] font-bold">
                Requirement Form
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
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
                          <option>Dialogue</option>
                          <option>Theme</option>
                          <option>Music</option>
                          <option>Other</option>
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

                  <div className=" flex flex-row gap-3 float-end mt-5 sm:mt-10">
                    <button className="bg-gray-800 text-white hover:scale-110 duration-500 shadow-md shadow-black rounded-lg p-2  font-bold">
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
