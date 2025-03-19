import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { MyContext } from "../Context/context";
import base_api from "../utility/contants";
export default function RegisterationPage() {
  const navigate = useNavigate();
  const { setUser, User } = useContext(MyContext);
  const [Toggeload, setToggeload] = useState(true);
  const [form, setform] = useState({
    fullname: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  // const navigate = useNavigate();

  //handle input change
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //handle from submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggeload(false);
    const value = form.mobileNumber;
    if (!/^[6-9]\d{9}$/.test(value)) {
      seterror("Invalid mobile number.");
      return "";
    } else {
      seterror("");
    }
    try {
      const response = await axios
        .post(`${base_api}/register`, form, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (response) => {
          setform({
            fullname: "",
            mobileNumber: "",
            email: "",
            password: "",
          });
          setUser(response.data);
          console.log(response.data);

          setToggeload(true);
          toast.success("Registered Successfully!", {
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((error) => {
          const response = {
            message: error.response.data.message,
            error: error.response.data.Error,
          };
          console.log(response.error);
          toast.error(response.error, {
            position: "top-center",
            autoClose: 8000,
          });
        });
    } catch (error) {
      console.log("error while connecting to registering api.");
    }
  };

  return (
    <>
      <div className="">
        <ToastContainer />

        <div className=" flex flow-row  items-center justify-center gap-3 w-full h-8 text-center text-red-600/80 bg-green-100/75">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-notebook-pen"
          >
            <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          </svg>
          <h1>
            If you already have an account{" "}
            <Link to={"/login"} className=" font-bold cursor-pointer">
              Click here
            </Link>
          </h1>
        </div>
        <div className="flex flex-1 flex-col justify-center w-auto h-auto p-5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10  text-center text-2xl font-extrabold tracking-wider text-gray-700">
              Sign-up Form
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Enter your Full Name"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    required
                    autoComplete="first-name"
                    className="block w-full shadow-md shadow-gray-500  focus:shadow-xl focus:outline-none transition-shadow duration-500 rounded-md bg-sky-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="mobilenumber"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Mobile Number<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    type="text"
                    required
                    autoComplete="mobile-number"
                    className="block w-full rounded-md shadow-md shadow-gray-500 focus:shadow-xl focus:outline-none transition-shadow duration-500 bg-sky-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {error && <p className="text-red-600">{error}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email Address<span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md shadow-md shadow-gray-500 focus:shadow-xl focus:outline-none transition-shadow duration-500 bg-sky-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Create Password<span className="text-red-600">*</span>
                  </label>
                  <div className="text-sm">
                    <Link
                      to={"/forgot/1"}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md shadow-md shadow-gray-500 focus:shadow-xl focus:outline-none transition-shadow duration-500 bg-sky-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <span className="text-gray-50 text-base">
                  {" "}
                  Use at least 8 characters, including uppercase, lowercase, a
                  number, and a special character.
                </span>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-1 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {Toggeload && <span>sign-up</span>}
                  {!Toggeload && <span>Loading...</span>}
                </button>
              </div>
            </form>
            <p className="text-[1rem] text-center">
              Already have a Account{" "}
              <Link to={"/login"} className="text-blue-800 cursor-pointer">
                {" "}
                click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
