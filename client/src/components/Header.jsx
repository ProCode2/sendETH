import React from "react";

import logo from "../images/sendETH.png";

const Header = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex justify-between items-center p-4">
      <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      <p className="uppercase tracking-tighter font-thin text-2xl mr-8">sendETH</p>
    </nav>
  );
};

export default Header;
