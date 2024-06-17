import { RxCaretDown } from "react-icons/rx";

interface ProjectSelectionProps {
  currentProject: string;
}

const ProjectSelection = ({ currentProject }: ProjectSelectionProps) => {
  return (
    <div className="text-sm">
      projects /{" "}
      <span className="font-bold">
        {currentProject} <RxCaretDown className="inline" />
      </span>
    </div>
  );
};

export default ProjectSelection;
