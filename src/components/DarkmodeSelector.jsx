import { useState } from "react";

import { IoMoon, IoSunny } from "react-icons/io5";

function DarkmodeSelector() {
  const [darkmode, setDarkmode] = useState(false);

  const darkmodeHandler = () => {
    setDarkmode(!darkmode);
    document.querySelector("html").classList.toggle("dark");
    // document.documentElement.classList.toggle('dark')
  };

  return (
    <button
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
      onClick={darkmodeHandler}
    >
      {darkmode ? <IoMoon /> : <IoSunny /> }
    </button>
  );
}

export default DarkmodeSelector;
