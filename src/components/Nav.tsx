import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/md";
import { LuSun } from "react-icons/lu";
import usePergamentStore from "../store";

const NavLinks = () => {
  return (
    <>
      <a className="mx-10 text-sm font-medium" href="#">
        Templates
      </a>
      <a className="mx-10 text-sm font-medium" href="#">
        Help
      </a>
      <a className="mx-10 text-sm font-medium" href="#">
        Settings
      </a>
    </>
  );
};

const Nav = () => {
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
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center">
          <NavLinks />
          <button>DM</button>
        </div>
      )}
    </>
  );
};

export default Nav;
