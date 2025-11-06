import React, { useState } from "react";
import Card from "../../components/user/Card";
import { properties } from "../../assets/dummyData.js";
import Filter from "../../components/user/Filter.jsx";
import { RiEqualizerLine } from "@remixicon/react";

const Home = () => {
  const [drawerStatus, setDrawerStatus] = useState(false);

  return (
    <>
      <div className="m-4">
        <div className="block sm:hidden">
          <button
            className="fixed bottom-3 left-4 right-4 z-97 btn btn-primary text-base font-normal shadow-xl/30 "
            onClick={() => {
              setDrawerStatus(true);
            }}
          >
            <RiEqualizerLine size={18} />
            Filter
          </button>
          <div
            className={`${
              !drawerStatus ? "hidden" : ""
            } fixed bottom-0 right-0 left-0 top-0 z-97`}
          >
            <div
              className=" fixed bottom-0 right-0 left-0 top-0 z-98 w-full bg-[#00000070]  h-100dvh"
              onClick={() => {
                setDrawerStatus(false);
              }}
            ></div>
            <div className="bg-[#e2e7fc]  pb-0 rounded-t-4xl fixed -bottom-3 right-0 left-0 z-99 w-full">
              <div className="flex flex-col items-center w-full max-w-xl mx-auto ">
                <div
                  className="sm:hidden w-full flex justify-center"
                  onClick={() => {
                    setDrawerStatus(false);
                  }}
                >
                  <div className=" h-1.5 w-40 bg-gray-400  m-4  rounded-full opacity-50 "></div>
                </div>
                <Filter />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <Filter />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-8 p-4 w-full max-w-[1440px] mx-auto">
        {properties
          .slice() // makes a copy so the original array isn’t mutated
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
          .map((property) => (
            <Card key={property._id} Property={property} />
          ))}
      </div>
    </>
  );
};

export default Home;
