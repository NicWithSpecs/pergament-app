import { Link } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import ProjectSelection from "./ProjectSelection";

const PergamentHeader = () => {
  return (
    <header className="top-0 z-[1000] mx-auto flex w-full flex-wrap items-center justify-between border-b border-zinc-300 bg-zinc-50 p-2 text-zinc-950 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
      <Link to="/" className="flex items-center tracking-tight">
        <Logo />
        <span className="mx-2 text-lg font-semibold">Pergament</span>
        <span className="text-lg">Whiteboard</span>
      </Link>
      <ProjectSelection currentProject="default" className="hidden md:block" />
      <AppNav />
    </header>
  );
};

export default PergamentHeader;
