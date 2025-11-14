"use client";
import React, { useEffect, useState } from "react";
import Carousel from "../carousel/index";
import { ApiResponse } from "@/types/events";
import HomeHeaderSection from "./header-section";
import MapSection from "./map-section";
import { fetchEvents } from "@/lib/api";

const HomePageCompoenent = () => {
  const [categories, setCategories] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetchEvents()
      .then((data: ApiResponse) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching events on home page:", err);
      });
  });
  return (
    <div>
      <div className="header-section">
        <HomeHeaderSection/>
      </div>
      <div className="map-section">
        {/* <MapSection/> */}
      </div>
   <div className="categories-data bg-[#f5f5f5]">
       {categories &&
        Object.entries(categories).map(([categoryName, categoryData]: any) => (
          <React.Fragment key={categoryName}>
            <div className="p-4 mt-6">
              <h2 className="text-2xl font-semibold">
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </h2>
            </div>
            <div>
              <Carousel items={categoryData.searchResult || []} />
            </div>
          </React.Fragment>
        ))}
   </div>
    </div>
  );
};

export default HomePageCompoenent;
