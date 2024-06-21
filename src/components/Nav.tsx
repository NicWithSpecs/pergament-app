import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import usePergamentStore from "../store";
import { LuSun } from "react-icons/lu";
import { MdOutlineDarkMode } from "react-icons/md";

const NavLinks = () => {
  return (
    <>
      <a className="font-medium text-sm mx-10" href="#">
        Templates
      </a>
      <a className="font-medium text-sm mx-10" href="#">
        Help
      </a>
      <a className="font-medium text-sm mx-10" href="#">
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
        <div className="hidden items-center md:flex w-full justify-end">
          <NavLinks />
          <button onClick={toggleDarkMode} className="p-1">
            {darkMode ? (
              <MdOutlineDarkMode className="w-6 h-6" />
            ) : (
              <LuSun className="w-6 h-6" />
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
        <div className="flex basis-full flex-col items-center ">
          <NavLinks />
          <button>DM</button>
        </div>
      )}
    </>
  );
};

export default Nav;
