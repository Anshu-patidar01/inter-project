import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import base_api from "../../utility/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { MyContext } from "../../Context/context";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  const [ToggleLoading, setToggleLoading] = useState(false);
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
    setToggleLoading(true);
    console.log(User.user);

    if (!User.user == "") {
      console.log(form);
      await axios
        .post(`${base_api}/sendMail`, {
          from1: User.user.email,
          reasone: "I wanna contact you",
          to: "Officialscripthq@gmail.com",
          contact: User.user.mobileNumber,
          name: form.name,
          subject: form.subject,
          message: form.message,
        })
        .then((res) => {
          console.log(res);
          toast.success("Email Sent.", {
            position: "top-center",
          });
          setToggleLoading(false);
          setTimeout(() => {
            navigateto("/");
          }, 2000);
        })
        .catch((res) => {
          console.log(res);
          toast.error("Please Try again After some time.", {
            position: "top-center",
          });
        });
    } else {
      console.log(form);
      await axios
        .post(`${base_api}/sendMail`, {
          from1: form.email,
          reasone: "I wanna contact you",
          to: "Officialscripthq@gmail.com",
          contact: "Unavailable,Not Registered.",
          name: form.name,
          subject: form.subject,
          message: form.message,
        })
        .then((res) => {
          console.log(res);
          toast.success("Email Sent.Thank You for contacting us.", {
            position: "top-center",
          });
          setToggleLoading(false);
          setTimeout(() => {
            navigateto("/");
          }, 2000);
        })
        .catch((res) => {
          console.log(res);
          toast.error("Please Try again After some time.", {
            position: "top-center",
          });
        });
    }
  };
  const [test, settest] = useState("");
  const [SummeryWords, setSummeryWords] = useState("");
  const handleSummeruChange = (e) => {
    e.preventDefault();

    const words = e.target.value.trim().split(/\s+/);
    settest(words.length);
    if (words.length < 100) {
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
    <div>
      <ToastContainer />
      <div className="flex sm:flex-row justify-center items-center flex-col flex-wrap bg-gray-600 py-10">
        <section className=" sm:w-7/12 rounded-r-full sm:pl-5 ">
          <div
            className="py-8 lg:py-16 px-4 sm:mr-20 sm:w-[90%] rounded-xl  bg-white/50  mx-auto max-w-screen-md
        "
          >
            <h2 className=" text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
              Send Us A Message!
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl"></p>
            <form onSubmit={handleSubmited} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleonchange}
                  value={form.name}
                  className="shadow-sm bg-gray-50/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  placeholder="Full Name"
                  required
                ></input>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleonchange}
                  value={form.email}
                  className="shadow-sm bg-gray-50/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  placeholder="name@flowbite.com"
                  required
                ></input>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Subject<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  onChange={handleonchange}
                  value={form.subject}
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50/50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Let us know how we can help you"
                  required
                ></input>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="flex flex-row justify-between mb-2 text-sm font-medium text-gray-900"
                >
                  <span>
                    Your Message<span className="text-red-600">*</span>
                  </span>
                  <span>{test}/100</span>
                </label>
                <textarea
                  id="message"
                  rows="6"
                  name="message"
                  onChange={(e) => handleSummeruChange(e)}
                  value={SummeryWords}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50/50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                // onClick={(e) => handleSubmited(e)}
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-white bg-gray-800 border-[2px] border-gray-400 rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {!ToggleLoading && <span>Send Message</span>}
                {ToggleLoading && <span>Sending Message...</span>}
              </button>
            </form>
          </div>
        </section>
        <section className="sm:w-5/12 w-full py-32 md:p-3 flex flex-col mt-16 justify-center md:rounded-l-3xl bg-slate-400/50 text-white gap-10 sm:p-5">
          <div className="text-center md:ml-10 text-3xl md:text-5xl text-white font-bold tracking-widest">
            Contact Us
          </div>

          {/* <div className=" absolute hidden sm:block bg-white/15 ml-2 sm:ml-8 rounded-l-xl w-[25rem] sm:w-[29rem] h-full"></div> */}
          <div className=" flex md:ml-10 flex-row items-center gap-5 text-xl">
            <span className="hover:scale-125 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone-call"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                <path d="M14.05 6A5 5 0 0 1 18 10" />
              </svg>
            </span>
            <span>+91 9243002430</span>
          </div>
          <div className=" flex md:ml-10 flex-row items-center gap-5 text-xl">
            <span className="hover:scale-125 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-check"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="m16 19 2 2 4-4" />
              </svg>
            </span>
            <span>
              <div>Info@scripthq.in</div>
              <div className="mt-2">officialscripthq@gmail.com</div>
            </span>
          </div>
          <div className="flex md:ml-10 flex-row items-center gap-5 text-xl">
            <span className="hover:scale-125 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span>195-A, Ground Floor Mahalaxmi Nagar, Indore (M.P.)</span>
          </div>
          <div className="flex flex-row justify-center items-center">
            {/* <div className="flex flex-row gap-5 text-center items-center">
              <a
                target="_blank"
                href="https://x.com/Scripthq0"
                className="border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg "
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </div>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/scripthqofficial/?utm_source=qr&igsh=bXd1aDdzd25ibWFy"
                className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/share/1CZj6tandM/"
                className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
              </a>
              <a
                target="_blank"
                href="https://youtube.com/@scripthqofficial?si=UXrt-JLsb2s_un9y"
                className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
              >
                <div href="https://youtube.com/@scripthqofficial?si=UXrt-JLsb2s_un9y">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </div>
              </a>
              <a
                target="_blank"
                href="https://www.threads.net/@scripthq_official"
                className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
              >
                <div href="https://www.threads.net/@scripthq_official">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-at-sign"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                  </svg>
                </div>
              </a>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
