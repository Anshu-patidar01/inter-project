import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import base_api from "../../utility/contants";
export default function IdiaFrom() {
  const [Copyright, setCopyright] = useState("");
  const [CheckBox, setCheckBox] = useState(false);
  const navigateTo = useNavigate();
  const handleCheckBoxChange = (e) => {
    // e.preventDefault();

    if (CheckBox === false) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  };
  const handleCopyrightChange = (e) => {
    // e.preventDefault();

    setCopyright(e.target.value);
  };
  const [SummeryWords, setSummeryWords] = useState("");
  const [test, settest] = useState("");
  const [Form, setForm] = useState({
    state: "",
    correspondingAddress: "",
    city: "",
    gender: "",
    title: "",
    language: "",
    categories: "",
    containt: "",
    copyright: "",
    ROCNumber: "",
    ROCAttachment: "",
    summary: "",
    termAndCondition: "",
  });
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    console.log(Form);
    try {
      const token = localStorage.getItem("project");
      if (!token) {
        toast.error("Token not provided.", {
          position: "top-right",
        });
        navigateTo("/");
      }
      const response = await axios
        .post(`${base_api}/form/IdiaForm`, Form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setForm({
            state: "",
            correspondingAddress: "",
            city: "",
            gender: "",
            title: "",
            language: "",
            categories: "",
            containt: "",
            copyright: "",
            ROCNumber: "",
            ROCAttachment: "",
            summary: "",
            termAndCondition: "",
          });
          console.log(response);
          toast.success("Thankyou for submitting your creativity.", {
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
      console.log("error while connecting to Idea Form api.");
    }
  };
  const handleChange = (e) => {
    // e.preventDefault();

    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSummeruChange = (e) => {
    e.preventDefault();

    const words = e.target.value.trim().split(/\s+/);
    settest(words.length);
    if (words.length < 200) {
      setSummeryWords(e.target.value);
      setForm({
        ...Form,
        [e.target.name]: e.target.value,
      });
    } else {
      toast.error("Max words limit is 200 only..", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="py-5 px-5 md:px-20 md:py-10">
      <ToastContainer />

      <div className="w-full h-auto rounded-lg  md:rounded-[5rem] shadow-2xl bg-gray-800 text-white shadow-sky-800">
        <div className="p-3 md:p-20">
          <div className="flex flex-row gap-4 items-center justify-center mb-6">
            <h2 className="text-[3rem] p-1 text-center font-extrabold tracking-wider text-gray-200">
              Submit an Idea
            </h2>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 mt-3"
            >
              <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
              <path
                fillRule="evenodd"
                d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <form onSubmit={handleOnsubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* state */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="country"
                        required
                        name="state"
                        value={Form.state}
                        onChange={handleChange}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>Select State</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chhattisgarh</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Madhya Pradesh</option>
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Odisha</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>West Bengal</option>
                        <option>Other...</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>

                  {/* for address */}
                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      Corresponding Address
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="street"
                        name="correspondingAddress"
                        value={Form.correspondingAddress}
                        onChange={handleChange}
                        type="text"
                        //autoComplete="street-address"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      City<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="city"
                        name="city"
                        value={Form.city}
                        onChange={handleChange}
                        type="text"
                        //autoComplete="address-level2"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      ZIP / Postal code <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        //autoComplete="postal-code"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4 flex flex-row gap-2">
                    <div className="mr-3">
                      Gender<span className="text-red-500">*</span>
                    </div>

                    <div className="flex items-center gap-x-3">
                      <input
                        required
                        id="Male"
                        name="gender"
                        value={"Male"}
                        onChange={handleChange}
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="Male"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        required
                        id="FeMale"
                        name="gender"
                        value={"Female"}
                        onChange={handleChange}
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="Female"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Female
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        required
                        id="FeMale"
                        name="gender"
                        value={"Female"}
                        onChange={handleChange}
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="Female"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-full">
                    <label
                      htmlFor="Title"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      Title <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="Title"
                        name="title"
                        value={Form.title}
                        onChange={handleChange}
                        type="text"
                        //autoComplete="given-name"
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
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Kannada</option>
                        <option>Malayalam</option>
                        <option>Marathi</option>
                        <option>Punjabi</option>
                        <option>Tamil</option>
                        <option>Telugu</option>
                        <option>Urdu</option>
                        <option>Other...</option>
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
                        value={Form.containt}
                        onChange={handleChange}
                        //autoComplete="Topic"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>Select Content</option>
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
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Categories"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="Categories"
                        name="categories"
                        value={Form.categories}
                        onChange={handleChange}
                        //autoComplete="Topic"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>Select Category</option>
                        <option>Short Story</option>
                        <option>Story</option>
                        <option>Full Script</option>
                        <option>Lyrics</option>
                        <option>Poem</option>
                        <option>Theme</option>
                        <option>Music</option>
                        <option>Other...</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                  {/* copyright */}
                  <div className="sm:col-span-4 flex flex-row gap-2">
                    <div className="text-sm/6 font-semibold text-gray-100">
                      You have a Copyright{" "}
                      <span className="text-red-500">*</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        required
                        id="yes"
                        value="yes"
                        onChange={(e) => {
                          handleCopyrightChange(e);
                          handleChange(e);
                        }}
                        checked={Copyright === "yes"}
                        name="copyright"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="yes"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        required
                        id="No"
                        name="copyright"
                        value="no"
                        onChange={(e) => {
                          handleCopyrightChange(e);
                          handleChange(e);
                        }}
                        checked={Copyright === "no"}
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="No"
                        className="block text-sm/6 font-medium text-gray-100"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div
                    className={`sm:col-span-3 ${
                      Copyright === "yes" ? "block" : "hidden"
                    } `}
                  >
                    <label
                      htmlFor="ROCNumber"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      ROC Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="ROCNumber"
                        name="ROCNumber"
                        value={Form.ROCNumber}
                        onChange={handleChange}
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div
                    className={`sm:col-span-full ${
                      Copyright === "yes" ? "block" : "hidden"
                    }`}
                  >
                    <div className="mt-2 flex justify-center bg-gray-400 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center ">
                        <PhotoIcon
                          aria-hidden="true"
                          className="mx-auto size-12 text-gray-700"
                        />
                        <div className="mt-4 flex text-sm/6 text-gray-800">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md p-1 bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                          >
                            <span>Attachment</span>
                            <input
                              id="file-upload"
                              name="ROCAttachment"
                              value={Form.ROCAttachment}
                              onChange={handleChange}
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-100">
                          Containt up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-full">
                    <div className="flex flex-row justify-between">
                      <label
                        htmlFor="Summary"
                        className="block text-sm font-medium text-gray-100"
                      >
                        Summary <span className="text-red-500">*</span>
                      </label>
                      <div>{test}/200</div>
                    </div>

                    <textarea
                      id="Summary"
                      className="min-h-[150px] p-2 w-full border border-gray-300 rounded-md bg-white text-black "
                      // contentEditable="true"
                      // value={Form.summary}
                      name="summary"
                      value={SummeryWords}
                      onChange={(e) => {
                        handleSummeruChange(e);
                      }}
                      rows="4"
                      cols="50"
                    ></textarea>
                  </div>

                  <div className="sm:col-span-full flex flex-row items-center">
                    <input
                      required
                      type="checkbox"
                      id="term"
                      name="termAndCondition"
                      onClick={handleCheckBoxChange}
                      value={"Accepted"}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="w-4 h-4 mr-2"
                    />
                    <label
                      htmlFor="term"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      For copyright form term and condition{" "}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link
                to={"/"}
                type="button"
                className="text-sm/6 font-semibold text-gray-100"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
