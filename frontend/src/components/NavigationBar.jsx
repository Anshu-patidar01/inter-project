import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            "https://intern-backend-49ou.onrender.com/validate-token",
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

  const people = [
    {
      id: 0,
      name: "All Category",
    },
    {
      id: 1,
      name: "Short Story",
    },
    {
      id: 2,
      name: "Story",
    },
    {
      id: 3,
      name: "Lyrics",
    },
    {
      id: 4,
      name: "Poem",
    },
    {
      id: 5,
      name: "Theme",
    },
    {
      id: 6,
      name: "Music",
    },
    {
      id: 7,
      name: "Other...",
    },
  ];

  const [selected, setSelected] = useState(people[0]);

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
                <Link
                  className={
                    "bg-gray-600 text-white rounded-md text-sm font-medium px-1"
                  }
                >
                  <Listbox
                    value={selected}
                    onChange={(e) => {
                      setSelected(e);
                      setallcategory(e);
                      if (e.name == allcategory.name) {
                        setSelected(allcategory);
                      }
                      const name = e.name;
                      if (name === "All Category") {
                        window.location.href = "/";
                      } else {
                        window.location.href = "/category";
                        console.log("hello");
                      }
                    }}
                    // console.log(selected.name);
                    // }}
                  >
                    <div className="relative ">
                      <ListboxButton className="grid w-full p-1 cursor-default grid-cols-1 rounded-md bg-gray-600 text-left text-white  sm:text-sm/6">
                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                          <span className="block truncate">
                            {selected.name}
                          </span>
                        </span>
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute w-40 z-10 mt-1 max-h-56  overflow-auto rounded-md bg-gray-700 text-white py-1 text-base outline-none focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {people.map((person) => (
                          <ListboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none  text-white data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            <div className="flex items-center">
                              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {person.name}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                              <CheckIcon
                                aria-hidden="true"
                                className="size-5"
                              />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </Link>
                <Link
                  to={"/"}
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
                  to={"/"}
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-user"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>{" "}
                  </span>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => handleLogout()}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </a>
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
            <Link
              to={"/"}
              className={" text-white rounded-md px-3 py-2 text-sm font-medium"}
            >
              All Category
            </Link>
            <Link
              to={"/"}
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
              to={"/"}
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
