import { LuScrollText } from "react-icons/lu";
import logo from "../assets/tempLogo.svg"; // with import

const Logo = () => {
  return (
    <div className="logo m-1 h-8 w-8">
      <img src={logo} alt="logo" className="hidden h-full w-full" />
      <LuScrollText className="h-full w-full p-0.5" />
    </div>
  );
};

export default Logo;
