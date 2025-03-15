import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { MyContext } from "../Context/context.jsx";
import base_api from "../utility/contants.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const { User, setUser } = useContext(MyContext);
  const [Toggele, setToggele] = useState(true);
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const handleChange = (e) => {
    // e.pre
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggele(false);
    const value = form.email;
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) &&
      !/^[6-9]\d{9}$/.test(value)
    ) {
      seterror("Invalid Mobile no. or Email address.");
      return "";
    } else {
      seterror("");
    }
    console.log(form);
    // await axios.post("https://inter-project-lnf5.onrender.com/login")
    await axios
      .post(`${base_api}/login`, form, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setform({
          email: "",
          password: "",
        });
        const token = response.data.token;

        localStorage.setItem("project", token);
        toast.success("Sign-in Succefully.", {
          position: "top-center",
        });
        setUser(response.data);
        setToggele(true);
        setTimeout(() => {
          navigate("/services");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response.data.Error);
        toast.error(error.response.data.Error, {
          position: "top-center",
        });
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <ToastContainer />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email Address or Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full shadow-md shadow-gray-500  focus:shadow-xl focus:outline-none transition-shadow duration-500 rounded-md bg-sky-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {error && <p className="text-red-600">{error}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
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
                  className="block w-full shadow-md shadow-gray-500  focus:shadow-xl focus:outline-none transition-shadow duration-500 rounded-md bg-sky-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {Toggele && <span>Sign in</span>}
                {!Toggele && <span>Loading..</span>}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to={"/registration"}
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create new Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
