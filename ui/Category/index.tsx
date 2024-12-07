import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Product } from "../../interfaces/Product";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { createCartItem } from "../../api/cart";
import { CartItemCreate } from "../../interfaces/CartItem";
import QuantityField from "../QuantityField";
import { ProductInventory } from "../../interfaces/ProductInventory";
import {
  CaretRight,
  CaretUp,
  Check,
  Warehouse,
  X,
} from "@phosphor-icons/react";
import Divider from "../Divider";
import VariantSelector from "../VariantSelector";
import { Category } from "interfaces/Category";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
// Product Image Component

// Main Product Page Component
interface CategoryPageProps {
  category: Category;
  products: Product[];
  onChangeCategory: (url: string,checked: boolean) => void;
}

const CategoryPage = ({ products, category, onChangeCategory }: CategoryPageProps) => {
  const [isCategoriesToggled, setIsCategoriesToggled] = useState(true);
  const [isChecked, setIsChecked] = useState<string[]>([]);
  const handleChange = (url: string, checked: boolean) => {
    onChangeCategory(url, checked);
    setIsChecked((s) => checked ? [...s, url] : s.filter((i) => i !== url));

  };


  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-white">
        <div
          className="text-lg font-semibold p-4 border-b border-gray-300 flex items-center justify-between"
          onClick={() => setIsCategoriesToggled((s) => !s)}
        >
          <h2 className="text-blue-500">Kategorier</h2>
          {isCategoriesToggled ? <CaretUp /> : <CaretDown />}
        </div>
        {isCategoriesToggled && (
          <ul className="space-y-2 py-4">
            {category?.subCategories?.map((sub) => (
              <li key={sub.id} className="flex items-center space-x-2 py-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      id={`category-${sub.id}`}
                    />
                    <label
                      htmlFor={`category-${sub.id}`}
                      className="flex items-center space-x-2 cursor-pointer hover:text-blue-500"
                      onClick={() => handleChange(sub.url, !isChecked.some((url) => url === sub.url))}
                    >
                      <div className="h-4 w-4 flex items-center justify-center text-blue-600">
                        <div
                          className={`flex items-center justify-center w-6 h-6 border border-black p-1 ${
                            isChecked.some((url) => url === sub.url) ? "bg-black text-white" : "bg-white text-black"
                          }`}
                        >
                          {isChecked.some((url) => url === sub.url) ? <Check size={16} /> : <span className="w-4 h-4"></span>}
                        </div>
                      </div>
                      <span className="text-sm font-medium">{sub.description}</span>
                    </label>
                  </div>

              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="w-3/4 p-4">
        <h1 className="text-2xl font-bold">{category?.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.imgUrl}
                  alt={product.imgAlt}
                  className="w-full h-32 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
