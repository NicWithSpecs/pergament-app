import Logo from "./Logo";
import Nav from "./Nav";
import ProjectSelection from "./ProjectSelection";

const PergamentHeader = () => {
  return (
    <header className="text-zinc-950 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-700 top-0 z-[1000] p-2 mx-auto flex flex-wrap items-center justify-between w-full">
      <div className="flex items-center">
        <Logo />
        <span className="text-xl font-bold mx-2">PERGAMENT</span>
        <span className="text-lg">Whiteboard</span>
      </div>
      <ProjectSelection currentProject="default" />
      <Nav />
    </header>
  );
};

export default PergamentHeader;
