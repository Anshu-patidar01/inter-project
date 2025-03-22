import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AdminContext } from "../../Context/AdminContex";

export default function PopUpCard() {
  const { Pop, setPop } = useContext(AdminContext);
  const { IdeaForm } = useContext(AdminContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <div className={`relative  z-10 ${Pop === "true" ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform p-2 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div
              onClick={() => {
                setPop("false");
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
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">formId: </h1>
                <h2>{IdeaForm.formId}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">User Name: </h1>
                <h2>{IdeaForm.userId.fullname}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Title: </h1>
                <h2>{IdeaForm.title}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Category: </h1>
                <h2>{IdeaForm.categories}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Containt: </h1>
                <h2>{IdeaForm.containt}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Language: </h1>
                <h2>{IdeaForm.language}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Gender: </h1>
                <h2>{IdeaForm.language}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Term and Condition: </h1>
                <h2>{IdeaForm.termAndCondition}</h2>
              </div>

              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Likes: </h1>
                <h2>{IdeaForm.likes.length}</h2>
                <img
                  src="https://png.pngtree.com/png-clipart/20221213/ourmid/pngtree-red-glossy-heart-sticker-png-image_6522010.png"
                  alt=""
                  className="h-7 w-7"
                />
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Summary: </h1>
                <h2>{IdeaForm.summary}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Status: </h1>
                <h2>{IdeaForm.status}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Sold: </h1>
                <h2>{IdeaForm.sold}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">On Request: </h1>
                <h2>{IdeaForm.requestedByformId}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Copyright: </h1>
                <h2>{IdeaForm.copyright}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">ROCNumber: </h1>
                <h2>{IdeaForm.ROCNumber}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">ROCAttachment: </h1>
                <h2>{IdeaForm.ROCAttachment}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className=" font-bold text-base">Address: </h1>
                <h2>
                  {IdeaForm.correspondingAddress +
                    " " +
                    IdeaForm.city +
                    " " +
                    IdeaForm.state}
                </h2>
              </div>
            </div>
            {/* <div className="text-center">
              <button className="bg-green-700 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg mr-2">
                Approve
              </button>
              <button className="bg-red-800 p-1 px-3 hover:scale-110 cursor-pointer duration-300 text-white rounded-lg">
                Reject
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
