import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

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

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex w-1/5 justify-end">
        <div className="hidden md:flex w-full justify-end">
          <NavLinks />
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
        </div>
      )}
    </>
  );
};

export default Nav;
