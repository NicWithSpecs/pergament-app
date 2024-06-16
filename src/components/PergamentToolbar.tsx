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
    <div className="flex flex-col absolute">
      {noteFunctions.map((note) => {
        const Icon = note.icon;
        return (
          <button
            title={"Add " + note.name}
            className="bg-white text-black hover:bg-black hover:text-white border-4 border-black font-bold py-2 px-4 m-2 w-20 h-20 rounded-2xl z-[1000]"
            onClick={note.createFunction}
          >
            <Icon className="w-full h-full" />
            {/* <span>{note.name}</span> */}
          </button>
        );
      })}
    </div>
  );
};

export default PergamentToolbar;
