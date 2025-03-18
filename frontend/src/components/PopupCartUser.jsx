import { useContext, useState } from "react";
import { MyContext } from "../Context/context";

export default function PopupCartUser(props) {
  const { pop, setpop } = useContext(MyContext);
  // console.log(pop);
  return (
    <div className={`relative  z-10 ${pop === "true" ? "block" : "hidden"}`}>
      <div
        // transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            // transition
            className="relative transform p-2 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div
              onClick={() => {
                setpop("false");
              }}
              className=" hover:bg-gray-200 p-2 cursor-pointer rounded-lg float-end"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </span>
            </div>
            <div className="w-full  flex flex-col gap-3 ">
              <span className="text-xl font-semibold">Summary:</span>
              {props.summary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
