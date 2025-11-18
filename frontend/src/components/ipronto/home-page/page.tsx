"use client";
import React, { useEffect, useState } from "react";
import Carousel from "../carousel/index";
import { ApiResponse } from "@/types/events";
import HomeHeaderSection from "./header-section";
import { fetchEvents } from "@/lib/api";
import Loader from "@/components/molecules/loader";
import { buildSearchPayload } from "@/utils/searchPayload";

interface onSearchPayload {
  city?: string;
  searchText?: string;
  categories?: string[];
}

const HomePageComponent = () => {
  const [categories, setCategories] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const payload = buildSearchPayload({});
    fetchEvents(payload)
      .then((data: ApiResponse) => {
        console.log("Fetched events on home page:", data);
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events on home page:", err);
        setError("Failed to load events");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="p-4 text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!categories || Object.keys(categories).length === 0) {
    return <div className="p-4 text-center">No events found</div>;
  }

  return (
    <div>
      <div className="header-section">
        <HomeHeaderSection />
      </div>
      <div className="map-section">{/* <MapSection/> */}</div>
      <div className="categories-data bg-[#f5f5f5]">
        {Object.entries(categories).map(([categoryName, categoryData]: any) => {
          const allItems = categoryData?.searchResult || [];
          const limitedItems = allItems.slice(0, 20);

          if (allItems.length === 0) {
            return null; // Skip empty categories
          }

          return (
            <React.Fragment key={categoryName}>
              <div className="p-2 sm:p-4 sm:mt-6">
                <h2 className="text-2xl font-semibold">
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </h2>
              </div>
              <div>
                <Carousel items={limitedItems} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HomePageComponent;
