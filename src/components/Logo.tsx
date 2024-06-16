import logo from "../assets/tempLogo.svg"; // with import

const Logo = () => {
  return (
    <div className="logo h-10 w-10">
      <img src={logo} alt="logo" className="w-full h-full" />
    </div>
  );
};

export default Logo;
