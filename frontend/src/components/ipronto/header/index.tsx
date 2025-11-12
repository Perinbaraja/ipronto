import Logo from "@/components/atoms/logo";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  const navLinks = [
    { name: "About Us", href: "/" },
    {
      name: "#WhereIsPronto",
      href: "/",
      image:
        "https://lirp.cdn-website.com/c789aa2e/dms3rep/multi/opt/Layer+1-165w.png",
    },
    {
      name: "Pronto Experience App",
      href: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-phone"
          viewBox="0 0 16 16"
        >
          <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        </svg>
      ),
    },
  ];

  const ratingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating); // 4 for 4.5
    const hasHalfStar = rating % 1 !== 0; // true for .5
    console.log("RATING:", rating);
    console.log("FULL STARS:", fullStars);
    console.log("HAS HALF STAR:", hasHalfStar);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#fff"
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key={`half-star}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#fff"
          className="bi bi-star-half"
          viewBox="0 0 16 16"
        >
          <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
        </svg>
      );
    }

    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div className="bg-black p-2">
      <div className="main-header flex items-center justify-between max-w-7xl mx-auto text-[#ffc813]">
        <div className="logo">
          <Logo />
        </div>
        <div className="navLinks flex items-center justify-center gap-6 text-sm font-medium">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="flex items-center justify-center gap-2 transition"
            >
              {link.image && (
                <img
                  src={link.image}
                  alt={link.name}
                  className="h-8 w-8 object-contain"
                />
              )}
              {link.icon && link.icon}
              <p className=" hover:text-white">{link.name}</p>
            </Link>
          ))}
          <div className="flex flex-col justify-center items-center gap-1">
            {ratingStars(4.5)}
            <p className="text-xs">Rating:4.9</p>
          </div>
          <div className="authLinks flex items-center justify-center gap-4 text-sm font-medium border-l border-gray-600 pl-4">
            <Link
              href={"/login"}
              className="flex items-center justify-center gap-2 transition hover:text-white"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="flex items-center justify-center gap-2 transition hover:text-white"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
