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
    <div className="flex flex-col absolute top-1">
      {noteFunctions.map((note) => {
        const Icon = note.icon;
        return (
          <span className="group relative z-[1000]">
            <div className="absolute hidden left-[calc(100%)] top-[calc(50%-1rem)] group-hover:block w-auto select-none">
              <div className="bottom-full rounded bg-zinc-800 px-4 py-1 text-sm text-zinc-100 whitespace-nowrap">
                Add {note.name}
              </div>
            </div>
            <button
              className="tool shadow-md bg-zinc-100 text-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 border-2 border-zinc-800 font-bold py-2 px-4 m-2 w-16 h-16 rounded-2xl"
              onClick={note.createFunction}
              key={note.name}
            >
              <Icon className="w-full h-full" />
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default PergamentToolbar;
