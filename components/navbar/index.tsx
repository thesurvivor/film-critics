import React from "react";
import NavItem from "../navitem";

const SiteNav = () => {
  return (
    <nav className="site-nav">
      <ul className="flex gap-4">
        <NavItem
          href="/home"
          classnames="hover:text-gray-600"
          activeClassnames="text-gray-600"
        >
          Home
        </NavItem>
        <NavItem
          href="/about"
          classnames="hover:text-gray-600"
          activeClassnames="text-gray-600"
        >
          About
        </NavItem>
      </ul>
    </nav>
  );
};

export default SiteNav;
