import React, { useEffect } from "react";
import backgroundImage from "../assets/About Us Cropped.jpg";
export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`, // ✅ Proper string format
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className=" bg-gray-800 h-96  flex justify-center items-center gap-5 px-10 md:px-40"
      ></div>
      <div className=" w-full grid grid-cols-1 text-justify md:grid-cols-2 gap-12 md:gap-48 p-10  md:px-20 items-center">
        <div className="">
          <h1 className="text-xl text-justify font-bold my-10">
            {" "}
            At ScriptHQ (The Head Quarter of Scripts), we believe that every
            great film starts with a powerful script. We are a team of
            passionate and talented professionals committed to discovering,
            nurturing, and delivering exceptional creative content to the global
            entertainment industry.At ScrptHQ, our foundation is built on three
            core principles that define who we are and what we stand for
          </h1>
          <ul className="list-disc  space-y-5">
            <li>
              {" "}
              <strong> Trust-</strong> We provide a secure and transparent
              platform where creators can share their scripts with confidence,
              knowing their intellectual property is highly protected.
            </li>
            <li>
              {" "}
              <strong> Create-</strong> We bring ideas to life by helping
              writers, filmmakers, and artists develop original, compelling, and
              industry-ready content.
            </li>
            <li>
              {" "}
              <strong> Inspire-</strong> We fuel creativity by connecting fresh
              talent with the right opportunities, shaping the future of
              storytelling.
            </li>
          </ul>
        </div>
        <div className="">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150268421.jpg"
            alt="Not found"
            className="rounded-full h-80 w-80"
          />
        </div>
      </div>

      <div className="bg-gray-700 text-white w-full text-justify grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-48 p-10  md:px-20 items-center">
        <div className="">
          <h1 className="text-5xl text-center font-bold my-10">What We Do ?</h1>
          <ul className="space-y-5 text-gray-200">
            <li>
              {" "}
              At ScriptHQ, we specialize in scriptwriting, story development,
              screenplay consultation, dialogue and lyrics writing, concept
              creation, and music composition for films, web series, and shows.
              Whether you are a filmmaker looking for the perfect script or a
              writer seeking the right platform, we bridge the gap between
              creativity and the industry.
            </li>
            <li>
              But we don’t stop at scripts. We are a full-fledged creative
              powerhouse. We collaborate with directors, producers, animators,
              and lyricists to bring stories to life in all formats—from TV
              commercials to promos, vignettes to on-air graphics, television
              shows to documentaries, fiction to non-fiction, special effects,
              compositing, and animation. No matter the medium, we execute every
              project with precision, innovation and impact.
            </li>
          </ul>
        </div>
        <div className="">
          <img
            src="https://www.intlum.com/wp-content/themes/intlum/images/content-banner-image.png"
            className="rounded-lg h-96 w-96"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 text-justify gap-12 md:gap-48 p-10  md:px-20 items-center">
        <div className="">
          <h1 className="text-[3rem] text-center font-bold my-10">
            Why Choose ScriptHQ?
          </h1>
          <ul className=" list-disc  space-y-5 text-gray-600">
            <li>
              {" "}
              <strong>Global Talent Network – </strong> We connect creators from
              all over the world to the right industry professionals.
            </li>
            <li>
              {" "}
              <strong>End-to-End Production -</strong> From concept to
              execution, we offer a one-stop solution for Story telling in all
              formats.
            </li>
            <li>
              {" "}
              <strong className="">Industry-Ready Content –</strong> Every
              script is curates, polished and tailored to meet industry
              standards.
            </li>
            <li>
              {" "}
              <strong>Confidential & Secure – </strong>Protecting your
              intellectual property is our top priority.
            </li>
            <li>
              {" "}
              <strong>Creative & Strategic Approach -</strong>We don’t just
              write; we craft stories that leave an impact.
            </li>
            <li>
              {" "}
              At ScriptHQ, we are more than a platform—we are a movement that
              empowers creators and transforms ideas into masterpieces.
            </li>
          </ul>
        </div>
        <div className="">
          <img
            src="https://ebizfiling.com/wp-content/uploads/2022/05/Header-image-1-Content-writing.png"
            className="rounded-lg h-96 w-96"
          />
        </div>
      </div>
      <div className="bg-white text-center text-2xl font-bold tracking-wider my-10">
        Join us in shaping the future of storytelling.
      </div>
    </div>
  );
}
