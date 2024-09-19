import { Link } from "react-router-dom";
import LPNavbar from "../components/LPNavbar";
import screenshot from "../assets/screenshot-1.png";
import grid from "../assets/grid.svg";
import nodesBackground from "../assets/nodes.svg";

const landingPageBackground = {
  backgroundPosition: "0px 0px,0px 0px,0px 0px,0px 0px,0px 0px",
  backgroundBlendMode: "multiply",
  filter: "brightness(120%)",
  backgroundImage:
    "radial-gradient(48% 75% at 58% 2%, #CCCD6C82 4%, #0768FF00 100%),radial-gradient(57% 56% at 32% 74%, #FDFDABFF 14%, #073AFF00 100%),radial-gradient(74% 86% at 90% 60%, #FFAB28 15%, #073AFF00 100%),linear-gradient(125deg, #FFFA79FF 1%, #FDE04BFF 100%), url(data:image/png;base64,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)",
};

const PergamentLandingPage = () => {
  return (
    <>
      <div
        className="fixed -z-10 h-screen w-screen"
        style={landingPageBackground}
      />
      <LPNavbar />
      <div
        className="flex flex-col items-center"
        style={{
          backgroundImage: `url(${nodesBackground})`,
          backgroundRepeat: "space",
          backgroundPosition: "0px 50px",
          backgroundSize: "100%",
        }}
      >
        <div
          className={`mt-10 flex flex-col items-center md:mt-14 lg:mt-48`}
          style={{
            backgroundImage: `url(${grid})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <div className="bg-gradient-to-t from-zinc-900 to-zinc-500 bg-clip-text pb-2 pt-4 text-5xl font-medium tracking-tighter text-transparent md:text-6xl lg:text-8xl">
            Get organized.
          </div>
          <div className="pb-8 text-5xl font-bold tracking-tighter md:text-6xl lg:text-8xl">
            Stay creative.
          </div>
        </div>

        <div className="m-8 max-w-xl text-center text-lg tracking-tight md:m-8 md:max-w-2xl md:text-xl lg:m-12 lg:max-w-4xl lg:text-3xl">
          Pergament is a leightweight tool for brainstorming, taking notes and
          organizing.
        </div>
        <Link
          to="/whiteboard"
          className="space-evenly inline-flex justify-center whitespace-nowrap rounded-2xl bg-zinc-900 px-8 py-3 text-lg font-medium text-zinc-100 shadow-lg hover:bg-zinc-100 hover:text-zinc-900 lg:text-xl dark:bg-zinc-100 dark:text-zinc-900"
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
