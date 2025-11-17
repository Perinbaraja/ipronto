"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

type Props = {};

const CurrencyRatesDropDown = dynamic(() => import("./get-currency-rates"), {
  ssr: false,
});

const FooterComponent = (props: Props) => {
  return (
    <div className="bg-[#040b17] text-[#838383] pt-20 pb-10 px-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="border-0 lg:border-r pr-8 w-[350px]">
          <img
            src="https://s3.us-west-2.amazonaws.com/www.yopronto.com/Pronto+Experiences+m+%2B+s+black+transparent.png"
            alt="Logo"
            className="w-[200px] h-[55px] mb-4"
          />
          <p className="text-[18px] leading-[22px] mb-4">
            Our Promise: Deliver fun, stress-free and rewarding leisure &
            entertainment experiences…
          </p>

          <div className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
            </svg>
            <span>Currency:</span>
          </div>

          <div className="currency-rate-dropdown px-2 py-2">
            <CurrencyRatesDropDown />
          </div>

          <Link href={""} className="text-[#ffc813] font-semibold text-lg">
            Frequently Asked Questions (FAQ’s)
          </Link>
        </div>

        {/* Right Columns */}
        <div className="flex flex-col lg:flex-1 justify-between">
          {/* About Pronto */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-semibold text-white">
              About
              <br />
              Pronto
            </h3>
            <div className="h-[3px] w-[30px] bg-[#ffc813] my-1"></div>
            <Link href={""} className="text-[#ffc813]">
              About Us
            </Link>
          </div>

          {/* Leisure & Entertainment */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-semibold text-white">
              Leisure & Entertainment
            </h3>
            <div className="h-[3px] w-[30px] bg-[#ffc813] my-1"></div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href={""} className="text-[#ffc813]">
                  Global Dashboard
                </Link>
              </li>
              <li>
                <Link href={""} className="text-[#ffc813]">
                  7-Dimensional Search Engine
                </Link>
              </li>
              <li>
                <Link href={""} className="text-[#ffc813]">
                  Find your Perfect Experience
                </Link>
              </li>
              <li>
                <Link href={""} className="text-[#ffc813]">
                  Enjoy Lifetime of Leisure & Entertainment
                </Link>
              </li>
            </ul>
          </div>

          {/* Pronto Reward Points */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-semibold text-white">
              Pronto Reward Points Program
            </h3>
            <div className="h-[3px] w-[30px] bg-[#ffc813] my-1"></div>
            <Link href={""} className="text-[#ffc813]">
              Enjoy The Most Rewarding Loyalty Program
            </Link>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-semibold text-white">Contact Us</h3>
            <div className="h-[3px] w-[30px] bg-[#ffc813] my-1"></div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-white"></i>
                <span className="text-white font-bold">
                  Phone:{" "}
                  <Link href={""} className="text-[#ffc813] font-normal">
                    650.249.7420
                  </Link>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-white"></i>
                <span className="text-white font-bold">
                  Email:{" "}
                  <Link href={""} className="text-[#ffc813] font-normal">
                    CS@ProntoExperiences.com
                  </Link>
                </span>
              </div>
              <div className="social-icons flex gap-5 p-3">
                <div className="hover:bg-gray-300 w-9 h-9 flex text-white hover:text-[#193894] items-center justify-center rounded-full cursor-pointer">
                  <i className="fa-brands fa-facebook-f text-lg"></i>
                </div>
                <div className="hover:bg-gray-300 w-9 h-9 flex text-white hover:text-[#0dc1fd] items-center justify-center rounded-full cursor-pointer">
                  <i className="fa-brands fa-twitter text-lg"></i>
                </div>
                <div className="hover:bg-gray-300 w-9 h-9 flex text-white hover:text-[#df3a6b] items-center justify-center rounded-full cursor-pointer">
                  <i className="fa-brands fa-instagram text-lg"></i>
                </div>
                <div className="hover:bg-gray-300 w-9 h-9 flex text-white hover:text-[#e90c0c] items-center justify-center rounded-full cursor-pointer">
                  <i className="fa-brands fa-youtube text-lg"></i>
                </div>
              </div>
              {/* Install App */}
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex gap-2 justify-center items-center">
                  <div className="bg-[#ffc813] w-6 h-6 flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="black"
                      className="bi bi-phone font-black"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </div>
                  <p className="text-[#ffc813] font-medium">
                    Pronto Experience App
                  </p>
                </div>
                <div className="install-btn bg-[#ffc813] text-black font-medium px-6 py-2 rounded-md cursor-pointer hover:bg-yellow-300">
                  <button>Install</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-[#ffc813] flex flex-col lg:flex-wrap gap-4">
        <span>Pronto Rel. 12.1.3</span>
        <span className="text-center flex-1 text-[#838383] text-sm lg:text-lg">
          Copyright © 2017 - 2025 -{" "}
          <Link href={""} className="text-[#ffc813]">
            ProntoExperiences.com
          </Link>{" "}
          |{" "}
          <Link href={""} className="text-[#ffc813]">
            Terms & Conditions
          </Link>{" "}
          |{" "}
          <Link href={""} className="text-[#ffc813]">
            User Agreement{" "}
          </Link>
          |{" "}
          <Link href={""} className="text-[#ffc813]">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href={""} className="text-[#ffc813]">
            Cookies Policy
          </Link>
        </span>
      </div>
    </div>
  );
};

export default FooterComponent;
