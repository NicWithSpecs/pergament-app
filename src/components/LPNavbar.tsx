import { HiMenu, HiX } from "react-icons/hi";
import Logo from "./Logo";
import { useState } from "react";

const LPNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="mx-auto flex h-20 items-center justify-between border-b border-zinc-300 px-4 tracking-tighter">
      <div className="flex items-center">
        <Logo />
        <span className="mx-1 text-2xl font-semibold">Pergament</span>
      </div>
      <ul className="hidden font-medium md:flex">
        <li className="p-4 text-lg">Home</li>
        <li className="p-4 text-lg">Features</li>
        <li className="p-4 text-lg">Blog</li>
        <li className="p-4 text-lg">About</li>
      </ul>
      <a
        href="#"
        className="hidden rounded-xl border-2 border-zinc-900 px-4 py-2 text-lg hover:bg-zinc-800 hover:text-zinc-100 md:block"
      >
        Sign in
      </a>
      <button onClick={handleNav} className="z-[500] block md:hidden">
        {navOpen ? <HiX /> : <HiMenu />}
      </button>
      <div
        className={`fixed ${navOpen ? "right-0" : "right-[-100%]"} top-0 z-50 h-full w-[60%] border-l border-zinc-300 bg-zinc-100 duration-300 ease-in-out`}
      >
        <ul className="p-3 pt-16">
          <li className="border-b border-zinc-700 p-4 text-lg">Home</li>
          <li className="border-b border-zinc-700 p-4 text-lg">Features</li>
          <li className="border-b border-zinc-700 p-4 text-lg">Blog</li>
          <li className="p-4 text-lg">About</li>
        </ul>
        <div className="flex flex-col items-center">
          <a
            href="#"
            className="my-5 inline-block rounded-xl border-2 border-zinc-900 px-4 py-2 text-xl hover:bg-zinc-800 hover:text-zinc-100"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default LPNavbar;
