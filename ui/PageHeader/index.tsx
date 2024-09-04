import React from "react";
import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";

export interface MenuItemProps {
  to: string;
  children: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ to, children }) => {
  return (
    <div>
      <Link href={to} passHref>
        <span className="text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {children}
        </span>
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
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <h1 className="text-xl font-bold">MyLogo</h1>
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
                {children(menuItems)}{" "}
                {/* Properly invoke the children function */}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default PageHeader;
