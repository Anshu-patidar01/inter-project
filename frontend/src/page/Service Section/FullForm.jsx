import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import base_api from "../../utility/contants";
function FullForm2() {
  const [Form, setForm] = useState({
    company: "",
    mobile: "",
    city: "",
    language: "",
    interested: "",
  });
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("project");
      if (!token) {
        toast.error("Token not provided.", {
          position: "top-right",
        });
        navigateTo("/");
      }
      const response = await axios
        .post(`${base_api}/form/Fullform`, Form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("hello");
          setForm({
            company: "",
            mobile: "",
            city: "",
            language: "",
            interested: "",
          });
          console.log(response);
          toast.success("Full Form Submited Succefully.", {
            position: "top-right",
          });

          setTimeout(() => {
            navigateTo("/");
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: "top-right",
          });
        });
    } catch (error) {
      console.log("error while connecting to Full Form api.", error.message);
    }
    console.log(Form);
  };
  return (
    <>
      <NavigationBar />
      <div className="p-10">
        <ToastContainer />

        <div className="w-full h-auto  rounded-[5rem] shadow-2xl bg-gray-500 text-white shadow-sky-800">
          <div className="p-20">
            <div>
              <h1 className="text-start text-[3rem] font-bold">Full Form</h1>
            </div>
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="company"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Company name
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          id="company"
                          name="company"
                          value={Form.company}
                          onChange={handleChange}
                          type="text"
                          //autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="mobile"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Mobile Number
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          id="mobile"
                          name="mobile"
                          value={Form.mobile}
                          onChange={handleChange}
                          type="text"
                          //autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
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
                          value={Form.city}
                          onChange={handleChange}
                          type="text"
                          //autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
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
                          value={Form.language}
                          onChange={handleChange}
                          //autoComplete="Language"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>Select Language</option>
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

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="interested"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Interested In <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="interested"
                          name="interested"
                          value={Form.interested}
                          onChange={handleChange}
                          //autoComplete="Topic"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>Select Topic</option>
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
                  </div>
                  <div className=" flex flex-row gap-3 float-end mt-10">
                    <button
                      onClick={handleOnsubmit}
                      className="bg-gray-800 text-white hover:scale-110 duration-500 shadow-md shadow-black rounded-lg p-2  font-bold"
                    >
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

export default FullForm2;
