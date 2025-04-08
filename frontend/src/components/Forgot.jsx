import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import base_api from "../utility/contants";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
function Forgot() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  const { token } = useParams();
  const [form, setform] = useState({
    password: "",
    confermpassword: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleforgotLink = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const response = await axios
        .post(`${base_api}/forgot`, { email: form.email })
        .then(async (response) => {
          console.log(response.data);
          toast.success(
            "I have sent a link to your emial, Valid for 15 Minutes,Please click on it",
            {
              position: "top-center",
              autoClose: 8000,
            }
          );
          setTimeout(() => {
            navigate("/login");
          }, 8000);
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.response.data, {
            position: "top-center",
            autoClose: 4000,
          });
          setTimeout(() => {
            navigate("/registration");
          }, 4000);
        });
    } catch (error) {
      console.log("error while connecting to forgot api.:", error);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const password = form.password;
    const cpassword = form.confermpassword;
    if (password != cpassword) {
      toast.error("Password and Confirm Password do not matched!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // console.log("password:", form.password, "token:", token);
    try {
      const response = await axios
        .post(`${base_api}/resetpassword`, {
          token: token,
          newpassword: password,
        })
        .then(async (response) => {
          console.log(response.data);
          if (response.data === "Token Epired:jwt expired") {
            toast.error("Your Session has expired. Please try again!", {
              position: "top-center",
              autoClose: 5000,
            });
            setTimeout(() => {
              navigate("/forgot/1");
            }, 5000);
            return;
          }
          toast.success("Your Password has been updated successfully!", {
            position: "top-center",
            autoClose: 5000,
          });
          setTimeout(() => {
            navigate("/login");
          }, 8000);
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Failed to update password. Please try again.", {
            position: "top-center",
            autoClose: 4000,
          });
          setTimeout(() => {
            navigate("/forgot/1");
          }, 8000);
        });
    } catch (error) {
      console.log("error while connecting to forgot api.:", error);
    }
  };

  const handleonchang = (e) => {
    e.preventDefault();

    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <ToastContainer />

      {token === "1" ? (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form
                onSubmit={(e) => {
                  handleforgotLink(e);
                }}
                className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                action="#"
              >
                <div></div>
                <div>
                  <label
                    htmlhtmlfor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Your Email
                  </label>
                  <input
                    type="Email"
                    name="email"
                    value={form.email}
                    onChange={(e) => {
                      handleonchang(e);
                    }}
                    id="email"
                    placeholder="email@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white border-2 bg-green-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send Link On email
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full  p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form
                onSubmit={(e) => {
                  handleReset(e);
                }}
                className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              >
                <div></div>
                <div>
                  <label
                    htmlfor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => {
                      handleonchang(e);
                    }}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlfor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confermpassword"
                    value={form.confermpassword}
                    onChange={(e) => {
                      handleonchang(e);
                    }}
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                {/* <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div> */}
                {/* <div className="ml-3 text-sm">
                  <label
                    htmlfor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div> */}
                {/* </div> */}
                <button
                  type="submit"
                  className="w-full text-white border-2 bg-green-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset passwod
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Forgot;
