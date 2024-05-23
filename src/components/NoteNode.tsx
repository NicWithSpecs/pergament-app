import { ChangeEvent, useCallback } from "react";
import { Handle, Position } from "reactflow";

function NoteNode() {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target) console.log(evt.target.value);
  }, []);

  return (
    <div className="note-node">
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <div>
        <label htmlFor="text">Text:</label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          /* value={data.value} */
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={true}
      />
    </div>
  );
}

export default NoteNode;
