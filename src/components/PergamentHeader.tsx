import Logo from "./Logo";
import Nav from "./Nav";

const PergamentHeader = () => {
  return (
    <header className="bg-white border-b-4 border-black top-0 z-[100] p-4 mx-auto flex flex-wrap items-center justify-between w-full">
      <div className="flex items-center">
        <Logo />
        <div className="text-xl font-bold mx-2">PERGAMENT</div>
      </div>
      <Nav />
    </header>
  );
};

export default PergamentHeader;
