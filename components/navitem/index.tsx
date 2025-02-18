'use client'

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; 

interface NavItemProps {
  href: string;
  classnames?: string;
  activeClassnames?: string;
  children: React.ReactNode;
}

const NavItem = ({
  href,
  classnames,
  activeClassnames,
  children,
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href} className={`${classnames} ${isActive ? activeClassnames : ""}`}>
          {children}
      </Link>
    </li>
  );
};

export default NavItem;