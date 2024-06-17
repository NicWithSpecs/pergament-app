import Logo from "./Logo";
import Nav from "./Nav";
import ProjectSelection from "./ProjectSelection";

const PergamentHeader = () => {
  return (
    <header className="bg-white border-b-2 border-black top-0 z-[100] p-2 mx-auto flex flex-wrap items-center justify-between w-full">
      <div className="flex items-center">
        <Logo />
        <div className="text-lg font-bold mx-2">PERGAMENT</div>
      </div>
      <ProjectSelection currentProject="default" />
      <Nav />
    </header>
  );
};

export default PergamentHeader;
