import React, { memo } from "react";
import Logo from "../logo/logo";

import Styles from "./header-styles.scss";

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(Header);
