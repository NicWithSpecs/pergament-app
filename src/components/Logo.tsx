import { FaSquarePiedPiper } from "react-icons/fa6";
import logo from "../assets/tempLogo.svg"; // with import

const Logo = () => {
  return (
    <div className="logo m-1 h-8 w-8">
      <img src={logo} alt="logo" className="hidden h-full w-full" />
      <FaSquarePiedPiper className="h-full w-full" />
    </div>
  );
};

export default Logo;
