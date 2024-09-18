import { Link } from "react-router-dom";
import LPNavbar from "../components/LPNavbar";
import screenshot from "../assets/screenshot-1.png";

const PergamentLandingPage = () => {
  return (
    <>
      <div className="fixed -z-10 h-screen w-screen bg-gradient-to-b from-zinc-100 to-zinc-300" />
      <LPNavbar />

      <div className="flex flex-col items-center">
        <div className="mt-10 flex flex-col items-center md:mt-14 lg:mt-16">
          <div className="bg-gradient-to-t from-zinc-900 to-zinc-400 bg-clip-text p-2 text-5xl font-medium tracking-tighter text-transparent md:text-6xl lg:text-8xl">
            Get organized.
          </div>
          <div className="text-5xl font-bold tracking-tighter md:text-6xl lg:text-8xl">
            Stay creative.
          </div>
        </div>

        <div className="m-8 max-w-xl text-center text-lg tracking-tight md:m-8 md:max-w-2xl md:text-xl lg:m-12 lg:max-w-4xl lg:text-2xl">
          Pergament is a leightweight tool for brainstorming, taking notes and
          organizing.
        </div>
        <Link
          to="/whiteboard"
          className="space-evenly inline-flex justify-center whitespace-nowrap rounded-2xl border border-zinc-300 bg-zinc-900 px-8 py-3 text-lg font-medium text-zinc-100 shadow-lg hover:bg-zinc-100 hover:text-zinc-900 lg:text-xl dark:bg-zinc-100 dark:text-zinc-900"
        >
          Get started
        </Link>
        <img
          src={screenshot}
          className="mt-14 w-[90%] drop-shadow-2xl lg:w-[70%]"
        />
      </div>
    </>
  );
};

export default PergamentLandingPage;
