import React, { useEffect, useState } from "react";
import { Menu, MenuButton } from "@headlessui/react";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { getCategories } from "../../api/categories";
import Link from "next/link";


const CategoryMenu: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const categories = useNextshopApiSelector(x => x.categories.Categories);
  const dispatch = useNextshopApiDispatch();
  const handleMouseEnter = (category: string) => {
    setOpenMenu(category);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };
useEffect(()=>{
    dispatch(getCategories());
},[])
console.log('category', categories);
  return (
    <nav className="bg-white p-2" onMouseLeave={handleMouseLeave}>
      <ul className="flex space-x-4">
        {categories.filter((category) => category.parentId === undefined).map((category) => (
          <li
            key={category.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.id)}
          >
            <Menu as="div">
            <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className={`block px-2 py-1 text-gray-800 hover:bg-gray-200`}
                >
                  {category.name} {/* Displaying the subcategory name */}
                </Link>
              
            </Menu>
          </li>
        ))}
      </ul>
      { openMenu && 
        <div className="absolute left-0 z-10 w-full mt-2 bg-white pt-4 ">
          <div className="border-t border-gray-400">
          {categories
              .filter((subCat) => subCat.parentId === openMenu) // Get subcategories for the open category
              .map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/category/${subCategory.id}`}
                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-200`}
                >
                  {subCategory.name} {/* Displaying the subcategory name */}
                </Link>
              ))}
          </div>
        </div>
      }
    </nav>
  );
};

export default CategoryMenu;
