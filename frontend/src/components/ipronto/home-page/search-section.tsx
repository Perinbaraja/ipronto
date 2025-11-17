import { url } from "inspector";
import React from "react";

type Props = {};

const SearchBarSection = (props: Props) => {
  return (
    <div className="px-4 py-6">
      <form
        action=""
        className="flex flex-col lg:flex-row gap-4 justify-center"
      >
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-8 items-center justify-center">
          <input
            type="text"
            placeholder="Event name, Perfomer, Destinations, Tags"
            className="text-[16px] h-11 border outline-none border-[#efefef] rounded-md min-w-[350px] md:min-w-[360px] lg:min-w-[400px] pt-2 pr-5 pb-[10px] pl-[52px]"
            style={{
              background: "#f3f8ff",
              backgroundImage:
                "url('https://dev.ipronto.com/search.39aa221a7d2a740b4b09.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "15px center",
              paddingLeft: "45px",
            }}
          />

          <input
            type="text"
            placeholder="City, State, Zip Code, Country"
            className="text-[16px] h-11 border outline-none border-[#efefef] rounded-md min-w-[350px] md:min-w-[360px] lg:min-w-[400px] pt-2 pr-5 pb-[10px] pl-[52px]"
            style={{
              background: "#f3f8ff",
              backgroundImage:
                "url('https://dev.ipronto.com/search.39aa221a7d2a740b4b09.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "15px center",
              paddingLeft: "45px",
            }}
          />
        </div>
        <div className="flex gap-4 justify-center items-center sm:justify-items-start sm:items-start">
          <button className="bg-[#ffc813] border border-[#ffc813] w-[150px] h-[45px] rounded-md text-[18px] font-medium text-black hover:bg-black hover:text-white hover:border-black cursor-pointer">
            Search
          </button>
          <button className="flex justify-center items-center gap-2 w-[150px] h-[45px] rounded-md text-[18px] font-medium border border-[#ffc813] bg-[#ffc813] text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-sliders"
              viewBox="0 0 16 16"
            >
              <path d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
            </svg>
            <span>Filter</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarSection;
