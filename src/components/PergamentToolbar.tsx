import { IconType } from "react-icons";

export interface PergamentToolbarProps {
  noteFunctions: {
    name: string;
    createFunction: () => void;
    icon: IconType;
  }[];
}

const PergamentToolbar = ({ noteFunctions }: PergamentToolbarProps) => {
  return (
    <div className="top-60 flex flex-col absolute z-[1000] bg-zinc-50 border border-zinc-300 shadow-lg rounded-r-xl p-3">
      {noteFunctions.map((note) => {
        const Icon = note.icon;
        return (
          <span key={note.name + "-tooltip"} className="group relative">
            <div className="absolute hidden left-[calc(100%)] top-[calc(50%-1rem)] group-hover:block w-auto select-none">
              <div className="bottom-full rounded bg-zinc-800 px-4 py-1 text-sm text-zinc-100 whitespace-nowrap">
                Add {note.name}
              </div>
            </div>
            <div>
              <button
                className="tool flex flex-col items-center justify-evenly shadow-md bg-zinc-50 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100 border border-zinc-300 py-2 px-4 m-2 w-20 h-20 rounded-xl"
                onClick={note.createFunction}
                key={note.name}
              >
                <Icon className="w-6 h-6" />
                <label className="text-xs">{note.name}</label>
              </button>
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default PergamentToolbar;
