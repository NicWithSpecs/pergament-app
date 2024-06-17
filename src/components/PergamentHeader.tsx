import Logo from "./Logo";
import Nav from "./Nav";
import ProjectSelection from "./ProjectSelection";

const PergamentHeader = () => {
  return (
    <header className="bg-zinc-50 border-b-2 shadow-md border-zinc-800 text-zinc-800 top-0 z-[1000] p-2 mx-auto flex flex-wrap items-center justify-between w-full">
      <div className="flex items-center">
        <Logo />
        <div className="text-xl font-bold mx-2">PERGAMENT</div>
      </div>
      <ProjectSelection currentProject="default" />
      <Nav />
    </header>
  );
};

export default PergamentHeader;
