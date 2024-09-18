import { RxCaretDown } from "react-icons/rx";

interface ProjectSelectionProps {
  currentProject: string;
  className?: string;
}

const ProjectSelection = ({
  currentProject,
  className,
}: ProjectSelectionProps) => {
  return (
    <div className={`p-4 text-sm md:p-2 ${className}`}>
      projects /{" "}
      <span className="font-bold">
        {currentProject} <RxCaretDown className="inline" />
      </span>
    </div>
  );
};

export default ProjectSelection;
