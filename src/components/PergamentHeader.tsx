import Logo from "./Logo";
import Nav from "./Nav";
import ProjectSelection from "./ProjectSelection";

const PergamentHeader = () => {
  return (
    <header className="top-0 z-[1000] mx-auto flex w-full flex-wrap items-center justify-between border-b border-zinc-300 bg-zinc-50 p-2 text-zinc-950 transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
      <div className="flex items-center">
        <Logo />
        <span className="mx-2 text-xl font-bold">PERGAMENT</span>
        <span className="text-lg">Whiteboard</span>
      </div>
      <ProjectSelection currentProject="default" />
      <Nav />
    </header>
  );
};

export default PergamentHeader;
