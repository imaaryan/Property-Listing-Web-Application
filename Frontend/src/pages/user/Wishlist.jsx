import React, { useEffect, useState, useContext } from "react";
import Card from "../../components/user/Card";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { RiHeart3Line } from "@remixicon/react";

const Wishlist = () => {
  const { backendUrl } = useContext(AppContext);
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const stored = localStorage.getItem("likedProperties");
        const likedIds = stored ? JSON.parse(stored) : [];

        if (likedIds.length === 0) {
          setWishlistProperties([]);
          setLoading(false);
          return;
        }

        // Fetch each property details
        // Note: Ideally backend should support bulk fetch by IDs to optimize this.
        const requests = likedIds.map((id) =>
          axios.get(`${backendUrl}/properties/get/${id}`)
        );

        const responses = await Promise.allSettled(requests);

        const properties = responses
          .filter((res) => res.status === "fulfilled" && res.value.data.success)
          .map((res) => res.value.data.data);

        setWishlistProperties(properties);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [backendUrl]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4 min-h-[60vh]">
      <div className="bg-[#e2e7fc] py-8 mb-6 rounded-xl">
        <h1 className="text-2xl font-medium text-primary flex justify-center items-center gap-2">
          {/* <RiHeart3Line className="text-primary" size={26} /> */}
          Wishlisted Properties
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : wishlistProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <RiHeart3Line size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mt-2">
            Start saving your favorite properties to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProperties.map((property) => (
            <Card key={property._id} Property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
