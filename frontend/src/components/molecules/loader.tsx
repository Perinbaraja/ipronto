import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="w-10 h-10 border-4 border-black border-t-[#ffc813] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
