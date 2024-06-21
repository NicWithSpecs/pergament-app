import { FaSquarePiedPiper } from "react-icons/fa6";
import logo from "../assets/tempLogo.svg"; // with import

const Logo = () => {
  return (
    <div className="logo h-8 w-8 m-1">
      <img src={logo} alt="logo" className="w-full h-full hidden" />
      <FaSquarePiedPiper className="w-full h-full" />
    </div>
  );
};

export default Logo;
