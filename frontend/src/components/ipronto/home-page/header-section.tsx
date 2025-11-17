import React from "react";
import SearchBarSection from "./search-section";
import CategoriesLabel from "./categories-label";

type Props = {};

const HomeHeaderSection = (props: Props) => {
  return (
    <div className="px-4 py-6">
      <div className="title-section text-center">
        <p className="text-xl font-black py-1">
          Book Leisure & Entertainment Experience
        </p>
        <p className="text-sm">
          <span className="text-black font-bold">8,902</span> Exciting
          Destinations.<span className="text-black font-bold">173,890</span>{" "}
          Leisure & Entertainment Experiences
        </p>
      </div>
      <div className="search-bar-section">
        <SearchBarSection />
      </div>
      <div className="categories-label">
        <CategoriesLabel />
      </div>
    </div>
  );
};

export default HomeHeaderSection;
