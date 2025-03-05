import axios from "axios";
import React, { useContext, useState } from "react";
import base_api from "../../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { MyContext } from "../../Context/context";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const navigateto = useNavigate();
  const [form, setform] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { User } = useContext(MyContext);
  const handleonchange = (e) => {
    e.preventDefault();

    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmited = async (e) => {
    e.preventDefault();
    console.log(User.user);
    if (!User.user == "") {
      console.log(form);
      await axios
        .post(`${base_api}/sendMail`, {
          from1: User.user.email,
          reasone: "I wanna contact you",
          to: "xyz@gmail.com",
          name: form.name,
          subject: form.subject,
          message: form.message,
        })
        .then((res) => {
          console.log(res);
          toast.success("Email Sent.", {
            position: "top-center",
          });
        })
        .catch((res) => {
          console.log(res);
          toast.error("Please Try again After some time.", {
            position: "top-center",
          });
        });
    } else {
      navigateto("/login");
    }
  };
  return (
    <div>
      <ToastContainer />
      <section className="bg-white ">
        <div
          className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md
        "
        >
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
            Send Us A Message!
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl"></p>
          <form onSubmit={handleSubmited} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleonchange}
                value={form.name}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                placeholder="Full Name"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleonchange}
                value={form.email}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                placeholder="name@flowbite.com"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                onChange={handleonchange}
                value={form.subject}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Let us know how we can help you"
                required
              ></input>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                onChange={handleonchange}
                value={form.message}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              // onClick={(e) => handleSubmited(e)}
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white bg-gray-800 border-[2px] border-gray-400 rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
