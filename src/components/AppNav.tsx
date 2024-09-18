import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import { LuSun } from "react-icons/lu";
import usePergamentStore from "../store";
import ProjectSelection from "./ProjectSelection";

const NavLinks = () => {
  return (
    <>
      <a
        className="mx-8 border-b py-2 text-xl font-medium md:border-none md:text-sm"
        href="#"
      >
        Templates
      </a>
      <a
        className="mx-8 border-b py-2 text-xl font-medium md:border-none md:text-sm"
        href="#"
      >
        Help
      </a>
      <a
        className="mx-8 border-b py-2 text-xl font-medium md:border-none md:text-sm"
        href="#"
      >
        Settings
      </a>
    </>
  );
};

const AppNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = usePergamentStore();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`flex w-1/5 justify-end`}>
        <div className="hidden w-full items-center justify-end md:flex">
          <NavLinks />
          <button onClick={toggleDarkMode} className="p-1">
            {darkMode ? (
              <MdOutlineDarkMode className="h-6 w-6" />
            ) : (
              <LuSun className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="z-[2000] md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed ${isOpen ? "right-0" : "right-[-100%]"} top-0 z-50 h-full w-[60%] border-l border-zinc-300 bg-zinc-100 duration-300 ease-in-out md:hidden dark:bg-zinc-900`}
      >
        <div className="flex flex-col">
          <ProjectSelection currentProject="default" />
          <NavLinks />
          <button
            className="mx-8 py-2 text-left text-xl font-medium"
            onClick={toggleDarkMode}
          >
            DM
          </button>
        </div>
      </div>
    </>
  );
};

export default AppNav;
