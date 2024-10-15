import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import { Logo } from "../Logo";
import { HeaderSearchBox } from "../HeaderSearchBox";
import HeaderCategoryMenu from "../HeaderCategoryMenu";
export interface MenuItemProps {
  to: string;
  label: React.ReactNode;
  count?: number;
  icon?: any;
  countPosition?: "left" | "right";
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  to,
  label,
  count,
  icon,
  countPosition,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Link href={to} passHref>
        <div className="flex flex-col gap-1 items-center py-2">
          {icon && (
            <div className="relative">
              {icon}
              {(count !== undefined && count > 0) && (
                <span
                  className={`absolute text-white text-xs bg-sky-800 w-5 h-5 leading-5 top-0 ${
                    countPosition === "right" ? "left-4" : "right-4"
                  } text-center rounded-full`}
                >
                  {count}
                </span>
              )}
            </div>
          )}
          <div className="whitespace-nowrap font-medium text-xs">{label}</div>
        </div>
      </Link>
    </div>
  );
};

export interface PageHeaderProps {
  menuItems: MenuItemProps[];
  children: (menuItems: MenuItemProps[]) => React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  menuItems,
  children,
}) => {
  return (
    <div>
      <Disclosure as="header" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20 items-center">
                <Link href="/">
                <Logo />
                </Link>
               
                <div className="px-8 w-full flex gap-4">
                  <HeaderCategoryMenu />
                  <HeaderSearchBox />
                </div>
                <div className="flex space-x-4 gap-4">
                  {children(menuItems)}{" "}
                  {/* Properly invoke the children function */}
                </div>
                <div className="flex items-center md:hidden">
                  <DisclosureButton className="p-2 text-gray-700 hover:text-blue-500 focus:outline-none">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </DisclosureButton>
                </div>
              </div>
            </div>
            <DisclosurePanel className="md:hidden">
              <div className="bg-white shadow">
                <div className="px-4 py-2">
                  {children(menuItems)}
                  {/* Properly invoke the children function */}
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PageHeader;
