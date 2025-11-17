"use client";
import { formatDateTime } from "@/helpers";
import { ApiEvent } from "@/types/events";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  items: ApiEvent[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showExploreMore, setShowExploreMore] = useState(false);

  useEffect(() => {
    if (currentIndex + visibleCount >= items.length) {
      const timer = setTimeout(() => {
        setShowExploreMore(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowExploreMore(false);
    }
  }, [currentIndex, visibleCount, items.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const total = items.length;
    const lastIndex = Math.max(total - visibleCount, 0);

    if (currentIndex < lastIndex) {
      const newIndex = Math.min(currentIndex + visibleCount, lastIndex);
      setCurrentIndex(newIndex);
    }
  };

  // Helper function to get valid image URL
  const getValidImageUrl = (imageUrl: string | null | undefined) => {
    const defaultImage =
      "https://public-pronto.s3.us-west-2.amazonaws.com/dev-assets/sub-categories/New/Other%2B2.png";

    if (
      !imageUrl ||
      imageUrl === "null" ||
      imageUrl === "undefined" ||
      imageUrl === "NULL" ||
      imageUrl.trim() === ""
    ) {
      return defaultImage;
    }

    return imageUrl;
  };

  const prevSlide = () => {
    const newIndex = currentIndex - visibleCount;
    setCurrentIndex(newIndex < 0 ? 0 : newIndex);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= items.length - visibleCount;
  return (
    <div className="relative w-full mx-auto sm:py-4 px-1 sm:px-4 overflow-hidden">
      {/* Left Button */}
      {!isAtStart && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white border cursor-pointer hover:bg-[#ffc813] hover:border-black rounded-full p-3 z-10 shadow hover:scale-105 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-arrow-left hover:text-black"
            viewBox="0 0 16 16"
          >
            <path
              fill="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
            width: `${(items.length * 100) / visibleCount}%`,
          }}
        >
          {items.map((event) => {
            const isLastItem = items.length >= 20 && event === items[19];
            return (
              <div
                key={event.id}
                className="px-2 box-border cursor-pointer w-[49vw] sm:w-[45vw] lg:w-[300px] h-[350px] sm:h-auto"
              >
                <div
                  className={` p-1.5 rounded-xl shadow hover:shadow-xl transition overflow-hidden ${
                    isLastItem ? "bg-gray-300" : "bg-white"
                  }`}
                >
                  <div className="relative h-32 sm:h-56 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={getValidImageUrl(event.images[0])}
                      alt={event.name}
                      className="h-full w-full object-cover rounded-md transition-transform duration-500 hover:scale-105"
                    />
                    {/* Top-right icons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <button
                        className={`bg-white hover:bg-white text-gray-800 w-6 h-6 flex justify-center items-center rounded-full shadow border border-gray-400 transition-transform duration-200 ${
                          isLastItem ? "" : "hover:scale-110"
                        } cursor-pointer`}
                      >
                        <i className="fa-regular fa-thumbs-up text-sm text-black"></i>
                      </button>

                      <button
                        className={`bg-white hover:bg-white w-6 h-6 flex justify-center items-center text-gray-800 rounded-full shadow border border-gray-400 transition-transform duration-200 ${
                          isLastItem ? "" : "hover:scale-110"
                        } cursor-pointer`}
                      >
                        <i className="fa-solid fa-check text-sm text-black"></i>
                      </button>

                      <button
                        className={`bg-white hover:bg-white w-6 h-6 flex justify-center items-center text-gray-800 rounded-full shadow border border-gray-400 transition-transform duration-200 ${
                          isLastItem ? "" : "hover:scale-110"
                        } cursor-pointer`}
                      >
                        <i className="fa-solid fa-share-nodes text-xs text-black"></i>
                      </button>
                    </div>

                    <div className="absolute top-0 left-2 sm:left-5 flex flex-col items-center justify-center w-[40px] h-[50px] sm:w-[50px] sm:h-[60px] text-center text-white rounded-b-md border border-[#01070f] z-[9] bg-gradient-to-b from-[#ffc813] to-[#01070f]">
                      {(() => {
                        const formattedDate = formatDateTime(event.date, {
                          includeComma: false,
                        });
                        const [month, day] = formattedDate.split(" ");

                        return (
                          <div className="flex flex-col items-center leading-tight">
                            <span className="text-[20px] sm:text-[26px]  font-bold">
                              {day}
                            </span>
                            <span className="text-[10px] sm:text-[14px] font-semibold uppercase">
                              {month}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="p-2 sm:p-4 space-y-2">
                    <h3 className="text-[12px] sm:text-sm font-semibold line-clamp-2 h-[38px] sm:line-clamp-1">
                      {event.name}
                    </h3>
                    <p className="text-[#297a18] font-bold text-[16px] hidden sm:block">
                      ${event.pickupPointPriceRange.minpickupprice} - $
                      {event.pickupPointPriceRange.maxpickupprice}
                    </p>
                    <p className="text-[#297a18] font-bold text-[12px] sm:hidden">
                      MX${event?.pickupPointPriceRange?.maxpickupprice}
                    </p>
                    <hr className="text-gray-300" />
                    <div className="text-gray-500 text-xs flex items-center gap-2 sm:gap-1 font-[Lato, sans-serif]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="text-gray-500"
                        className="bi bi-clock w-4 h-4 sm:w-3 sm:h-3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                      </svg>
                      <p className="text-[10px] sm:text-[15px]">
                        {formatDateTime(event.startTime, {
                          includeComma: true,
                        })}
                      </p>
                    </div>
                    <div className="text-gray-500 flex items-start gap-1 text-sm mt-1 h-6 leading-snug ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-geo-alt-fill mt-[2px] flex-shrink-0 text-[#555]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                      </svg>
                      <span className="wrap-break-word text-[10px] line-clamp-2">
                        {event?.address && event.destination_name[0] ? (
                          <>
                            {event.destination_name[0]},<br />
                            {event.address}
                          </>
                        ) : (
                          <>{event.address}</>
                        )}
                      </span>
                    </div>

                    <div className="sm:pt-2 text-sm text-gray-600 font-medium">
                      <img
                        src={
                          event.source === "rezdy"
                            ? "https://public-pronto.s3.us-west-2.amazonaws.com/dev-assets/pronto-logo/ProntoliveNew.png"
                            : event.source === "TEvo"
                            ? "https://public-pronto.s3.us-west-2.amazonaws.com/dev-assets/pronto-logo/Pronto-new-logo.png"
                            : event.source === "viator"
                            ? "/logo/viator_logo.png"
                            : "https://public-pronto.s3.us-west-2.amazonaws.com/dev-assets/pronto-logo/Pronto-new-logo.png"
                        }
                        alt="Organizer Logo"
                        className={`object-contain ${
                          event.source === "viator" ? "h-3" : "h-5"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Button / Explore More */}
      {!showExploreMore && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black hover:bg-[#ffc813] border hover:border-black text-white rounded-full p-3 z-10 shadow hover:scale-105 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-arrow-right hover:text-black"
            viewBox="0 0 16 16"
          >
            <path
              fill="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </button>
      )}
      {items.length >= 20 && showExploreMore && (
        <div className="absolute right-[50px] top-[30%]  md:right-[70px] text-xl md:text-3xl md:top-[45%] -translate-y-1/2 text-white/95 font-bold cursor-pointer">
          Explore More
        </div>
      )}
    </div>
  );
};

export default Carousel;
