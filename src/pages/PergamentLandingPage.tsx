import { Link } from "react-router-dom";

const PergamentLandingPage = () => {
  return (
    <>
      <h1 className="m-10 text-center text-6xl font-bold">Pergament</h1>
      <div className="flex flex-row justify-center">
        <Link
          to="/whiteboard"
          className="space-evenly m-10 inline-flex justify-center whitespace-nowrap rounded-md border border-zinc-300 bg-zinc-50 px-8 py-4 text-xl font-medium shadow-lg hover:bg-zinc-800 hover:text-zinc-100 dark:bg-zinc-900 dark:text-zinc-200"
        >
          Start App
        </Link>
      </div>
    </>
  );
};

export default PergamentLandingPage;
