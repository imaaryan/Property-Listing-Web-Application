import React from "react";
import Card from "../../components/user/Card";
import { propertyToBuy } from "../../assets/dummyData.js";
import Filter from "../../components/user/Filter.jsx";

const Home = () => {
  return (
    <>
      <div className="m-4  ">
        <Filter />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-8 p-4 w-full max-w-[1440px] mx-auto">
        {propertyToBuy.map((property) => (
          <Card key={property._id} Property={property} />
        ))}
      </div>
    </>
  );
};

export default Home;
