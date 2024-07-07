import { IconType } from "react-icons";
import {
  LuCheckSquare,
  LuHeading1,
  LuImage,
  LuPenSquare,
  LuSquare,
} from "react-icons/lu";

interface NodeConfig {
  initData: NodeInitData;
  name: string;
  icon: IconType;
}

interface NodeInitData {
  data: object;
  style?: object;
}

const nodeConfig: { [key: string]: NodeConfig } = {
  noteNode: {
    initData: {
      data: { content: `` },
      style: { width: 405 },
    },
    name: "Note",
    icon: LuPenSquare,
  },
  imageNode: {
    initData: {
      data: {
        hasImage: false,
        image: {
          url: "",
        },
      },
    },
    name: "Image",
    icon: LuImage,
  },
  frameNode: {
    initData: {
      data: {},
      style: { width: 510, height: 510, zIndex: -1 },
    },
    name: "Frame",
    icon: LuSquare,
  },
  headingNode: {
    initData: {
      data: { content: `` },
      style: { width: 300 },
    },
    name: "Heading",
    icon: LuHeading1,
  },
  todoNode: {
    initData: {
      data: { content: "" },
      style: { width: 405 },
    },
    name: "Todo",
    icon: LuCheckSquare,
  },
};

export default nodeConfig;
