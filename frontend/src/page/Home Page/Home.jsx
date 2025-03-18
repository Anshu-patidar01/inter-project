import React from "react";
import AllCards from "../../components/AllCards";
import homeimg from "../../assets/Home_Page_image[1].jpg";
function Home() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <div
            className=" h-[90vh] sm:h-[70vh] md:min-h-screen w-full flex items-center justify-center relative"
            style={{
              backgroundImage: `url("${homeimg}")`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className=" absolute w-[90%] sm:w-[60%] space-y-5  p-2 rounded-full ">
              <h1 className="text-6xl font-extrabold text-center tracking-wide text-white">
                Welcome To ScriptHQ
              </h1>
              <p className="text-gray-100 text-center sm:text-justify bg-black/30 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                harum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aut commodi facere totam rerum ut, hic amet, repudiandae vitae
                atque perferendis dicta assumenda autem. Debitis eveniet
                reiciendis saepe delectus ipsa voluptas!
              </p>
              <div className=" bg-black bg-opacity-70 p-4 flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap rounded-lg">
                <div className="flex flex-col  items-center">
                  <label className="text-white text-sm font-semibold mb-1">
                    Language
                  </label>
                  <select className="block  p-2 border rounded-lg max-w-xs">
                    <option value="">Select Language</option>
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
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-white text-sm font-semibold mb-1">
                    Category
                  </label>
                  <select className="block  p-2 border rounded-lg">
                    <option value="">Select Category</option>
                    <option>Short Story</option>
                    <option>Story</option>
                    <option>Full Script</option>
                    <option>Lyrics</option>
                    <option>Poem</option>
                    <option>Theme</option>
                    <option>Music</option>
                    <option>Other...</option>
                  </select>
                </div>

                <div className="flex flex-col items-center">
                  <label className="text-white text-sm font-semibold mb-1">
                    Content
                  </label>
                  <select className="block  p-2 border rounded-lg">
                    <option value="">Select Content</option>
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
                </div>

                <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition mt-4">
                  Let's Begin
                </button>
              </div>
            </div>
          </div>

          {/* <img
            src={homeimg}
            alt="Not Found"
            className="w-full h-[50vh] md:h-auto object-cover object-top  md:object-center"
          /> */}
        </div>
        <div className="w-full h-10 rounded-b-xl  bg-slate-800 shadow-xl shadow-black mb-10"></div>
        <div className="p-4">
          <AllCards state="true" />
        </div>
      </div>
    </div>
  );
}

export default Home;
