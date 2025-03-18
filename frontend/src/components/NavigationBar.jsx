import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { use, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { MyContext } from "../Context/context";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationBar() {
  const { User, setUser, allcategory, setallcategory } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("project");
    setUser({
      _id: "",
      fullname: "",
      mobileNumber: "",
      email: "",
      password: "",
    });
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async () => {
      const token = localStorage.getItem("project"); // or any auth logic
      // if (!token) {
      //   setIsAuthorized(false);
      //   return;
      // }
      console.log(token);
      try {
        await axios
          .post(
            // "https://intern-backend-49ou.onrender.com/user/validate-token",
            // "https://intern-backend-49ou.onrender.com/validate-token",
            `${base_api}/validate-token`,
            { token: `${token}` },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            console.log("User from proted route:", res.data);
            setUser(res.data);
          })
          .catch((res) => {
            console.log("User from proted route catched:", res);
          });
      } catch (error) {
        console.log("error while connecting to token api.");
      }
    };
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
            <div className="hidden  sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  className={
                    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                  to={"/"}
                >
                  <h1>Home</h1>
                </Link>
                <div
                  className={
                    "bg-gray-600 text-white rounded-md  text-sm font-medium"
                  }
                >
                  <div className=" grid grid-cols-1">
                    <div className="relative">
                      <button
                        onClick={() => {
                          setDropdownOpen(!dropdownOpen);
                          setallcategory("all");
                          navigate("/category");

                          // navigate("/services");
                          // console.log("hello");
                        }}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                        className="bg-gray-600 px-4 py-2 rounded transition"
                      >
                        All Category
                      </button>

                      {dropdownOpen && (
                        <ul
                          onMouseEnter={() => setDropdownOpen(true)}
                          onMouseLeave={() => setDropdownOpen(false)}
                          className="absolute bg-white text-black right-0 w-48 rounded shadow-lg"
                        >
                          <li
                            onClick={() => {
                              console.log(allcategory);
                              navigate("/category");
                              setallcategory("Short Story");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            <Link to={"/category"}>
                              <div className="w-full">Short Story</div>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Story");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            {" "}
                            <Link to={"/category"}>
                              <button>Story</button>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Full Script");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            <Link to={"/category"}>
                              <button>Full Script</button>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Lyrics");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            {" "}
                            <Link to={"/category"}>
                              <button>Lyrics</button>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Poem");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            <Link to={"/category"}>
                              <button>Poem</button>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Theme");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            {" "}
                            <Link to={"/category"}>
                              <button>Theme</button>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Music");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            <Link to={"/category"}>
                              <button>Music</button>
                            </Link>
                          </li>
                          <li
                            onClick={() => {
                              setallcategory("Other");
                              navigate("/category");
                            }}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            {" "}
                            <Link to={"/category"}>
                              <button>Other...</button>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  to={"/about"}
                  className={
                    "bg-gray-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  About
                </Link>
                <Link
                  to={"/services"}
                  className={
                    "bg-gray-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Services
                </Link>
                <Link
                  to={"/"}
                  className={
                    "bg-gray-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Portfolio
                </Link>
                <Link
                  to={"/contact"}
                  className={
                    "bg-gray-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          {User._id === "" ? (
            <div className="absolute  inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to={"/login"} className=" text-white p-2 sm:p-3 rounded-xl">
                {" "}
                Sign-in
              </Link>
              <Link
                to={"/registration"}
                className="bg-gray-900 hover:bg-gray-950 text-white p-2 sm:p-3 rounded-xl"
              >
                {" "}
                Sign-up
              </Link>
            </div>
          ) : (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <span className=" border-2 border-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>{" "}
                  </span>
                </MenuButton>
              </div>
              <MenuItems
                // transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link
                    to={"/"}
                    onClick={() => handleLogout()}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <div className="flex flex-col space-x-4">
            <Link
              className={
                "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              }
              to={"/"}
            >
              <h1>Home</h1>
            </Link>
            <div
              // to={"/"}
              className={" text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setallcategory("all");
                    navigate("/category");

                    // navigate("/services");
                    // console.log("hello");
                  }}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="bg-gray-600 px-4 py-2 rounded transition"
                >
                  All Category
                </button>

                {dropdownOpen && (
                  <ul
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute bg-white text-black w-48 rounded shadow-lg"
                  >
                    <li
                      onClick={() => {
                        console.log(allcategory);
                        navigate("/category");
                        setallcategory("Short Story");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      <Link to={"/category"}>
                        <div className="w-full">Short Story</div>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Story");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      {" "}
                      <Link to={"/category"}>
                        <button>Story</button>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Full Script");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      <Link to={"/category"}>
                        <button>Full Script</button>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Lyrics");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      {" "}
                      <Link to={"/category"}>
                        <button>Lyrics</button>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Poem");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      <Link to={"/category"}>
                        <button>Poem</button>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Theme");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      {" "}
                      <Link to={"/category"}>
                        <button>Theme</button>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Music");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      <Link to={"/category"}>
                        <button>Music</button>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setallcategory("Other");
                        navigate("/category");
                      }}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      {" "}
                      <Link to={"/category"}>
                        <button>Other...</button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <Link
              to={"/about"}
              className={" text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              About
            </Link>
            <Link
              to={"/services"}
              className={" text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              Services
            </Link>
            <Link
              to={"/"}
              className={" text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              Portfolio
            </Link>
            <Link
              to={"/contact"}
              className={" text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              Contact
            </Link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
