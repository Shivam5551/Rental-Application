'use client'
import { useEffect, useState } from "react";

export const MenubarToggle = () => {
  const [isMenubarOpen, setIsMenubarOpen] = useState(false);

    const handleToggle = () => {
        setIsMenubarOpen(!isMenubarOpen);
    };

  useEffect(()=> {
    const menubarToggle = () => {
        const menubar = document.getElementById("menubar");
        if (menubar) {
          menubar.className = isMenubarOpen
            ? "flex text-left flex-col space-y-3 pt-3 w-fit h-fit right-16 top-15 rounded-lg bg-gray-200 dark:bg-gray-700 px-4 pb-3 absolute"
            : "hidden xl:flex flex-col xl:flex-row space-x-4 items-center";
        }
        console.log("toggle menubar");
      };
      menubarToggle();
  }, [isMenubarOpen]);

  useEffect(() => {
    const handleResize = () => {
        setIsMenubarOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menubar = document.getElementById("menubar");
      const menubarToggle = document.getElementById("menu-toggle");
      if ((menubar && menubarToggle) &&  (!menubar.contains(event.target as Node) && !menubarToggle.contains(event.target as Node))) {
        setIsMenubarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="w-full h-full flex items-center justify-center"
      type="button"
      aria-label="Toggle Menubar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};
